import { useAppstore } from "@/store/store";
import { Col, Form, Input, InputNumber, Row } from "antd";
import { DatePicker } from "antd";
import FormInput from "../common/FormInput";
const PlaceDetails = ({ isTour }) => {
  const { locationData, setLocationData } = useAppstore();
  const [form1] = Form.useForm();
  const handleChange = (name, value) => {
    setLocationData({ ...locationData, [name]: value });
  };
  return (
    <div className="text-black flex justify-center items-center h-full flex-col gap-2 w-full">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-4xl">
          {isTour ? "Thông tin TOUR của bạn" : "Thông tin điểm lưu trú của bạn"}
        </h2>
        <p className="text-gray-500">
          Địa điểm của bạn chỉ được chia sẻ với khách hàng sau khi đã tiến hành
          đặt phòng
        </p>
      </div>
      <div className="flex flex-col w-full items-center gap-3 h-full overflow-auto no-scrollbar pb-20 pt-5">
        <div className="flex flex-col gap-2 w-[30%]">
          <Form form={form1} layout="vertical">
            <Row gutter={[16, 16]} className="w-full">
              <Col span={12}>
                <Form.Item
                  initialValue={locationData?.country}
                  label="Quốc gia"
                  name="country"
                >
                  <Input
                    placeholder="Nhập quốc gia"
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  initialValue={locationData?.neighborhood}
                  label="Khu vực"
                  name="neighborhood"
                >
                  <Input
                    placeholder="Nhập khu vực"
                    onChange={(e) => handleChange("neighborhood", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  initialValue={locationData?.place}
                  label="Tên địa điểm"
                  name="place"
                >
                  <Input
                    placeholder="Nhập địa điểm(nếu có)"
                    onChange={(e) => handleChange("place", e.target.value)}
                  />
                </Form.Item>
                {/* //street address */}
                <Form.Item
                  initialValue={locationData?.locality}
                  label="Địa chỉ"
                  name="locality"
                >
                  <Input
                    placeholder="Nhập địa chỉ"
                    onChange={(e) => handleChange("locality", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>

                <Form.Item
                  initialValue={''}
                  label="Địa điểm nổi bật"
                  name="landmark"
                >
                  <Input
                    placeholder="Nhập địa điểm nổi bật(nếu có)"
                    onChange={(e) => handleChange("landmark", e.target.value)}
                  />
                </Form.Item>
                {/* district */}
                <Form.Item
                  initialValue={locationData?.district}
                  label="Quận"
                  name="district"
                >
                  <Input
                    placeholder="Nhập quận/huyện"
                    onChange={(e) => handleChange("district", e.target.value)}
                  />
                </Form.Item>
                {
                  isTour && (
                    <>
                      {/* THOI GIAN TOUR */}
                      <Form.Item
                        initialValue={locationData?.tourTime}
                        label="Thời gian tour diễn ra"
                        name="tourTime"
                        rules={[{
                          required: true, message: "Vui lòng nhập thời gian tour",
                        },
                          // { type: 'number', message: "Vui lòng nhập thời gian tour phải là số" }
                        ]}
                      >
                        <InputNumber
                          className="w-[100%]"
                          placeholder="Tour diễn ra trong bao nhiêu ngày"
                          onChange={(e) => handleChange("tourTime", e.target.value)}
                        />
                      </Form.Item>
                      {/* ngay tour gan nhat */}
                      <Form.Item
                        initialValue={locationData?.nearestTour}
                        label="Ngay tour gan nhat"
                        name="nearestTour"

                      >
                        <DatePicker
                          format="DD/MM/YYYY"
                          placeholder="Nhập ngay tour gan nhat"
                          onChange={(date, dateString) => handleChange("nearestTour", dateString)}
                        />
                      </Form.Item>
                    </>
                  )
                }
              </Col>

            </Row>
          </Form>
          {/* <FormInput
            isListing
            name="Country"
            placeholder="Nhập quốc gia"
            setValue={handleChange}
            type="text"
            value={locationData?.country}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
