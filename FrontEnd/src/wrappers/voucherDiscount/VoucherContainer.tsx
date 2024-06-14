import React from "react";
import VoucherItemHome from "./VoucherItemHome";
import axios from "axios";

const VoucherContainer = ({spaceTopClass, spaceBottomClass}: any) => {
    const [voucherList, setVoucherList] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}coupon?perPage=-1&filter=${encodeURI('{"status":1,"expired":0}')}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    withCredentials: true,
                }).then((response) => {
                    setVoucherList(response.data.content);
                }
            ).catch((error) => {
                console.log(error);
            })
        }
        fetchData();
    }, []);
    return (
        <div
            className={` ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
            <div className="container container-1265">
                <div className="row scroll coupon_bill" style={{
                    justifyContent: "center"
                }}>
                    {voucherList && voucherList.map((item: any) => {
                        return (
                            <VoucherItemHome
                                item={item}
                                key={item.id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default VoucherContainer;
