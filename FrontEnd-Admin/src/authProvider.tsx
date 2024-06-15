import axios from 'axios';
import {AuthProvider} from 'react-admin';


const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await httpClient.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then((response: any) => {
                console.log(response)
                Promise.resolve();
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 400) {
                    // @ts-ignore
                    authProvider.logout();
                    window.location.href = '/#/login';
                    return Promise.reject({message: "Your session is expired. Please login again."});
                }
            });
        } else {
            console.log(error)
            if (error.response.status === 400) {
                // @ts-ignore
                await authProvider.logout();
                window.location.href = '/#/login';
                return Promise.reject({message: "Your session is expired. Please login again."});
            }
            return Promise.reject({message: "There was an error. Please try again."});
        }
    }
)

export const authProvider: AuthProvider = {

    login: async ({username, password}) => {
        await httpClient.post(`${process.env.REACT_APP_API_URL}/auth/login-admin`, {username, password}, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem('admin', JSON.stringify(response.data));
                window.location.href = '/';
            }
        }).catch((error) => {
            console.log(error)
            return Promise.reject({message: error.response});
        });
    },
    logout: async () => {
        await httpClient.post(`${process.env.REACT_APP_API_URL}/auth/sign-out`, {}, {
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
    getPermissions: async (params: any) => {
        return await httpClient.get(`${process.env.REACT_APP_API_URL}/user/get-authorities`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response: any) => {
            return {permissions: response.data};
        }).catch((error) => {
            console.log(error)
        })
    },
    getIdentity: async () => {
        return await httpClient.get(`${process.env.REACT_APP_API_URL}/user/info`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response: any) => {
            return Promise.resolve({
                id: response.data.user.id,
                fullName: response.data.fullName,
                email: response.data.email,
                phone: response.data.phone,
                avatar: response.data.avtUrl,
                userInfo: {
                    id: response.data.user.id,
                    fullName: response.data.fullName,
                    email: response.data.email,
                    phone: response.data.phone,
                    avtUrl: response.data.avtUrl,
                }
            });
        })
    }
}
