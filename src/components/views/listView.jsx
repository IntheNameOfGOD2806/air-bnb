"use client";
import { useState } from "react";
import { useAppstore } from "../../store/store";
import { ListingCard } from "../ListingCard";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";

const ITEMS_PER_PAGE = 10;

export default function ListView() {
    const isLoggedIn = !!useAppSelector(selectUserInfo)?.id;
  const { listings } = useAppstore();
  const [currentPage, setCurrentPage] = useState(1);

  // Tính số trang
  const totalPages = Math.ceil((listings?.length || 0) / ITEMS_PER_PAGE);

  // Lấy dữ liệu trang hiện tại
  const paginatedListings = listings?.slice(
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
    <div className="px-5 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {paginatedListings?.map((listing) => (
          <ListingCard key={listing.id} data={listing} isMyListing={false} isWishList={false}/>
        ))}
        {/* No data */}
      </div>
        {listings?.length === 0 && <p className="mt-32 font-bold text-xl flex items-center justify-center text-center text-gray-500">Không có dữ liệu, hãy sử dụng tính năng "Đăng Bài" để đăng bài</p>}

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
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-green-500 text-white" : ""
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
    </div>
  );
}
