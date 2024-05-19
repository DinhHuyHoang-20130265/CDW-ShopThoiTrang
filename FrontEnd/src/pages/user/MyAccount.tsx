import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import Image from 'react-bootstrap/Image';
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import axios from "axios";
import {TextField} from "@mui/material";

const MyAccount = () => {
    const user: any = localStorage.getItem('user');
    const idUser: any = JSON.parse(user) ? JSON.parse(user).id : null;
    const [showOrderDetailModal, setshowOrderDetailModal] = useState(false);
    const [showOrderStatusModal, setshowOrderStatusModal] = useState(false);
    const [orderDetail, setOrderDetail]: any = useState(null);
    const [orderStatus, setOrderStatus]: any = useState(null);


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

    console.log(userProfile);

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
                                                                    objectFit: 'cover'
                                                                }} alt="example placeholder"/>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <div className="btn btn-primary btn-rounded">
                                                                    <label className="form-label text-white m-1"
                                                                           htmlFor="customFile2">Chọn ảnh</label>
                                                                    <input type="file" className="form-control d-none"
                                                                           id="customFile2"
                                                                           onChange={displaySelectedImage}/>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="billing-info">
                                                                <label>Họ tên</label>
                                                                <input type="text"
                                                                       value={userProfile.userInfo.fullName}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="billing-info">
                                                                <label>Số điện thoại</label>
                                                                <input type="text" value={userProfile.userInfo.phone}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info">
                                                                <label>Email</label>
                                                                <input type="email" value={userProfile.userInfo.email}/>
                                                            </div>
                                                        </div>
                                                        {/*<div className="col-lg-12 col-md-12">*/}
                                                        {/*    <div className="billing-info">*/}
                                                        {/*        <label>Địa chỉ</label>*/}
                                                        {/*        <input type="text"/>*/}
                                                        {/*    </div>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                    <div className="billing-back-btn">
                                                        <div className="billing-btn">
                                                            <button type="submit">Lưu thay đổi</button>
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
                                                                <label>Mật khẩu</label>
                                                                <input type="password"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info">
                                                                <label>Nhập lại mật khẩu</label>
                                                                <input type="password"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="billing-back-btn">
                                                        <div className="billing-btn">
                                                            <button type="submit">Đổi mật khẩu</button>
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
                                                            <td>{order.totalAmount + order.shippingFee}</td>
                                                            <td>{order.status.name}</td>
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
                    <Button onClick={() => setshowOrderDetailModal(false)}>Đóng</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showOrderStatusModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Trạng thái đơn hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderStatus && orderStatus.map((status: any, index: number) => (
                        <div key={index}>
                            <p>{status.createdDate} - {status.status.name} </p>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setshowOrderStatusModal(false)
                        setshowOrderDetailModal(true);
                    }}>Đóng</Button>
                </Modal.Footer>
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
                            <td>{order.orderDate}</td>
                        </tr>
                        <tr>
                            <th>Trạng thái</th>
                            <td>{order.status.name}</td>
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
                        <tbody>
                        {order.orderDetails.map((orderDetail: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{orderDetail.productId.name} /
                                    ({orderDetail.variation.color} / {orderDetail.size.size})
                                </td>
                                <td>{orderDetail.quantity}</td>
                                <td>{orderDetail.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <h4 className={"mt-25"}>Thông tin đơn hàng</h4>
                    <Table striped>
                        <tbody>
                        <tr>
                            <th>Tạm tính</th>
                            <td>{order.totalAmount}</td>
                        </tr>
                        <tr>
                            <th>Phí vận chuyển</th>
                            <td>{order.shippingFee}</td>
                        </tr>
                        <tr>
                            <th>Tổng tiền</th>
                            <td>{order.totalAmount + order.shippingFee}</td>
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

MyAccount.propTypes = {
    location: PropTypes.object
};

export default MyAccount;
