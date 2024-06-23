import React, {Fragment, useEffect, useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import Image from 'react-bootstrap/Image';
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import axios from "axios";
import {useToasts} from "react-toast-notifications";
import {Navigate, useNavigate} from "react-router-dom";
import {IconButton, Rating, TextField, Tooltip} from "@mui/material";
import "../../assets/css/review.css";
import {getBase64, imgProvider} from "../../imgProvider/imgProvider";
import toast from "react-hot-toast";
import {ClipLoader} from "react-spinners";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import SyncIcon from '@mui/icons-material/Sync';

const MyAccount = () => {
    const {addToast} = useToasts();
    const user: any = localStorage.getItem('user');

    const idUser: any = JSON.parse(user) ? JSON.parse(user).id : null;
    const [showOrderDetailModal, setshowOrderDetailModal] = useState(false);
    const [showOrderStatusModal, setshowOrderStatusModal] = useState(false);
    const [showOrderReviewModal, setshowOrderReviewModal] = useState(false);
    const [orderDetail, setOrderDetail]: any = useState(null);
    const [orderStatus, setOrderStatus]: any = useState(null);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [file, setFile]: any = useState(null);
    const [loading, setLoading] = useState(false);

    function handleChange(e: any) {
        setFile(e.target.files[0]);
    }

    const [userProfile, setUserProfile]: any = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserProfile = async () => {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}user/${idUser}`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }).then(response => {
                setUserProfile(response.data);
                setFullName(response.data.userInfo.fullName);
                setPhone(response.data.userInfo.phone);
                setEmail(response.data.userInfo.email);
            })
        }
        if (!user || !idUser)
            navigate('/login-register');
        else {
            fetchUserProfile().then();
        }

    }, [showOrderDetailModal, showOrderStatusModal, showOrderReviewModal]);


    const displaySelectedImage = (event: any) => {
        handleChange(event);
        const selectedImage: any = document.getElementById('selectedAvatar');
        const fileInput = event.target;

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e: any) {
                selectedImage.src = e.target.result;
            };

            reader.readAsDataURL(fileInput.files[0]);
        }
    };

    const updateProfile = async () => {
        if (fullName === '' || phone === '' || email === '') {
            addToast("Vui lòng nhập đầy đủ thông tin", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            return;
        }

        setLoading(true)

        let newImg = '';
        // check info change
        if (fullName === userProfile.userInfo.fullName &&
            phone === userProfile.userInfo.phone &&
            email === userProfile.userInfo.email && file === null
        ) {
            addToast("Không có thông tin nào thay đổi", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            return;
        }
        if (file !== null) {
            await getBase64(file)
                .then(async res => {
                    newImg = await imgProvider(res)
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Lỗi upload ảnh", {duration: 3000})
                    setLoading(false)
                    return;
                })
        }
        axios.put(`${process.env.REACT_APP_API_ENDPOINT}user/update-info`, null, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }, withCredentials: true,
            params: {
                id: userProfile.id,
                name: fullName,
                phone: phone,
                email: email,
                avtUrl: newImg !== '' ? newImg : userProfile.userInfo.avtUrl
            }
        }).then(response => {
            console.log(response)
            addToast("Cập nhật thông tin thành công", {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
        }).catch(error => {
            console.log(error)
            addToast("Cập nhật thông tin thất bại", {appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000});
        });
        setLoading(false)
    }

    const changePassword = () => {
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            addToast("Vui lòng nhập đầy đủ thông tin", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            addToast("Nhập lại mật khẩu không khớp", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            return;
        }
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}user/change-password`, null, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true,
            params: {
                id: userProfile.id,
                oldPassword: oldPassword,
                newPassword: newPassword
            }
        }).then(response => {
                if (response.data === 'Mật khẩu cũ không đúng!') {
                    addToast("Mật khẩu cũ không đúng!", {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000
                    });
                } else {
                    addToast("Đổi mật khẩu thành công!", {
                        appearance: 'success',
                        autoDismiss: true,
                        autoDismissTimeout: 3000
                    });
                }
            }
        )
    }

    const checkReview = (order: any) => {
        for (let i = 0; i < order.orderDetails.length; i++) {
            if (order.orderDetails[i].review == null) {
                return true;
            }
        }
        return false;
    }


    return (
        userProfile &&
        <>
            <Fragment>
                <Breadcrumb/>
                <div className="myaccount-area pb-80 pt-100">
                    <div className="container">
                        <div className="row">
                            <div className="ml-auto m-auto col-lg-9">
                                <div className="myaccount-wrapper">
                                    <Accordion defaultActiveKey={['0']} flush={true}>
                                        <Accordion.Item eventKey="0" className="mb-20 single-my-account">
                                            <Accordion.Header className="panel-heading">1. Thay đổi thông tin tài
                                                khoản</Accordion.Header>
                                            <Accordion.Body>
                                                <div className="myaccount-info-wrapper">
                                                    <div className="account-info-wrapper">
                                                        <h4>Username : {userProfile.username}</h4>
                                                        <h6>Khách hàng</h6>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12 mb-5">
                                                            <div className="d-flex justify-content-center mb-4">
                                                                <img id="selectedAvatar"
                                                                     src={userProfile.userInfo.avtUrl ? userProfile.userInfo.avtUrl : "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"}
                                                                     className="rounded-circle" style={{
                                                                    width: '200px',
                                                                    height: '200px',
                                                                    objectFit: 'cover',
                                                                    border: '1px solid #ccc'
                                                                }} alt="example placeholder"/>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <div className="btn btn-primary btn-rounded">
                                                                    <label className="form-label text-white m-1"
                                                                           htmlFor="customFile2">Chọn ảnh</label>
                                                                    <input type="file"
                                                                           className="form-control d-none"
                                                                           id="customFile2"
                                                                           onChange={displaySelectedImage}/>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="billing-info">
                                                                <label>Họ tên</label>
                                                                <input type="text"
                                                                       value={fullName}
                                                                       onChange={(e) => setFullName(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="billing-info">
                                                                <label>Số điện thoại</label>
                                                                <input type="text"
                                                                       value={phone}
                                                                       onChange={(e) => setPhone(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info">
                                                                <label>Email</label>
                                                                <input type="email"
                                                                       value={email}
                                                                       onChange={(e) => setEmail(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="billing-back-btn">
                                                        <div className="billing-btn">
                                                            {loading ?
                                                                <button disabled
                                                                        className={'d-flex justify-content-center'}>
                                                                    <ClipLoader color="#36d7b7" size={14}/>
                                                                </button> :
                                                                <button type="submit" onClick={updateProfile}>Lưu thay
                                                                    đổi
                                                                </button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1" className="mb-20 single-my-account">
                                            <Accordion.Header className="panel-heading">2. Thay đổi mật
                                                khẩu</Accordion.Header>
                                            <Accordion.Body>
                                                <div className="myaccount-info-wrapper">
                                                    <div className="account-info-wrapper">
                                                        <h4>Đổi mật khẩu</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info">
                                                                <label>Mật khẩu cũ</label>
                                                                <input type="password"
                                                                       onChange={(e) => setOldPassword(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info">
                                                                <label>Mật khẩu mới</label>
                                                                <input type="password"
                                                                       onChange={(e) => setNewPassword(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info">
                                                                <label>Nhập lại mật khẩu mới</label>
                                                                <input type="password"
                                                                       onChange={(e) => setConfirmPassword(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="billing-back-btn">
                                                        <div className="billing-btn">
                                                            <button onClick={changePassword}>Đổi mật khẩu</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className="mb-20">
                                            <Accordion.Header>3. Lịch sử đơn hàng</Accordion.Header>
                                            <Accordion.Body>
                                                <Table striped>
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Mã đơn hàng</th>
                                                        <th>Giá</th>
                                                        <th>Trạng thái</th>
                                                        <th></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {userProfile.orders.sort((a: any, b: any) => a.id - b.id).map((order: any, index: number) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.id}</td>
                                                            <td>{formatPrice(order.totalAmount + order.shippingFee - order.coupon ? order.coupon.price : 0)}</td>
                                                            <td>{formatStatus(order.status)}</td>
                                                            <td>
                                                                <Button variant="primary" onClick={() => {
                                                                    setOrderDetail(order);
                                                                    setOrderStatus(order.orderStatusHistories);
                                                                    setshowOrderDetailModal(true);
                                                                }}>Xem chi tiết</Button>
                                                            </td>
                                                            <td>
                                                                {order.status.id === 5 && checkReview(order) && (
                                                                    <Button variant="outline-warning" onClick={() => {
                                                                        setshowOrderReviewModal(true);
                                                                        setOrderDetail(order);
                                                                    }}
                                                                    > Đánh giá </Button>
                                                                )}
                                                                {order.status.id === 5 && !checkReview(order) && (
                                                                    <Button variant="outline-info" onClick={() => {
                                                                        setshowOrderReviewModal(true);
                                                                        setOrderDetail(order);
                                                                    }
                                                                    }
                                                                    > Xem đánh giá </Button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

            {/* Modal Order Detail */}
            <Modal
                show={showOrderDetailModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setshowOrderDetailModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Đơn hàng #{orderDetail ? orderDetail.id : ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderDetailModal order={orderDetail} setshowOrderDetailModal={setshowOrderDetailModal}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setshowOrderDetailModal(false)
                        setshowOrderStatusModal(true);
                    }}>Chi tiết</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Order Status */}
            <Modal
                show={showOrderStatusModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => {
                    setshowOrderStatusModal(false)
                    setshowOrderDetailModal(true);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Trạng thái đơn hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderStatus && orderStatus.map((status: any, index: number) => (
                        <div key={index}>
                            <p>{formatDate(status.createdDate)} - {formatStatus(status.status)} </p>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>

            {/*Modal Review*/}
            <Modal
                show={showOrderReviewModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setshowOrderReviewModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Đơn hàng #{orderDetail ? orderDetail.id : ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderReviewModal order={orderDetail} addToast={addToast}
                                      setshowOrderReviewModal={setshowOrderReviewModal}/>
                </Modal.Body>
            </Modal>


        </>
    );
};

const formatStatus = (status: any) => {
    let style: {};

    switch (status.name) {
        case 'CHỜ XÁC NHẬN':
            style = {color: 'blue', fontWeight: 'bold'};
            break;
        case 'THÀNH CÔNG':
            style = {color: 'green', fontWeight: 'bold'};
            break;
        case 'ĐANG XỬ LÝ':
            style = {color: 'gray', fontWeight: 'bold'};
            break;
        case 'ĐÃ HỦY':
            style = {color: 'red', fontWeight: 'bold'};
            break;
        default:
            style = {color: 'black', fontWeight: 'bold'};
    }

    return <span style={style}>{status.name}</span>;
}

const formatDate = (date: any) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    const second = String(d.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

const formatPrice = (price: any) => {
    return price.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
}

const OrderDetailModal = ({order, setshowOrderDetailModal}: any) => {
    const {addToast} = useToasts();

    const cancelOrder = async () => {
        await axios.put(`${process.env.REACT_APP_API_ENDPOINT}order/${order.id}/cancel`, null, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then(response => {
            addToast("Hủy đơn hàng thành công", {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            setshowOrderDetailModal(false);

        }).catch(error => {
            addToast("Hủy đơn hàng thất bại", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
        });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Thông tin khách hàng</h4>
                    <Table striped>
                        <tbody>
                        <tr>
                            <th>Ngày tạo</th>
                            <td>{formatDate(order.orderDate)}</td>
                        </tr>

                        <tr>
                            <th>Họ tên</th>
                            <td>{order.name}</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại</th>
                            <td>{order.phone}</td>

                        </tr>
                        <tr>
                            <th>Địa chỉ</th>
                            <td>{order.address}, {order.ward}, {order.district}, {order.province}</td>
                        </tr>
                        <tr>
                            <th>
                                Ghi chú
                            </th>
                            <td>
                                {order.note}
                            </td>
                        </tr>
                        </tbody>
                    </Table>

                    <h4>Chi tiết đơn hàng</h4>
                    <Table striped className={"mt-10"}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>
                        </thead>
                        <tbody className={"mb-20"}>
                        {order.orderDetails.map((orderDetail: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{orderDetail.productId.name} /
                                    ({orderDetail.variation.color} / {orderDetail.size.size})
                                </td>
                                <td>{orderDetail.quantity}</td>
                                <td>{formatPrice(orderDetail.price)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <Table striped>
                        <tbody>
                        <tr>
                            <th colSpan={3}>Tạm tính</th>
                            <td>{formatPrice(order.totalAmount)}</td>
                        </tr>
                        <tr>
                            <th colSpan={3}>Phí vận chuyển</th>
                            <td>{formatPrice(order.shippingFee)}</td>
                        </tr>
                        <tr>
                            <th colSpan={3}>Giảm giá</th>
                            <td style={{color: 'red'}}> - {formatPrice(order.coupon ? order.coupon.price : 0)}</td>
                        </tr>
                        <tr>
                            <th colSpan={3}>Tổng tiền</th>
                            <td>{formatPrice(order.totalAmount + order.shippingFee - (order.coupon ? order.coupon.price : 0))}</td>
                        </tr>
                        </tbody>
                    </Table>

                    <h4 className={"mt-25"}>Thông tin đơn hàng</h4>
                    <Table striped>
                        <tbody>
                        <tr>
                            <th>Phương thức thanh toán</th>
                            {/*3 method : cod, payos, vnpay*/}
                            <td>{order.paymentMethod === "cod"
                                ? "COD"
                                : order.paymentMethod === "payos"
                                    ? "PayOS"
                                    : "VNPay"}</td>
                        </tr>
                        <tr>
                            <th>Trạng thái thanh toán</th>
                            <td>{order.paymentStatus === "yes" ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                        </tr>
                        {(order.paymentMethod === "vnpay" || order.paymentMethod === "payos") && order.paymentStatus === "yes" && (
                            <tr>
                                <th>Mã thanh toán</th>
                                <td>{order.paymentCode}</td>
                            </tr>
                        )}
                        <tr>
                            <th>
                                Mã vận đơn
                            </th>
                            <td>
                                {order.shippingCode}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Mã đơn hàng từ hệ thống
                            </th>
                            <td>
                                {order.generated_order_id}
                            </td>
                        </tr>
                        <tr>
                            <th>Trạng thái</th>
                            <td>{formatStatus(order.status)}</td>
                        </tr>
                        </tbody>
                    </Table>

                    {order.status.id === 1 && order.paymentMethod === "cod" && (
                        <Button variant="danger" className={"mt-25"}
                                onClick={() => cancelOrder()}>Hủy đơn hàng</Button>
                    )}

                </Col>
            </Row>
        </Container>
    );

}

const OrderReviewModal = ({order, addToast, setshowOrderReviewModal}: any) => {
    const user: any = localStorage.getItem('user');

    const idUser: any = JSON.parse(user) ? JSON.parse(user).id : null;
    const [showReviewModal, setshowReviewModal] = useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [orderDetailId, setOrderDetail] = useState(null);
    const [product, setProduct] = useState(null);


    const submitReview = async () => {
        if (rating === 0 || comment === '') {
            addToast("Vui lòng nhập đầy đủ thông tin", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            return;
        }

        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}review`, {
            content: comment,
            rating: rating,
            product: product,
            reviewer: idUser,
            orderDetail: orderDetailId
        }, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then(response => {
            setshowOrderReviewModal(false);
            addToast("Đánh giá thành công", {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
        }).catch(error => {
            console.log(error)
        });
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h4>Đánh giá đơn hàng</h4>
                        <Table striped>
                            <thead>
                            <tr style={{textAlign: "center"}}>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Trạng thái</th>
                            </tr>
                            </thead>
                            <tbody className={"mb-20"}>
                            {order.orderDetails.map((orderDetail: any, index: number) => (
                                <tr key={index} style={{
                                    verticalAlign: "middle"
                                }}>
                                    <td>{index + 1}</td>
                                    <td>{orderDetail.productId.name} /
                                        ({orderDetail.variation.color} / {orderDetail.size.size})
                                    </td>
                                    <td className={"review-center"}>
                                        {orderDetail.review == null && (
                                            <Button variant="outline-warning" onClick={() => {
                                                setshowReviewModal(true);
                                                setOrderDetail(orderDetail.id);
                                                setProduct(orderDetail.productId.id)
                                            }}
                                            > Đánh giá </Button>
                                        )}
                                        {orderDetail.review != null && (
                                            <>
                                                <Rating name="read-only" value={orderDetail.review.rating} readOnly
                                                        style={{textAlign: 'center', marginRight: '10px'}}/>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    defaultValue={orderDetail.review.content}
                                                    variant="outlined"
                                                    disabled
                                                    fullWidth
                                                    style={{marginRight: '10px'}}
                                                />
                                                {orderDetail.review.type === 0 && <Tooltip
                                                    title="Nhận xét của bạn đã bị shop từ chối và sẽ không hiển thị ở đánh giá sản phẩm">
                                                    <IconButton>
                                                        <ThumbDownOffAltIcon color={'error'}/>
                                                    </IconButton>
                                                </Tooltip>}
                                                {orderDetail.review.type === 2 && <Tooltip
                                                    title="Nhận xét của bạn được phê duyệt và sẽ hiển thị công khai ở đánh giá sản phẩm">
                                                    <IconButton>
                                                        <ThumbUpOffAltIcon color={'success'}/>
                                                    </IconButton>
                                                </Tooltip>}
                                                {orderDetail.review.type === 1 && <Tooltip
                                                    title="Nhận xét của bạn đang đợi phê duyệt, sẽ chưa hiển thị ở đánh giá sản phẩm">
                                                    <IconButton>
                                                        <SyncIcon color={'warning'}/>
                                                    </IconButton>
                                                </Tooltip>}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            {/* Modal Review */}
            <Modal
                show={showReviewModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setshowReviewModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Đánh giá sản phẩm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id={"reviewForm"}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Rating
                                name="half-rating"
                                defaultValue={0}
                                onChange={(event, newValue: any) => {
                                    setRating(newValue);
                                }}
                            />
                            <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)}/>

                        </Form.Group>
                        <Button variant="primary" onClick={submitReview}>Gửi đánh giá</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setshowReviewModal(false)}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyAccount;
