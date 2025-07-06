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
function getHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}

function getListingsWithinRadius(centerLatitude, centerLongitude, radiusKm, allListingsData) {
    const listingsInRange = [];

    for (const listing of allListingsData) {
        // Ensure the listing has mapData and nested latitude/longitude properties
        if (listing.mapData && typeof listing.mapData.latitude === 'number' && typeof listing.mapData.longitude === 'number') {
            const distance = getHaversineDistance(
                centerLatitude,
                centerLongitude,
                listing.mapData.latitude, // Accessing latitude from mapData
                listing.mapData.longitude  // Accessing longitude from mapData
            );

            if (distance <= radiusKm) {
                listingsInRange.push(listing);
            }
        } else {
            console.warn('Listing missing valid mapData.latitude or mapData.longitude:', listing);
        }
    }

    return listingsInRange;
}

const Page = () => {
    const params = useParams(); // ✅ Lấy params qua hook
    const listingId = params?.listing;
    const { vehicleListings } = useAppstore();
    const { setTabIndex, currentListing, setCurrentListing } = useAppstore();
    const isLoggedIn = !!useAppSelector(selectUserInfo)?.id;
    const foundedVehicleListings = getListingsWithinRadius(currentListing?.mapData.latitude, currentListing?.mapData.longitude, 10, vehicleListings);
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
                                <div>
                                    <h2 className="text-5xl font-bold">Danh sách xe</h2>
                                    <div className="grid grid-cols-2 gap-5">
                                        {
                                            foundedVehicleListings?.length === 0 && (
                                                <p className="mt-32 font-bold text-xl flex items-center justify-center text-center text-gray-500">Không có dữ liệu,hiện tại không có xe nào</p>
                                            )
                                        }
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {foundedVehicleListings?.map((listing) => (
                                                <div
                                                    key={listing?.id}
                                                    className="bg-white rounded-2xl min-w-[250px] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
                                                >
                                                    <div className="w-full h-40 bg-gray-100 overflow-hidden">
                                                        <img
                                                            src={listing?.photos[0]}
                                                            alt={listing?.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-4 flex flex-col gap-2">
                                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                                            {listing?.title}
                                                        </h3>
                                                        <p className="text-gray-500 text-sm">
                                                            {formatAddress(listing?.locationData)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

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
