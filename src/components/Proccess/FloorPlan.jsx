import { useAppstore } from "@/store/store";
const FloorPlan = () => {
    const translatedPlaceSpace = {
        bathrooms: "Phòng tắm",
        beds: "Giường",
        guests: "Số lượng khách",
    }
    const { placeSpace, setPlaceSpace } = useAppstore();
    const handleIncrement = (place) => {
        setPlaceSpace({ ...placeSpace, [place]: placeSpace[place] + 1 });
    }
    const handleDecrement = (place) => {
        if (placeSpace[place] > 1) {
            setPlaceSpace({ ...placeSpace, [place]: placeSpace[place] - 1 });
        }
    }
    return (
        <div className="flex text-black items-center justify-center flex-col h-full gap-10">
            <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-4xl">
                    Xác định thông tin phòng
                </h2>
                <p className="text-gray-500">
                    Thông tin này sẽ được hiển thị cho khách hàng khi họ đặt phòng
                </p>
            </div>
            <div className="flex flex-col w-[40%] gap-5">
                {Object.keys(placeSpace).map((place, index) => (
                    <div key={index} className="flex justify-between w-full text-lg items-center">
                        <span className="capitalize">{translatedPlaceSpace[`${place}`]}</span>
                        <div className="flex gap-10 items-center justify-between w-48">
                            <button onClick={() => handleDecrement(place)} className="border border-gray-200 py-[10px] rounded-full px-5 flex items-center justify-center hover:border-gray-500 ">-</button>
                            <span>{placeSpace[place]}</span>
                            <button onClick={() => handleIncrement(place)}
                                className="border border-gray-200 py-[10px] rounded-full px-5 flex items-center justify-center hover:border-gray-500 ">+</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default FloorPlan;
