import React from "react";
import { AmenitiesType } from "../../data/Amenities";
import { useAppstore } from "@/store/store";
const ProccessAmenities = () => {
    const { placeAmenities, setPlaceAmenities } = useAppstore()
    console.log('dâdadd',placeAmenities)
    const addAmenity = (name) => {
        setPlaceAmenities([...placeAmenities, name])
    }
    const removeAmenity = (name) => {
        setPlaceAmenities(placeAmenities.filter((amenity) => amenity !== name))
    }
    return (
        <>
            <div className="text-black flex items-center justify-center">

                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold text-4xl text-center" >
                        Cho Khách hàng biết điểm khác biệt của chỗ ở của bạn
                    </h2>
                    <p className="text-center">Trong bước này, bạn có thể chọn các tiện ích và dịch vụ mà khách hàng có thể sử dụng trong phòng của bạn.</p>
                    <div className="flex flex-col gap-4 max-h-[65vh] overflow-auto scroll no-scrollbar">
                        {AmenitiesType.map(({ type, data }) => (
                            <div className="flex flex-col gap-5" key={type}>
                                {
                                    type === "advanced" && <span className="text-center text-lg font-medium ">
                                        Bạn có tiện ích gì đặc biệt không?
                                    </span>
                                }
                                {
                                    type === "safety" && <span className="text-center text-lg font-medium ">
                                        Bạn có tiện ích gì an toàn không?
                                    </span>
                                }
                                <div className="grid grid-cols-3 gap-5">
                                    {data.map(({ name, svgPath }) => (
                                        <button
                                            onClick={
                                                () =>
                                                    placeAmenities?.includes(name) ? removeAmenity(name) : addAmenity(name)
                                            } key={name} className={`${placeAmenities?.includes(name) && "border-green-500 bg-green-50"} max-h-28 transition-all duration-300 flex flex-col justify-start border font-semibold border-gray-300 rounded-md p-3 hover:bg-green-100 cursor-pointer gap-2`}>
                                            <div className="max-h-28 max-w-10">{svgPath}</div>
                                            <span className="text-black font-medium">{name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProccessAmenities
