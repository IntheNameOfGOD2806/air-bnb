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
import ListingMap from "../../../components/ListingMap";
import TripScheduler from "../../../components/TripScheduler";
import { SimpleEditor } from "../../../components/tiptap-templates/simple/simple-editor";

const Tour = () => {
    const params = useParams(); // ✅ Lấy params qua hook
    const listingId = params?.tour;

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
                                            <h3 className="text-2xl text-green-500 text-center font-bold">Thông tin tour</h3>
                                            <SimpleEditor isView={true} content={currentListing?.description} />
                    
                                            <ListingMap />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="sticky top-20">
                                        <TripScheduler listingId={currentListing?.id} isTour={true} />
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

export default Tour;
