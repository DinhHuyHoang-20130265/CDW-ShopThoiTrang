import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const LoginRegister = ({ location } : any) => {

    return (
        <Fragment>
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto m-auto">
                                <div className="login-register-wrapper">
                                    <Tab.Container defaultActiveKey="login">
                                        <Nav variant="pills" className="login-register-tab-list">
                                            <Nav.Item>
                                                <Nav.Link eventKey="login">
                                                    <h4>Đăng nhập</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="register">
                                                    <h4>Đăng ký</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="login">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form>
                                                            <input
                                                                type="text"
                                                                name="user-name"
                                                                placeholder="Tên đăng nhập"
                                                            />
                                                            <input
                                                                type="password"
                                                                name="user-password"
                                                                placeholder="Mật khẩu"
                                                            />
                                                            <div className="button-box">
                                                                <div className="login-toggle-btn">
                                                                    <input type="checkbox" />
                                                                    <label className="ml-10">Nhớ tài khoản</label>
                                                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                                                        Quên mật khẩu?
                                                                    </Link>
                                                                </div>
                                                                <button type="submit">
                                                                    <span>Đăng nhập</span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="register">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form>
                                                            <input
                                                                type="text"
                                                                name="user-name"
                                                                placeholder="Tên đăng nhập"
                                                            />
                                                            <input
                                                                type="password"
                                                                name="user-password"
                                                                placeholder="Mật khẩu"
                                                            />
                                                            <input
                                                                name="user-email"
                                                                placeholder="Email"
                                                                type="email"
                                                            />
                                                            <div className="button-box">
                                                                <button type="submit">
                                                                    <span>Đăng ký</span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    );
};

LoginRegister.propTypes = {
    location: PropTypes.object
};

export default LoginRegister;
