'use client'
import React, { useEffect } from "react";
import { useAppstore } from "@/store/store";
import { CldUploadButton } from "next-cloudinary";
import { Image } from "antd";
const Photo = () => {
    const { photos, setPhotos } = useAppstore();
    const [PhotosArray, setPhotosArray] = React.useState([...photos]);
    console.log('check', photos)
    const handleUpload = (data) => {
       setPhotosArray((prev) => [...prev, data?.info?.secure_url])
    };
    useEffect(() => {
        setPhotos(PhotosArray)
    }, [PhotosArray])
    return (
        <>
            <div className="text-black flex gap-5 justify-center items-center flex-col h-full">
                <h2 className="font-semibold text-4xl">thêm ảnh cho điểm lưu trú của bạn</h2>
                <p className="text-center">Bạn cần ít nhất 5 ảnh,bao gồm ảnh phòng ngủ, phòng tắm, bếp, và khu vực xung quanh.</p>
                <CldUploadButton
                    options={{
                        multiple: true,
                        uploadPreset: "dwjird2qm",
                    }}
                    onSuccess={(data) => {
                        console.log('check upload', data)
                        handleUpload(data)
                    }}
                    onError={(error) => console.error(error)}
                >
                    <span className="bg-green-400 py-3 mt-5 px-5 text-white  text-base font-medium rounded-md cursor-pointer">
                        Upload
                    </span>
                </CldUploadButton>
                <div className="grid grid-cols-3 gap-4 h-[55vh] overflow-auto pb-10 no-scrollbar">
                    {photos?.map((photo, index) => (
                        <div className="relative h-36 w-[200px]" key={index}>
                            <Image src={photo} fill alt="Upload" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Photo
