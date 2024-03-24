import axios from 'axios';
import {ENDPOINT} from "../../api-endpoint/endpoint";

export const logout = () => {

    axios.post(ENDPOINT + "auth/sign-out").then(() => {
    }).catch((error) => {
        console.error('There was an error!', error);
    });
};
