import Image from "next/image";
import React, { useState } from "react";
import { Modal, Button } from "antd";
import { deleteListing } from "@/lib/listings";
import { useRouter } from "next/navigation";
import { useAppstore } from "@/store/store";
export const ListingCard = ({ data, isMyListing }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setUserListings, userListings } = useAppstore();
    const { setCurrentListing } = useAppstore();
    const handleDelete = async () => {
        try {
            const result = await deleteListing(data.id);
            if (result?.createdAt) {
                console.log('result ewrwer wr ', result);
                setIsModalOpen(false);
                setUserListings(userListings?.filter((listing) => listing.id !== data.id));
                // router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsModalOpen(false);
        }

    };

    return (
        <>
            <div
             onClick={()=>{
                setCurrentListing(data)
                // localStorage.setItem("currentListingId", data.id)
                router.push(`/listing/${data.id}`)
             }}
            className="max-w-xs w-full bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative w-full h-48 sm:h-56">
                    {data?.photos?.[0] ? (
                        <Image
                            src={data.photos[0]}
                            alt={data?.title ?? "Listing Image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex items-center justify-center bg-gray-100 w-full h-full">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-green-900 truncate" title={data?.title}>
                        {data?.title ?? "Untitled"}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{data?.description ?? "No description available."}</p>

                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-green-700 font-bold text-lg">
                            {data?.price?.toLocaleString()} vnđ
                        </span>
                    </div>

                    {!!isMyListing && (
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded w-full hover:bg-red-600 mt-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Xóa
                        </button>
                    )}
                </div>
            </div>

            {/* Ant Design Modal */}
            <Modal
                title="Xác nhận xóa"
                open={isModalOpen}
                onOk={handleDelete}
                onCancel={() => setIsModalOpen(false)}
                okText="Xác nhận"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p>Bạn có chắc chắn muốn xóa bài đăng này không?</p>
            </Modal>
        </>
    );
};
