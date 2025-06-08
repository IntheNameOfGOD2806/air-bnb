'use client'
import React, { useEffect } from "react";
import { useAppstore } from "../../../store/store";
import { getListing } from "../../../lib/listings";
import { useAppSelector } from "../../../lib/hooks";
import { selectUserInfo } from "../../../lib/features/auth/authSlice";
import { toast } from "react-toastify";
import AppWrapper from "../../wrapper";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
import { use } from 'react';
import ListingPhoto from "../../../components/ListingPhoto.jsx";
import ListingAmeneties from "../../../components/ListingAmeneties.jsx";
import ListingMap from "../../../components/ListingMap.jsx";
import TripScheduler from "../../../components/TripScheduler.jsx";
const Page = ({ params }) => {
    const unwrappedParams = use(params); // ✅ unwrap Promise
    const listingId = unwrappedParams.listing;

    const isLoggedIn = !!useAppSelector(selectUserInfo)?.id;
    const { currentListing, setCurrentListing } = useAppstore()
    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("Vui lòng đăng nhập để xem thông tin điểm lưu trú");
            return;
        }
        else if (!listingId) {
            toast.error("Không tìm thấy thông tin điểm lưu trú");
            return;
        }
        else {
            const getData = async () => {
                const result = await getListing(listingId)
                setCurrentListing(result)
            }
            getData()
        }

    }, [listingId])
    return (
        <div>
            <AppWrapper>
                <Content>
                    {
                        currentListing && (
                            <div
                                className=" px-20 pt-10 text-black grid gap-10 grid-cols-[2fr_1fr]">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-5xl font-bold">{currentListing?.title}</h2>
                                        {/* <p className="text-gray-500">{currentListing?.description}</p> */}
                                    </div>
                                    <ListingPhoto />
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-3">
                                            <h3 className="text-2xl font-semibold">
                                                <p className="text-gray-500 flex gap-2">

                                                    <span className="font-bold">
                                                        {currentListing?.locationType}
                                                    </span>
                                                    đăng bởi  {' '}
                                                    <span className="font-bold text-green-500">
                                                        {currentListing?.listingCreatedBy?.firstName} {' '}
                                                        {currentListing?.listingCreatedBy?.lastName}
                                                    </span>
                                                </p>
                                            </h3>
                                            <ul className="flex gap-5">
                                                {
                                                    Object.keys(currentListing?.placeSpace).map((type, index) => (
                                                        <li key={type} className="border border-gray-200 p-2 rounded-lg flex flex-col justify-start items-start w-32">
                                                            <span

                                                                className="font-bold text-2xl font-semibold">
                                                                {currentListing?.placeSpace[type]}
                                                            </span>
                                                            <span className="capitalize">
                                                                {type}
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
                                    <div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="sticky top-20">
                                        <TripScheduler />
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
