import axios from 'axios';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function useFormSendCodeConfirm(setLoading: any, regBody: any) {
    const navigate = useNavigate();
    const handleSendCodeForgot = (e: any) => {
        setLoading(true);
        e.preventDefault();
        const finalFormEndpoint = e.target.action;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (e.target.elements["newPassword"].value !== e.target.elements["repassword"].value) {
            toast.error("Mật khẩu không khớp, vui lòng kiểm tra lại!");
            setLoading(false);
            return;
        }
        if (!passwordRegex.test(e.target.elements["newPassword"].value)) {
            toast.error("Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất 1 chữ hoa và 1 số!");
            setLoading(false);
            return;
        }
        let data: any = Array.from(e.target.elements)
            .filter((input: any) => input.name)
            .reduce((obj: any, input: any) => Object.assign(obj, {[input.name]: input.value}), {});
        data = {...data, ...regBody};
        axios.post(finalFormEndpoint, JSON.stringify(data), {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            setLoading(false);
            if (response.data.statusCodeValue === 200) {
                toast.success("Chúc mừng bạn đã đổi mật khẩu mới, mời bạn đăng nhập")
                navigate("/login-register")
            } else {
                toast.error(response.data.body === "OTP has expired." ?
                    "OTP đã hết hạn" : response.data.body === "Invalid OTP."
                        ? "OTP Không đúng." : "Đã có lỗi xảy ra, vui lòng thử lại!")
            }
            setLoading(false);
        }).catch((error) => {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại!: ", error)
            setLoading(false);
        });
    };

    return {handleSendCodeForgot};
}

export default useFormSendCodeConfirm;
