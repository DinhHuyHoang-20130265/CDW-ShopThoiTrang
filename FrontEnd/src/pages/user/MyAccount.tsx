import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import Image from 'react-bootstrap/Image';
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Col, Container, Row, Table} from "react-bootstrap";

const MyAccount = () => {

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
                                                    <h4>Username : abcd</h4>
                                                    <h6>Khách hàng</h6>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 mb-5">
                                                        <div className="d-flex justify-content-center mb-4">
                                                            <img id="selectedAvatar"
                                                                 src={"https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"}
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
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="billing-info">
                                                            <label>Số điện thoại</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12">
                                                        <div className="billing-info">
                                                            <label>Email</label>
                                                            <input type="email"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12">
                                                        <div className="billing-info">
                                                            <label>Địa chỉ</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
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
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                    <td>@mdo</td>
                                                </tr>
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
    );
};

MyAccount.propTypes = {
    location: PropTypes.object
};

export default MyAccount;
