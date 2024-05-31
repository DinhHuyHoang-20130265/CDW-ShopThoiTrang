import React, {Fragment, useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Navigate} from 'react-router-dom';
import {ClipLoader} from "react-spinners";
import useFormSendCodeForgot from "../../components/auth/FormCodeForgot";
import useFormSendCodeConfirm from "../../components/auth/FormCodeForgotConfirm";

const ForgotPassword = () => {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [regBody, setRegBody] = useState(null);
    const {handleForgot} = useFormSendCodeForgot(setLoading, setRegBody);
    const {handleSendCodeForgot} = useFormSendCodeConfirm(setLoading, regBody);
    useEffect(() => {
        const checkUser = () => {
            if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== "") {
                setUser(true);
            }
        };
        checkUser();
    }, []);

    if (user) return (<Navigate to="/"/>)

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="login-register-area pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-12 ml-auto m-auto">
                            <div className="login-register-wrapper">
                                <Tab.Container defaultActiveKey="forgot">
                                    <Nav variant="pills" className="login-register-tab-list">
                                        <Nav.Item>
                                            <Nav.Link eventKey="forgot">
                                                <h4>Quên mật khẩu</h4>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="forgot">
                                            <div className="login-form-container">
                                                <div className="login-register-form">
                                                    {regBody !== null ? <form onSubmit={handleSendCodeForgot}
                                                                              action={process.env.REACT_APP_API_ENDPOINT + "auth/forgot-password-confirmation"}
                                                                              method="POST">
                                                            <input
                                                                type="password"
                                                                name="newPassword"
                                                                placeholder="Nhập mật khẩu mới"
                                                                required
                                                                onInvalid={(e) =>
                                                                    e.currentTarget.setCustomValidity('Mật khẩu không được để trống')
                                                                }
                                                                onInput={(e) => e.currentTarget.setCustomValidity('')}
                                                            />
                                                            <input
                                                                type="password"
                                                                name="repassword"
                                                                placeholder="Nhập lại mật khẩu mới"
                                                                required
                                                                onInvalid={(e) =>
                                                                    e.currentTarget.setCustomValidity('Mật khẩu không được để trống')
                                                                }
                                                                onInput={(e) => e.currentTarget.setCustomValidity('')}
                                                            />
                                                            <input
                                                                type="text"
                                                                name="otp"
                                                                placeholder="Nhập mã xác minh"
                                                                required
                                                                onInvalid={(e) =>
                                                                    e.currentTarget.setCustomValidity('Mã xác minh không được để trống')
                                                                }
                                                                onInput={(e) => e.currentTarget.setCustomValidity('')}
                                                            />
                                                            <div className="button-box">
                                                                <div style={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    flexDirection: "row",

                                                                }}>{loading ?
                                                                    <button type="submit" disabled>
                                                                        <ClipLoader color="#36d7b7" size={14}/>
                                                                    </button> : <button type="submit"
                                                                                        style={{
                                                                                            float: "left",
                                                                                            height: "50px"
                                                                                        }}>
                                                                        <span>Đổi mật khẩu</span>
                                                                    </button>
                                                                }
                                                                </div>
                                                            </div>
                                                        </form> :
                                                        <form onSubmit={handleForgot}
                                                              action={process.env.REACT_APP_API_ENDPOINT + "auth/forgot-password"}
                                                              method="POST">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                placeholder="Nhập email"
                                                                required
                                                                onInvalid={(e) =>
                                                                    e.currentTarget.setCustomValidity('Email')
                                                                }
                                                                onInput={(e) => e.currentTarget.setCustomValidity('')}
                                                            />
                                                            <div className="button-box">
                                                                <div style={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    flexDirection: "row",

                                                                }}>{loading ?
                                                                    <button type="submit" disabled>
                                                                        <ClipLoader color="#36d7b7" size={14}/>
                                                                    </button> : <button type="submit"
                                                                                        style={{
                                                                                            float: "left",
                                                                                            height: "50px"
                                                                                        }}>
                                                                        <span>Gửi mã xác nhận cho email</span>
                                                                    </button>
                                                                }
                                                                </div>
                                                            </div>
                                                        </form>}
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
}

export default ForgotPassword;
