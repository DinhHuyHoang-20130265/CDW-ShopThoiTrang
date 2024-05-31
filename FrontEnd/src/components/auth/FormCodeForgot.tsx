import axios from 'axios';
import toast from "react-hot-toast";

function useFormSendCodeForgot(setLoading: any, setRegBody: any) {

    const handleForgot = (e: any) => {
        setLoading(true);
        e.preventDefault();
        const finalFormEndpoint = e.target.action;
        let data: any = Array.from(e.target.elements)
            .filter((input: any) => input.name)
            .reduce((obj: any, input: any) => Object.assign(obj, {[input.name]: input.value}), {});
        axios.post(finalFormEndpoint, JSON.stringify(data), {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            setLoading(false);
            if (response.data.statusCodeValue === 200) {
                toast.success("Mã xác nhận đã được gửi đến email của bạn!")
                setRegBody(data)
            } else {
                toast.error(response.data.body === "Email doesn't Exits" ?
                    "Không tìm thấy Email." : "Đã có lỗi xảy ra, vui lòng thử lại!")
            }
            setLoading(false);
        }).catch((error) => {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại!: ", error)
            setLoading(false);
        });
    };

    return {handleForgot};
}

export default useFormSendCodeForgot;
