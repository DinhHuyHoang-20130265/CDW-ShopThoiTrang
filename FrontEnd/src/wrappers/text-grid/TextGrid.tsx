import React from "react";
import TextGridItem from "../../components/text-grid/TextGridItem";

const TextGrid = ({spaceBottomClass}: any) => {

    const textGridData = [
            {
                "id": "1",
                "title": "Tầm nhìn",
                "text": "Trở thành thương hiệu thời trang local hàng đầu, mang đến phong cách và chất lượng vượt trội cho khách hàng trong và ngoài nước."
            },
            {
                "id": "2",
                "title": "Chiến lược",
                "text": "Đa dạng hóa sản phẩm để đáp ứng nhu cầu thị trường. " +
                    "Mở rộng hệ thống cửa hàng trên toàn quốc." +
                    "Tạo dựng lòng tin và sự hài lòng của khách hàng."
            },
            {
                "id": "3",
                "title": "Nhiệm vụ",
                "text": "Sản xuất và cung cấp các sản phẩm thời trang chất lượng cao, thân thiện với môi trường. " +
                    "Xây dựng dịch vụ khách hàng chuyên nghiệp và chu đáo. " +
                    "Khuyến khích và phát triển tài năng thiết kế trẻ trong nước."
            }
        ]
    ;

    return (
        <div
            className={`about-mission-area ${
                spaceBottomClass ? spaceBottomClass : ""
            }`}
        >
            <div className="container">
                <div className="row">
                    {textGridData &&
                        textGridData.map((single, key) => {
                            return (
                                <TextGridItem
                                    data={single}
                                    spaceBottomClass="mb-30"
                                    key={key}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};


export default TextGrid;
