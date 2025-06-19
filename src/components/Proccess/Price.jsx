import React from "react";
import { useAppstore } from "../../store/store";
import { Input, InputNumber } from "antd";
const Price = ({ isTour }) => {
    const { price, setPrice } = useAppstore();
    return (
        <div className="flex flex-col gap-5 items-center justify-center text-black h-full ">
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-4xl text-center">Giá</h2>
                <p className="text-center">Hãy cho khách hàng biết giá của {isTour ? "tour" : "điểm lưu trú"} của bạn.</p>
            </div>
            <div className="flex flex-col gap-4">
                <InputNumber className="border  border-gray-400 h-40 w-[500px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl"
                    value={price || 0}
                    suffix="vnđ"
                    min={1}
                    // pattern="^[0-9]*$"
                    max={10000000}
                    accept="^[0-9]*$"
                    // precision={0}
                    onChange={(value) => { if (value) { setPrice(Number(value)) } else { setPrice(0) } }}
                />
            </div>
        </div>
    )
}

export default Price
