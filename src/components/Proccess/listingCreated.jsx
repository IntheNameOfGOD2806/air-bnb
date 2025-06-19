'use client'
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useAppstore } from "@/store/store";
import { useAppSelector } from "@/lib/hooks";
import { createListingAPI } from "@/lib/listings";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
const listingCreated = ({ isTour }) => {
    const router = useRouter();
    const userInfo = useAppSelector(selectUserInfo);
    const [loading, setLoading] = React.useState(false);
    const [isFailed, setIsFailed] = React.useState(false);
    const {
        locationType = "",
        placeType = "",
        mapData,
        locationData,
        placeSpace,
        price,
        title,
        description,
        setDescription,
        placeAmenities,
        photos,
    } = useAppstore();
    useEffect(() => {
        if (!userInfo) {
            toast.error("Vui lòng đăng nhập để thao tác");
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
            placeType: placeType?.title || "",
            mapData,
            locationData,
            placeSpace,
            price,
            title,
            description : isTour ? JSON.stringify(description) : description,
            placeAmeneties: placeAmenities,
            photos,
            isTour: !!isTour ? true : false
        })
        if (result?.error) {
            setIsFailed(true);
            toast.error("Đã tạo thất bại")
            setLoading(false);
            return
        }
        else if (result?.createdAt) {
            toast.success("Đã tạo thành công")
            setDescription('')
            
        }
        setIsFailed(false);
        setLoading(false);
    }
    // const createTour = async () => {
    //     setLoading(true);
    //     const result = await create({
    //         tourCreatedBy: { id: userInfo.id },
    //         locationType,
    //         placeType: placeType?.title,
    //         mapData,
    //         locationData,
    //         placeSpace,
    //         price,
    //         title,
    //         description,
    //         placeAmeneties: placeAmenities,
    //         photos
    //     })
    //     if (result?.error) {
    //         setIsFailed(true);
    //         toast.error("Đã tạo tour thất bại")
    //         setLoading(false);
    //         return
    //     }
    //     else if (result?.createdAt) {
    //         toast.success("Đã tạo tour thành công")
    //     }
    //     setIsFailed(false);
    //     setLoading(false);
    // }
    return (
        <>
            {
                loading ?
                    <div>
                        <h2>Đang tạo...</h2>
                    </div>
                    :
                    isFailed ?
                        <div className="mt-36 text-black flex flex-col gap-5 items-center justify-center h-full">
                            <p className="text-red-500 font-semibold text-4xl">Đã tạo thất bại</p>
                        </div>
                        :
                        <div className="mt-36 text-black flex flex-col gap-5 items-center justify-center h-full">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <h2 className="font-semibold text-4xl text-center">Đã tạo thành công</h2>
                                <p>
                                    {
                                        isTour ? "Bây giờ bạn có thể quản lý tour của bạn" : "Bây giờ bạn có thể quản lý điểm lưu trú của bạn"
                                    }
                                </p>
                                <div className="flex gap-5">
                                    <button className="bg-green-500 text-white p-2 rounded-lg" onClick={() => router.push("/")}>Quay lại trang chủ</button>
                                    <button className="bg-green-500 text-white p-2 rounded-lg" onClick={() => router.push("/my-listings")}>
                                        {
                                            isTour ? "Xem tour vừa tạo" : "Xem điểm lưu trú vừa tạo"
                                        }
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
