import axios from 'axios';
import {AuthProvider} from 'react-admin';


const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
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
                // @ts-ignore
                authProvider.logout().then(r => console.log(r));
                window.location.href = '/#/login';
            })

        } else {
            console.log(error)
            return Promise.reject({message: error.response.data.message});
        }
    }
);

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
            return Promise.reject({message: error.response.data.message});
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
    getPermissions: async () => {
        await httpClient.get(`${process.env.REACT_APP_API_URL}/user/get-authorities`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        }).catch(async (error) => {
            if (error.status === 401) {
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
                    // @ts-ignore
                    return authProvider.logout();
                })
            } else {
                console.log(error)
                return Promise.reject({message: error.response.data.message});
            }
        });

    },
    //@ts-ignore
    getIdentity: async () => {
        await httpClient.get(`${process.env.REACT_APP_API_URL}/user/info`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response: any) => {
            console.log(response)
            if (response.status === 200) {
                return Promise.resolve({
                    id: "admin",
                    fullName: response.fullName,
                    email: response.email,
                    phone: response.phone,
                    avt: response.avtUrl
                });
            } else console.log(response.status)
        }).catch(async (error) => {
            if (error.status === 401) {
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
                    // @ts-ignore
                    return authProvider.logout();
                })
            } else {
                console.log(error)
                return Promise.reject({message: error.response.data.message});
            }
        });
    }
}
