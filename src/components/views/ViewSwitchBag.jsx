import React from "react";
import { BsFillMapFill } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useAppstore } from "@/store/store";
export default function ViewSwitchBag() {
    const { isMapView, setIsMapView } = useAppstore();
    return (
        <div className="fixed z-50 flex justify-center items-center bottom-16 left-0 right-0 cursor-pointer" onClick={() => setIsMapView()}>
            <div className="bg-green-500 p-4 text-white rounded-full">
                <span className="flex items-center gap-2 text-sm">
                    {
                        !isMapView ? (
                            <>
                                Xem Bản Đồ
                                <BsFillMapFill />
                            </>
                        ) : (
                            <>
                                Xem Danh Sách Điểm Lưu trú
                                <AiOutlineUnorderedList />
                            </>
                        )
                    }
                </span>
            </div>
        </div>
    )
}