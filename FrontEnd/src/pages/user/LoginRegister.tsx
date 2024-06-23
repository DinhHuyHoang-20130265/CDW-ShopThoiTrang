import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import useForm from "../../components/auth/FormLogin";
import {Navigate} from 'react-router-dom';
import {GoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useToasts} from "react-toast-notifications";
import useFormSignup from "../../components/auth/FormReg";
import {ClipLoader} from "react-spinners";
import useFormSendCode from "../../components/auth/FormCode";

const LoginRegister = () => {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [regBody, setRegBody] = useState(null);
    const {addToast} = useToasts();
    const {handleSubmit, status} = useForm(setLoading);

    const {handleSubmitSignup, statusReg} = useFormSignup(setLoading, setRegBody);

    const {handleSubmitCode} = useFormSendCode(setLoading, regBody);
    const loginGoogleHandle = async (credentialResponse: any) => {
        console.log(credentialResponse)
        await axios.post(process.env.REACT_APP_API_ENDPOINT + "auth/google",
            {token: credentialResponse.credential}
            , {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                addToast("Đăng nhập thành công", {appearance: "success", autoDismiss: true});
                window.location.href = '/';
            }
            setLoading(false);
        }).catch((error) => {
            console.error('There was an error!', error);
            addToast("Đăng nhập thất bại: " + error, {appearance: "error", autoDismiss: true});
            setLoading(false);
        });

    }

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
                                                    {(status === 404 || status === 406) ?
                                                        <p className={"text-danger align-text-bottom center"}
                                                           style={{textAlign: "center", fontSize: 20}}>Không
                                                            tìm thấy tên đăng
                                                            nhập</p> : status === 417 ?
                                                            <p className={"text-danger align-text-bottom center"}
                                                               style={{textAlign: "center", fontSize: 20}}>Sai
                                                                mật khẩu</p> : <></>}
                                                    <form onSubmit={handleSubmit}
                                                          action={process.env.REACT_APP_API_ENDPOINT + "auth/login"}
                                                          method="POST">
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            placeholder="Tên đăng nhập" required
                                                            onInvalid={(e) =>
                                                                e.currentTarget.setCustomValidity('Tên đăng nhập không hợp lệ')
                                                            }
                                                            onInput={(e) => e.currentTarget.setCustomValidity('')}

                                                        />
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Mật khẩu"
                                                            required
                                                            onInvalid={(e) =>
                                                                e.currentTarget.setCustomValidity('Mật khẩu không hợp lệ')
                                                            }
                                                            onInput={(e) => e.currentTarget.setCustomValidity('')}
                                                        />
                                                        <div className="button-box">
                                                            <div className="login-toggle-btn">
                                                                <input type="checkbox"/>
                                                                <label className="ml-10">Nhớ tài khoản</label>
                                                                <Link to={"/forgot-password"}>
                                                                    Quên mật khẩu?
                                                                </Link>
                                                            </div>

                                                            <div style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
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
                                                                    <span>Đăng nhập</span>
                                                                </button>
                                                            }
                                                                <p style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "0px"
                                                                }}>Hoặc</p>

                                                                <GoogleLogin
                                                                    onSuccess={loginGoogleHandle}
                                                                    onError={() => {
                                                                        console.error("error");
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="register">
                                            <div className="login-form-container">
                                                <div className="login-register-form">
                                                    {statusReg !== 200 ?
                                                        <form onSubmit={handleSubmitSignup}
                                                              action={process.env.REACT_APP_API_ENDPOINT + "auth/signup"}
                                                              method="POST">
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                placeholder="Tên đăng nhập"
                                                                required
                                                            />
                                                            <input
                                                                type="text"
                                                                name="fullName"
                                                                placeholder="Họ tên"
                                                                required
                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Mật khẩu"
                                                                required
                                                            />
                                                            <input
                                                                type="password"
                                                                name="repassword"
                                                                placeholder="Nhập lại mật khẩu"
                                                                required
                                                            />
                                                            <input
                                                                name="email"
                                                                placeholder="Email"
                                                                type="email"
                                                                required
                                                            />
                                                            <div className="button-box">
                                                                {loading ?
                                                                    <button type="submit" disabled>
                                                                        <ClipLoader color="#36d7b7" size={14}/>
                                                                    </button> : <button type="submit">
                                                                        <span>Đăng ký</span>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </form> : <form onSubmit={handleSubmitCode}
                                                                        action={process.env.REACT_APP_API_ENDPOINT + "auth/validate-email"}
                                                                        method="POST">
                                                            <input
                                                                type="text"
                                                                name="otp"
                                                                placeholder="Nhập mã xác nhận từ email"
                                                                required
                                                            />
                                                            <div className="button-box">
                                                                {loading ?
                                                                    <button type="submit" disabled>
                                                                        <ClipLoader color="#36d7b7" size={14}/>
                                                                    </button> : <button type="submit">
                                                                        <span>Gửi mã xác nhận</span>
                                                                    </button>
                                                                }
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

export default LoginRegister;
