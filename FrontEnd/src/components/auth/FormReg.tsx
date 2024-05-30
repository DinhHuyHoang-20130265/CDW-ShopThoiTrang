import {useState} from "react";
import axios from 'axios';
import toast from "react-hot-toast";

function useFormSignup(setLoading: any, setRegBody: any) {
    const [statusReg, setStatus]: any = useState(0);
    const handleSubmitSignup = (e: any) => {
        setLoading(true);
        e.preventDefault();
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (e.target.elements["password"].value !== e.target.elements["repassword"].value) {
            toast.error("Mật khẩu không khớp, vui lòng kiểm tra lại!");
            setLoading(false);
            return;
        }
        if (!passwordRegex.test(e.target.elements["password"].value)) {
            toast.error("Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất 1 chữ hoa và 1 số!");
            setLoading(false);
            return;
        }

        const finalFormEndpoint = e.target.action;
        const data = Array.from(e.target.elements)
            .filter((input: any) => input.name)
            .reduce((obj: any, input: any) => Object.assign(obj, {[input.name]: input.value}), {});

        axios.post(finalFormEndpoint, JSON.stringify(data), {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            setStatus(response.data.statusCodeValue);
            setRegBody(data);
            setLoading(false);
            if (response.data.statusCodeValue === 200) {
                toast.success("Một email xác nhận kèm code đã được gửi đến hòm thư của bạn, vui lòng kiểm tra và xác nhận email để hoàn tất đăng ký!")
            } else {
                toast.error(response.data.body === "Email already exists" ?
                    "Email đã tồn tại, vui lòng chọn email khác!" : response.data.body === "Username already exists"
                        ? "Tên đăng nhập đã tồn tại" : "Đã có lỗi xảy ra, vui lòng thử lại!")
            }
            setLoading(false);
        }).catch((error) => {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại!: ", error)
            setLoading(false);
        });
    };

    return {handleSubmitSignup, statusReg};
}

export default useFormSignup;
