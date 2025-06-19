import React from "react";
import { useAppstore } from "@/store/store";
import { Input } from "antd";
const Title = ({isTour}) => {
    const { title, setTitle } = useAppstore();
    return (
        <div className="flex flex-col gap-5 items-center justify-center text-black h-full ">
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-4xl text-center">{isTour ? "Tiêu đề cuả tour của bạn" : "Tiêu đề cuả điểm lưu trú"}</h2>
                <p className="text-center">Một tiêu đề hấp dẫn có thể thu hút khách hàng và giúp họ hiểu rõ hơn về điểm lưu trú của bạn.</p>
            </div>
            <div className="flex flex-col gap-4">
                <Input.TextArea className="border  border-gray-400 h-40 w-[500px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl"
                    value={title}
                    onChange={(e) => { if (e.target.value.length <= 50) { setTitle(e.target.value) } }}
                />
                <span className="">{title.length}/50</span>
            </div>
        </div>
    )
}

export default Title
