'use client'
import "@cometchat/chat-uikit-react/css-variables.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Modal, Collapse, Button, Spin } from "antd";
import { deleteListing } from "@/lib/listings";
import { useRouter } from "next/navigation";
import { getTripByListingId } from "@/lib/listings";
import { useAppstore } from "@/store/store";
import { deleteTripByAPI } from "@/lib/trips";
import { CometChat } from "@cometchat/chat-sdk-javascript";
const { Panel } = Collapse;
import {
    CometChatMessageComposer,
    CometChatMessageHeader,
    CometChatMessageList,
    CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import "../app/CometChat/CometChatNoSSR/CometChatNoSSR.css";
export const ListingCard = ({ data, isMyListing }) => {
    const isTour = data?.isTour;
    const isVehicle = data?.isVehicle;
    const defaultAvatar =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ395qcYOPsd3cuhPPIzz871lLgqHr0Di0F5w&s";
    const SignUpnCometChat = async (
        uid,
        name,
        avatar
    ) => {
        const result = await createCometChatUser({
            uid: uid,
            name: name,
            avatar: avatar || defaultAvatar,
            // link: userInfo?.username || defaultAvatar,
            role: "default",
            statusMessage: "user",
            metadata: "user",
            tags: ["user"],
            withAuthToken: true,
        });
        if (result?.error) {
            toast.error(result?.error);
        } else {
            //   CometChatUIKit.login(result?.id).then((user: CometChat.User) => {
            //     console.log("Login Successful:", user);
            //     // Mount your app or perform post-login actions if needed
            //   });
        }
    };
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tripData, setTripData] = useState([]);
    const { setUserListings, userListings } = useAppstore();
    const { setCurrentListing } = useAppstore();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [chatUser, setChatUser] = React.useState(null);
    const handleDelete = async () => {
        try {
            //disconnect trip
            const deleteTripPromises = tripData?.length > 0 && tripData.map((trip) => deleteTripByAPI(trip.id));
            const deleteTripResult = await Promise.all(deleteTripPromises);
            console.log('delete trip result', deleteTripResult);
            if (deleteTripResult) {
                const result = await deleteListing(data.id);
                if (result?.createdAt) {
                    setIsModalOpen(false);
                    setUserListings(userListings?.filter((listing) => listing.id !== data.id));
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            const result = await deleteListing(data.id);
            if (result?.createdAt) {
                setIsModalOpen(false);
                setUserListings(userListings?.filter((listing) => listing.id !== data.id));
            }
            setIsModalOpen(false);
        }
    };
    const openChatWithUser = async (
        uid,
        name,
        avatar
    ) => {
        try {
            const UID = uid;
            CometChat.getUser(UID).then(
                (user) => {
                    setChatUser(user);
                },
                (error) => {
                    console.log("User fetching failed with error:", error);
                    //
                    SignUpnCometChat(uid, name, avatar).then((user) => {
                        //   openChatWithUser(uid,name,avatar);
                        CometChat.getUser(UID).then(
                            (user) => {
                                setChatUser(user);
                            },
                            (error) => {
                                console.log("User fetching failed with error:", error);
                            }
                        );
                    });
                }
            );
            setIsContactModalOpen(true);
        } catch (error) {
            setIsContactModalOpen(false);
            console.error("Failed to fetch user:", error);
        }
    };
    const handleGetTrip = async (listingId) => {
        try {
            const result = await getTripByListingId(listingId);
            console.log('listing id', listingId);
            if (result) {
                console.log('trip data', result);
                setTripData(result);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetTrip(data.id);
    }, [data.id]);
    const handleCloseContactModal = () => {
        setIsContactModalOpen(false);
        setChatUser(null);
      };
    
    return (
        <>
            <div
                onClick={() => {
                    setCurrentListing(data);
                    if (isTour) {
                        router.push(`/tour-detail/${data.id}`);
                    } else if (isVehicle) {
                        router.push(`/vehicle-detail/${data.id}`);
                    } else {
                        router.push(`/listing/${data.id}`);
                    }
                }}
                className="max-w-xs w-full bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
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
                    {
                        !isTour && (
                            <p className="text-gray-600 line-clamp-2">{data?.description ?? "No description available."}</p>
                        )
                    }

                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-green-700 font-bold text-lg">
                            {data?.price?.toLocaleString()} vnđ
                        </span>
                        {/* Nút xem trip info */}
                        {tripData?.length > 0 && isMyListing && <Button
                            size="small"
                            type="link"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleGetTrip(data.id);
                            }}
                        >
                            Xem thông tin booking
                        </Button>}
                    </div>

                    {!!isMyListing && (
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded w-full hover:bg-red-600 mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                        >
                            Xóa
                        </button>
                    )}

                    {/* Hiển thị Accordion nếu có tripData */}
                    {tripData?.length > 0 && isMyListing && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <Collapse
                                className="mt-4"
                                onClick={(e) => e.stopPropagation()}
                                defaultActiveKey={["1"]}
                            >
                                {tripData?.length > 0 && tripData.map((trip) => (
                                    <Panel header="Thông tin booking" key={trip?.id}>
                                        <p><strong>Giá:</strong> {Number(trip?.tripinfo?.price).toLocaleString()} vnđ</p>
                                        <p><strong>Ngày bắt đầu:</strong> {trip?.tripinfo?.startDate}</p>
                                        <p><strong>Ngày kết thúc:</strong> {trip?.tripinfo?.endDate}</p>
                                        <p><strong>Khách hàng:</strong> {trip?.user?.firstName} {trip?.user?.lastName}</p>
                                        <p><strong>Email:</strong> {trip?.user?.email}</p>
                                        <p><strong>Username:</strong> {trip?.user?.username}</p>
                                        <Button
                                            type="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openChatWithUser(trip?.user?.id, trip?.user?.firstName, trip?.user?.avatar);
                                            }}
                                        >
                                            liên hệ
                                        </Button>
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
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
            <Modal
                title="Liên hệ"
                open={isContactModalOpen}
                onCancel={handleCloseContactModal}
                // onOk={handleConfirmDelete}
                okText="Xóa"
                okType="danger"
                cancelText="Hủy"
            >
                {chatUser ? (
                    <div className="w-full   min-w-[100%] messages-wrapper">
                        <CometChatMessageHeader user={chatUser} />
                        <CometChatMessageList user={chatUser} />
                        <CometChatMessageComposer user={chatUser} />
                    </div>
                ) : (
                    <p>
                        <Spin/>
                    </p>
                )}
            </Modal>
        </>
    );
};
