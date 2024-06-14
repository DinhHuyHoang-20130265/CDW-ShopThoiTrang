const VoucherItemHome = (props: any) => {

    return (
        <div className="img-coupon col-md-6 col-lg-6 col-8 col-xl-3">
            <div className="coupon_item">
                <div className="tron_container">
                    <p className="tron"></p>
                    <p className="tron"></p>
                    <p className="tron"></p>
                    <p className="tron"></p>
                    <p className="tron"></p>
                    <p className="tron"></p>
                </div>
                <div className="tron_container1">
                    <p className="tron1"></p>
                    <p className="tron1"></p>
                    <p className="tron1"></p>
                    <p className="tron1"></p>
                    <p className="tron1"></p>
                    <p className="tron1"></p>
                </div>
                <div className="coupon_body">
                    <div className="coupon_head">
                        <h3 className="coupon_title">VOUCHER</h3>
                        <div className="coupon_desc">{props.item.name}</div>
                    </div>
                </div>
                <div className="coupon_price">
                    <h1>{props.item.coupon_price}</h1>
                    <p>VND</p>
                </div>
                <div className="coupon_copy_paste">
                    <span className="code">Nhập mã: {props.item.coupon_code}</span>
                    <button className="btn btn-main btn-sm coupon_copy" data-code={`${props.item.coupon_code}`}>Sao
                        chép
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VoucherItemHome;
