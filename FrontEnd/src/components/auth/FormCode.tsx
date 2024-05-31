import axios from 'axios';
import toast from "react-hot-toast";

function useFormSendCode(setLoading: any, regBody: any) {

    const handleSubmitCode = (e: any) => {
        setLoading(true);
        e.preventDefault();
        const finalFormEndpoint = e.target.action;
        let data: any = Array.from(e.target.elements)
            .filter((input: any) => input.name)
            .reduce((obj: any, input: any) => Object.assign(obj, {[input.name]: input.value}), {});
        data = {...data, ...regBody};
        console.log("data: ", data)
        axios.post(finalFormEndpoint, JSON.stringify(data), {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            setLoading(false);
            if (response.data.statusCodeValue === 200) {
                toast.success("Chúc mừng bạn đã đăng ký thành công, mời bạn đăng nhập")
                window.location.reload();
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

    return {handleSubmitCode};
}

export default useFormSendCode;
