import React, {useEffect, useState} from 'react';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Alert, Card, CardHeader, Typography} from "@mui/material";
import Notification from "./Notification";

const WebSocketClient = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame: any) => {
            console.log('12312313Connected: ' + frame);

            stompClient.subscribe('/topic/orders', (message) => {
                const notification = JSON.parse(message.body);
                setNotifications((prevNotifications): any => [...prevNotifications, notification]);
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <>
        </>
    );
};

export default WebSocketClient;