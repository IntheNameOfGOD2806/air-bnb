"use client";
import { useState } from "react";
import { useAppstore } from "../../store/store";
import { ListingCard } from "../ListingCard";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { Spin } from "antd";

const ITEMS_PER_PAGE = 10;

export default function ListUserListingsView({ loading, isTour }) {
    const isLoggedIn = !!useAppSelector(selectUserInfo)?.id;
    const { userListings } = useAppstore();
    const [currentPage, setCurrentPage] = useState(1);

    // Tính số trang
    const totalPages = Math.ceil((userListings?.length || 0) / ITEMS_PER_PAGE);

    // Lấy dữ liệu trang hiện tại
    const paginatedListings = userListings?.filter((listing) => listing?.isTour === false).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    // Lấy dữ liệu trang hiện tại
    const paginatedListingsTour = userListings?.filter((listing) => listing?.isTour === true).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Hàm chuyển trang
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {loading &&
                <div className="flex items-center justify-center h-screen">
                    <Spin />
                </div>}
            {!loading && <div className="px-5 py-10">
                <h2 className=" text-green-700 text-2xl text-center font-bold mb-4">Danh sách bài đăng điểm lưu trú</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {/* title */}

                    {paginatedListings?.map((listing) => (
                        <ListingCard key={listing.id} data={listing} isTour={isTour} isMyListing={true} />
                    ))}
                    {/* No data */}

                </div>
                <h2 className=" text-green-700 text-2xl text-center font-bold mb-4">Danh sách các tour</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {/* title */}

                    {paginatedListingsTour?.map((listing) => (
                        <ListingCard key={listing.id} data={listing} isTour={isTour} isMyListing={true} />
                    ))}
                    {/* No data */}

                </div>
                {userListings?.length === 0 || !userListings && !loading && <p className="mt-32 font-bold text-xl flex items-center justify-center text-center text-gray-500">Không có dữ liệu, hãy sử dụng tính năng "Đăng Bài" để đăng bài</p>}

                {/* Phân trang */}
                {isLoggedIn && <div className="flex justify-center mt-8 gap-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Trước
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-green-500 text-white" : ""
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>}
            </div>}
        </>
    );
}
