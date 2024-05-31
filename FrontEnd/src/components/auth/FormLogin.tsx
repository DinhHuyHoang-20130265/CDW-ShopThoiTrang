import {useState} from "react";
import axios from 'axios';

function useForm(setLoading: any) {
    const [status, setStatus]: any = useState(0);
    const handleSubmit = (e: any) => {
        setLoading(true);
        e.preventDefault();

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
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.href = '/';
            }
            setStatus(response.status);
            setLoading(false);
        }).catch((error) => {
            setStatus(error.response.status);
            setLoading(false);
        });
    };

    return {handleSubmit, status};
}

export default useForm;
