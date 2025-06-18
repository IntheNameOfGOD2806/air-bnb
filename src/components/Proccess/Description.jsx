import React from "react";
import { useAppstore } from "../../store/store";
import { Input } from "antd";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
const Description = ({ isTour }) => {
    const { description, setDescription } = useAppstore();
    return (
        <>
            {/* <div className="flex flex-col gap-5 items-center justify-center text-black h-full ">
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-4xl text-center">Mô tả</h2>
                    <p className="text-center">Một mô tả hấp dẫn có thể thu hút khách hàng và giúp họ hiểu rõ hơn về điểm lưu trú của bạn.</p>
                </div>

            </div> */}
            {
                !isTour ? (
                    <div className="flex flex-col gap-4">
                        <Input.TextArea className="border  border-gray-400 h-40 w-[500px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl"
                            value={description}
                            onChange={(e) => { if (e.target.value.length <= 500) { setDescription(e.target.value) } }}
                        />
                        <span className="">{description.length}/500</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <SimpleEditor />
                    </div>
                )
            }
        </>
    )
}

export default Description
