import axios from 'axios';

export const logout = async () => {

    await axios.post(process.env.REACT_APP_API_ENDPOINT + "auth/sign-out", {}, {
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }).then((
        response: any
    ) => {
        console.log(response.data);
    }).catch((error) => {
        console.error('There was an error!', error);
    });
};
