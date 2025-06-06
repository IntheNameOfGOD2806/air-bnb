import React from "react";
import { useAppstore } from "@/store/store";
import { CldUploadButton } from "next-cloudinary";
const Photo = () => {
    const { photos, setPhotos } = useAppstore();
    const handleUpload = (data) => {
        setPhotos([...photos, data?.info?.secure_url])
    };
    return (
        <>
            <div className="flex gap-5 justify-center items-center flex-col h-full">
                <h2 className="font-semibold text-4xl">thêm ảnh cho điểm lưu trú của bạn</h2>
                <p className="text-center">Bạn cần ít nhất 5 ảnh, bao gồm ảnh phòng ngủ, phòng tắm, bếp, và khu vực xung quanh.</p>
                <CldUploadButton
                    options={{
                        multiple: true,
                    }}
                    onSuccess={handleUpload}
                    uploadPreset="lxgz9s60"
                    onError={(error) => console.error(error)}
                >
                   <span className=""></span>
                </CldUploadButton>

            </div>
        </>
    )
}

export default Photo
