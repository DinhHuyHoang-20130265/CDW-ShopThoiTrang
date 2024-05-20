import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import Image from 'react-bootstrap/Image';
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import axios from "axios";
import {useToasts} from "react-toast-notifications";


const MyAccount = () => {
    const {addToast} = useToasts();
    const user: any = localStorage.getItem('user');
    const idUser: any = JSON.parse(user) ? JSON.parse(user).id : null;
    const [showOrderDetailModal, setshowOrderDetailModal] = useState(false);
    const [showOrderStatusModal, setshowOrderStatusModal] = useState(false);
    const [orderDetail, setOrderDetail]: any = useState(null);
    const [orderStatus, setOrderStatus]: any = useState(null);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const [userProfile, setUserProfile]: any = useState(null);
    useEffect(() => {
            const fetchUserProfile = async () => {
                await axios.get(`http://localhost:8080/api/user/${idUser}`, {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    setUserProfile(response.data);
                })
            }
            fetchUserProfile().then();
        }
        , []);

    const displaySelectedImage = (event: any) => {
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

    const updateProfile = () => {
        if (fullName === '' || phone === '' || email === '') {
            addToast("Vui lòng nhập đầy đủ thông tin", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            return;
        }

        // check info change
        if (fullName === userProfile.userInfo.fullName &&
            phone === userProfile.userInfo.phone &&
            email === userProfile.userInfo.email) {
            addToast("Không có thông tin nào thay đổi", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
            return;
        }

        const selectedImage: any = document.getElementById('selectedAvatar');
        axios.put(`http://localhost:8080/api/user/update-info`, null, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }, withCredentials: true
            ,
            params: {
                id: userProfile.id,
                name: fullName,
                phone: phone,
                email: email,
            }
        }).then(response => {
            addToast("Cập nhật thông tin thành công", {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 3000
            });
        }).catch(error => {
            addToast("Cập nhật thông tin thất bại", {appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000});
        });
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
        axios.post(`http://localhost:8080/api/user/change-password`, null, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
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
                                                                       value={userProfile.userInfo.fullName}
                                                                       onChange={(e) => setFullName(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="billing-info">
                                                                <label>Số điện thoại</label>
                                                                <input type="text"
                                                                       value={userProfile.userInfo.phone}
                                                                       onChange={(e) => setPhone(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info">
                                                                <label>Email</label>
                                                                <input type="email"
                                                                       value={userProfile.userInfo.email}
                                                                       onChange={(e) => setEmail(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="billing-back-btn">
                                                        <div className="billing-btn">
                                                            <button type="submit" onClick={updateProfile}>Lưu thay đổi
                                                            </button>
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
                                                    {userProfile.orders.map((order: any, index: number) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.id}</td>
                                                            <td>{formatPrice(order.totalAmount + order.shippingFee)}</td>
                                                            <td>{formatStatus(order.status)}</td>
                                                            <td>
                                                                <Button variant="primary" onClick={() => {
                                                                    setOrderDetail(order);
                                                                    setOrderStatus(order.orderStatusHistories);
                                                                    setshowOrderDetailModal(true);
                                                                }}>Xem chi tiết</Button>
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
                    <OrderDetailModal order={orderDetail}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setshowOrderDetailModal(false)
                        setshowOrderStatusModal(true);
                    }}>Chi tiết</Button>
                </Modal.Footer>
            </Modal>

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

        </>
    );
};

const OrderDetailModal = ({order}: any) => {
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
                            <th colSpan={3}>Tổng tiền</th>
                            <td>{formatPrice(order.totalAmount + order.shippingFee)}</td>
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
                        {order.paymentMethod === "vnpay" || order.paymentMethod === "payos" && order.paymentStatus === "yes" && (
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
                            <th>Trạng thái</th>
                            <td>{formatStatus(order.status)}</td>
                        </tr>
                        </tbody>
                    </Table>

                    {order.status.id === 1 && (
                        <Button variant="danger" className={"mt-25"}>Hủy đơn hàng</Button>
                    )}

                </Col>
            </Row>
        </Container>
    );

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

function formatStatus(status: any) {
    let style = {};

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

export default MyAccount;
