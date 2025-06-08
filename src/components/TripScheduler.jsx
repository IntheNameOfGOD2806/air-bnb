'use client'
import { useRouter } from "next/navigation";
import { useAppSelector } from "../lib/hooks";
import { selectUserInfo } from "../lib/features/auth/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppstore } from "../store/store";
import { BsFillFlagFill } from "react-icons/bs";
import { createTripAPI } from "../lib/trips";
import Diamond from "../svg/daimond";
import { Spin } from "antd";

export default function TripScheduler() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { currentListing } = useAppstore();
    const userInfo = useAppSelector(selectUserInfo);
    const [state, setState] = useState({
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
    })
    const [guests, setGuests] = useState(0);
    const calculateDateDiff = () => {
        const startDate = new Date(state.startDate);
        const endDate = new Date(state.endDate);
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    const handleReserve = async () => {
        if (!userInfo) {
            toast.error("Vui lòng đăng nhập để đặt phòng");
            return;
        } else {
            setLoading(true);
            const data = {
                listing: { id: currentListing?.id },
                user: { id: userInfo?.id },
                tripinfo: {
                    startDate: state.startDate,
                    endDate: state.endDate,
                    price: `${currentListing?.price * calculateDateDiff()}`,
                }
            }
            const res = await createTripAPI(data);
            // res && router.push(`/trips`);
            console.log(res);
            setLoading(false);
        }

    }
    return (
        <div className="sticky top-0 w-full flex flex-col gap-6 items-center justify-start">
            <div className="border border-gray-400 rounded-lg shadow-lg flex p-4 gap-2 items-start px-8 flex-col w-full">
                <div className="flex gap-1 text-lg">
                    <span className="font-bold">{currentListing?.price} vnĐ</span>
                    <span>1 đêm</span>
                </div>
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
                                    onChange={(e) => { if (e.target.value > currentListing?.placeSpace?.guests){
                                        toast.error("Số lượng khách vượt quá số lượng khách tối đa");
                                        return;
                                    } else {
                                        setGuests(e.target.value)
                                    } }}
                                    id="" />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loading ? (
                        <Spin/>
                    ) : (
                        <button onClick={handleReserve} className="bg-green-500 hover:bg-white hover:text-green-400 text-white w-full font-medium py-3 mt-5 rounded-md cursor-pointer">Đặt phòng</button>
                    )
                }
                <span className="text-center w-full">
                    Bạn sẽ chưa thanh toán cho đến khi chuyến đi bắt đầu
                </span>
                <div className="flex justify-between w-full">
                    <span className="">
                        {currentListing?.price}vnĐ x {calculateDateDiff()} đêm
                    </span>
                    <span className="">
                        {currentListing?.price * calculateDateDiff()}vnĐ
                    </span>
                </div>
            </div>
            <div className="flex border border-gray-400 rounded-lg p-4 gap-2 items-start px-8">
                <span className="flex flex-col"> 
                    <p></p>
                    <strong>Giá tốt nhất</strong> 
                    Điểm lưu trú của {currentListing?.listingCreatedBy?.firstName} thường được đánh giá cao
                </span>
                <span>
                    {currentListing?.price * calculateDateDiff()}vnĐ
                </span>
                <Diamond />
            </div>
            <div className="flex gap-3 items-center cursor-pointer">
                <span>
                    <BsFillFlagFill />
                </span>
                <span className="underline font-semibold">Báo cáo vấn đề</span>
            </div>
        </div>
    );
}