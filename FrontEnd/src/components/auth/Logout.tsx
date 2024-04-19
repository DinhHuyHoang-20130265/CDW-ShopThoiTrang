import axios from 'axios';

export const logout = () => {

    axios.post(process.env.API_ENDPOINT + "auth/sign-out").then(() => {
    }).catch((error) => {
        console.error('There was an error!', error);
    });
};
