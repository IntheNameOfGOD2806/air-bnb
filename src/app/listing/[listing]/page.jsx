'use client';

import React, { useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Thêm dòng này
import { useAppstore } from "@/store/store";
import { getListing } from "@/lib/listings";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import AppWrapper from "../../wrapper";
import { Layout } from "antd";
const { Content } = Layout;
import { listingTypesVi } from "@/data/listingTypes";
import ListingPhoto from "../../../components/ListingPhoto";
import ListingAmeneties from "../../../components/ListingAmeneties";
import ListingMap from "../../../components/ListingMap";
import TripScheduler from "../../../components/TripScheduler";

const Page = () => {
    const params = useParams(); // ✅ Lấy params qua hook
    const listingId = params?.listing;

    const { setTabIndex, currentListing, setCurrentListing } = useAppstore();
    const isLoggedIn = !!useAppSelector(selectUserInfo)?.id;

    useEffect(() => {
        setTabIndex(0);
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("Vui lòng đăng nhập để xem thông tin điểm lưu trú");
            return;
        }

        if (!listingId) {
            toast.error("Không tìm thấy thông tin điểm lưu trú");
            return;
        }

        const getData = async () => {
            const result = await getListing(listingId);
            setCurrentListing(result);
        };
        getData();
    }, [listingId, isLoggedIn]);
    const translatedPlaceSpace = {
        bathrooms: "Phòng tắm",
        beds: "Giường",
        guests: "Số lượng khách",
    }
    const formatAddress = (location) => {
        const parts = [
            location?.locality,        // đường
            location?.district,        // thị trấn/quận
            location?.neighborhood,    // tỉnh/thành
            location?.country          // quốc gia
        ].filter(Boolean); // loại bỏ phần null/undefined
        return parts.join(", ");
    };
    
    return (
        <div>
            <AppWrapper>
                <Content>
                    {
                        currentListing && (
                            <div className="px-20 pt-10 text-black grid gap-10 grid-cols-[2fr_1fr]">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-5xl font-bold">{currentListing?.title}</h2>
                                        <p className="text-gray-500 text-lg">
                                            {formatAddress(currentListing?.locationData)}
                                        </p>
                                    </div>

                                    <div>
                                        <ListingPhoto />
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-3">
                                            <h3 className="text-2xl font-semibold">
                                                <p className="text-gray-500 flex gap-2">
                                                    <span className="font-bold">
                                                        {listingTypesVi[currentListing?.locationType]}
                                                    </span>
                                                    đăng bởi {' '}
                                                    <span className="font-bold text-green-500">
                                                        {currentListing?.listingCreatedBy?.firstName} {' '}
                                                        {currentListing?.listingCreatedBy?.lastName}
                                                    </span>
                                                </p>
                                            </h3>
                                            <h3 className="text-2xl font-semibold">Loại phòng : {currentListing?.placeType}</h3>
                                            <ul className="flex gap-5">
                                                {
                                                    Object.keys(currentListing?.placeSpace).map((type) => (
                                                        <li key={type} className="border border-gray-200 p-2 rounded-lg flex flex-col justify-start items-start w-32">
                                                            <span className="font-bold text-2xl font-semibold">
                                                                {currentListing?.placeSpace[type]}
                                                            </span>
                                                            <span className="capitalize">
                                                                {translatedPlaceSpace[type]}
                                                            </span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            <h3 className="text-2xl font-bold">Mô tả</h3>
                                            <p>{currentListing?.description}</p>
                                            <ListingAmeneties />
                                            <ListingMap />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="sticky top-20">
                                        <TripScheduler listingId={currentListing?.id} isTour={false} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Content>
            </AppWrapper>
        </div>
    );
};

export default Page;
