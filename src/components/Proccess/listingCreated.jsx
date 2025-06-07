'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useAppstore } from "@/store/store";
import { useAppSelector } from "@/lib/hooks";
import { createListingAPI } from "@/lib/listings";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
const listingCreated = () => {
    const router = useRouter();
    const userInfo = useAppSelector(selectUserInfo);
    const [loading, setLoading] = React.useState(false);
    const [isFailed, setIsFailed] = React.useState(false);
    const {
        locationType,
        placeType,
        mapData,
        locationData,
        placeSpace,
        price,
        title,
        description,
        placeAmenities,
        photos
    } = useAppstore();
    useEffect(() => {
        if (!userInfo) {
            toast.error("Vui lòng đăng nhập để tạo điểm lưu trú");
            return
        };
        createListing()
    }, [
    ])
    const createListing = async () => {
        setLoading(true);
        const result = await createListingAPI({
            listingCreatedBy: { id: userInfo.id },
            locationType,
            placeType: placeType?.title,
            mapData,
            locationData,
            placeSpace,
            price,
            title,
            description,
            placeAmeneties: placeAmenities,
            photos
        })
        if (!result?.createdAt) {
            setIsFailed(true);
            toast.error("Đã tạo điểm lưu trú thất bại")
            setLoading(false);
            return
        }
        setIsFailed(false);
        setLoading(false);
    }
    return (
        <>
            {
                loading ?
                    <div>
                        <h2>Đang tạo điểm lưu trú...</h2>
                    </div>
                    :
                    isFailed ?
                        <div className="mt-36 text-black flex flex-col gap-5 items-center justify-center h-full">
                            <p className="text-red-500 font-semibold text-4xl">Đã tạo điểm lưu trú thất bại</p>
                        </div>
                        :
                        <div className="mt-36 text-black flex flex-col gap-5 items-center justify-center h-full">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <h2 className="font-semibold text-4xl text-center">Đã tạo thành công</h2>
                                <p>
                                    Bây giờ bạn có thể quản lý điểm lưu trú của bạn.
                                </p>
                                <div className="flex gap-5">
                                    <button className="bg-green-500 text-white p-2 rounded-lg" onClick={() => router.push("/")}>Quay lại trang chủ</button>
                                    <button className="bg-green-500 text-white p-2 rounded-lg" onClick={() => router.push("/my-listings")}>
                                        Xem điểm lưu trú vừa tạo
                                    </button>
                                </div>
                                <Confetti width={window.innerWidth} height={window.innerHeight} />
                            </div>
                        </div>
            }
        </>
    )
}

export default listingCreated
