'use client'
import { useRouter } from "next/navigation";
import { useAppSelector } from "../lib/hooks";
import { selectUserInfo } from "../lib/features/auth/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAppstore } from "../store/store";
import { BsFillFlagFill } from "react-icons/bs";
import { createTripAPI } from "../lib/trips";
import Diamond from "../svg/daimond";
import { Spin } from "antd";
import { getTripByListingId } from "@/lib/listings";
import { Collapse } from 'antd';
const { Panel } = Collapse;
const isOverlapping = (newStart, newEnd, trips) => {
    const newStartDate = new Date(newStart);
    const newEndDate = new Date(newEnd);

    return trips.some((trip) => {
        const existingStart = new Date(trip.tripinfo.startDate);
        const existingEnd = new Date(trip.tripinfo.endDate);

        // Check if new trip overlaps with existing one
        return (
            (newStartDate <= existingEnd && newEndDate >= existingStart)
        );
    });
};

const TripAccordion = ({ trips }) => {
    return (
        <Collapse accordion>
            {trips.map((trip, index) => (
                <Panel
                    header={`Chuyến đi #${index + 1} - ${trip.user.firstName} ${trip.user.lastName}`}
                    key={trip.id}
                >
                    <div className="flex flex-col gap-2">
                        <p><strong>Email:</strong> {trip.user.email}</p>
                        <p><strong>Ngày bắt đầu:</strong> {trip.tripinfo.startDate}</p>
                        <p><strong>Ngày kết thúc:</strong> {trip.tripinfo.endDate}</p>
                        <p><strong>Giá:</strong> {trip.tripinfo.price} vnĐ</p>
                    </div>
                </Panel>
            ))}
        </Collapse>
    );
};
export default function TripScheduler({ listingId, isTour }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { currentListing } = useAppstore();
    const userInfo = useAppSelector(selectUserInfo);
    const [state, setState] = useState({
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
    })
    const [guests, setGuests] = useState(0);
    const [tripData, setTripData] = useState(null);
    const calculateDateDiff = () => {
        const startDate = new Date(state.startDate);
        const endDate = new Date(state.endDate);
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
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
        handleGetTrip(listingId);
    }, [listingId]);
    const handleReserve = async () => {
        if (!userInfo) {
            toast.error("Vui lòng đăng nhập để đặt phòng");
            return;
        }

        const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
        if (!isTour) {
            if (state.startDate < today || state.endDate < today) {
                toast.error("Không thể chọn ngày trong quá khứ");
                return;
            }

            if (state.endDate <= state.startDate) {
                toast.error("Ngày kết thúc phải sau ngày bắt đầu");
                return;
            }

            if (tripData && isOverlapping(state.startDate, state.endDate, tripData)) {
                toast.error("Khoảng thời gian bạn chọn đã có người đặt trước");
                return;
            }

        }
        setLoading(true);
        const data = {
            listing: { id: currentListing?.id },
            user: { id: userInfo?.id },
            tripinfo: {
                startDate: isTour ? '' : state.startDate,
                endDate: isTour ? '' : state.endDate,
                price: `${isTour ? currentListing?.price : currentListing?.price * calculateDateDiff()}`,
                isTour: isTour
            }
        };

        const res = await createTripAPI(data);
        if (res) {
            toast.success("Đặt phòng thành công, vui lòng kiểm tra trong mục trip");
        } else {
            toast.error("Đặt phòng thất bại");
        }

        console.log(res);
        setLoading(false);
    };

    return (
        <div className="sticky top-0 w-full flex flex-col gap-6 items-center justify-start">
            <div className="border border-gray-400 rounded-lg shadow-lg flex p-4 gap-2 items-start px-8 flex-col w-full">
                <div className="w-full flex items-center justify-between">

                    <div className="flex gap-1 text-lg">
                        <span className="font-bold">{currentListing?.price} vnĐ</span>
                        {
                            !isTour && (
                                <span>1 đêm</span>
                            )
                        }
                    </div>
                    {
                        isTour && (
                            <span>Tour diễn ra trong
                                <span className="font-bold text-green-500 text-lg">{
                                    currentListing?.locationData?.tourTime
                                }</span>
                                ngày</span>
                        )
                    }
                </div>
                {
                    isTour && (
                        <div className="">
                            <span className="font-semibold text-green-500 mr-2">Ngày Tour gần nhất:</span>
                            : {currentListing?.locationData?.nearestTour}</div>
                    )
                }
                {
                    !isTour && (
                        <div className="flex flex-col w-full">
                            <div className="grid grid-cols-2 w-full">
                                <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tl-md cursor-pointer">
                                    <label htmlFor="" className="font-semibold text-xs">CHECK IN</label>
                                    <input type="date" name="startDate" className="text-sm accent-green-500 "
                                        value={state.startDate.toString()}
                                        onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                                        id="" />
                                </div>
                                <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tr-md cursor-pointer">
                                    <label htmlFor="" className="font-semibold text-xs">CHECK OUT</label>
                                    <input type="date" name="endDate" className="text-sm accent-green-500 "
                                        value={state.endDate.toString()}
                                        onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                                        id="" />
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-b-md cursor-pointer">
                                        <label htmlFor="" className="font-semibold text-xs">GUESTS</label>
                                        <input type="number" name="guests" className="text-sm px-1 py-1 border-none outline-none "
                                            value={guests}
                                            onChange={(e) => {
                                                if (e.target.value > currentListing?.placeSpace?.guests) {
                                                    toast.error("Số lượng khách vượt quá số lượng khách tối đa");
                                                    return;
                                                } else {
                                                    setGuests(e.target.value)
                                                }
                                            }}
                                            id="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    loading ? (
                        <Spin />
                    ) : (
                        <button onClick={handleReserve} className="bg-green-500 hover:bg-white hover:text-green-400 text-white w-full font-medium py-3 mt-5 rounded-md cursor-pointer">
                            {isTour ? "Đặt tour" : "Đặt phòng"}
                        </button>
                    )
                }
                <span className="text-center w-full">
                    Bạn sẽ chưa thanh toán cho đến khi chuyến đi bắt đầu
                </span>
                <div className="flex justify-between w-full">
                    <span className="">
                        {isTour ? currentListing?.price : currentListing?.price}vnĐ
                        {!isTour && (
                            <span>
                                {currentListing?.price}vnĐ x {calculateDateDiff()} đêm
                            </span>
                        )}
                    </span>
                    <span className="">
                        {isTour ? currentListing?.price : currentListing?.price * calculateDateDiff()}vnĐ
                    </span>
                </div>
            </div>
            {
                !isTour && (
                    <div className="flex border border-gray-400 rounded-lg p-4 gap-2 items-start px-8">
                        <span className="flex flex-col">
                            <p></p>
                            <strong>Giá tốt nhất</strong>
                            Điểm lưu trú của {currentListing?.listingCreatedBy?.firstName} thường được đánh giá cao
                        </span>

                        <span>
                            {isTour ? currentListing?.price : currentListing?.price * calculateDateDiff()}vnĐ
                        </span>
                        <Diamond />
                    </div>
                )
            }
            {
                tripData?.length > 0 && !!tripData?.length && !isTour && (
                    <>
                        <p className="text-center text-lg font-semibold text-green-500">Các chuyến đi đã đặt trước</p>
                        <TripAccordion trips={tripData} />
                    </>
                )
            }
            <div className="flex gap-3 items-center cursor-pointer">
                <span>
                    <BsFillFlagFill />
                </span>
                <span className="underline font-semibold">Báo cáo vấn đề</span>
            </div>
        </div>
    );
}