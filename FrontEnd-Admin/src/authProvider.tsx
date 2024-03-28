import axios from 'axios';
import {AuthProvider} from 'react-admin';
export const authProvider: AuthProvider = {
    login: async ({username, password}) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login-admin`, {username, password}, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            console.log(response)
            localStorage.setItem('admin', JSON.stringify(response.data));
            window.location.href = '/';
        } else {
            return Promise.reject();
        }
    },
    logout: async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-out`, {}, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        localStorage.removeItem('admin');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('admin') ? Promise.resolve() : Promise.reject(),
    getPermissions: async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-authorities`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject();
        }
    },
    getIdentity: async () => {
        const response: any = await axios.get(`${process.env.REACT_APP_API_URL}/user/info`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return Promise.resolve({
                id: "admin",
                fullName: response.fullName,
                email: response.email,
                phone: response.phone,
                avt: response.avtUrl
            });
        } else {
            return Promise.reject();
        }
    }
}
