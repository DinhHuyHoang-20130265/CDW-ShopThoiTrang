import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Badge, Box, List, ListItem, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useNavigate} from "react-router-dom";

const Notification = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame : any) => {

            // Subscribe to the topic for new orders
            stompClient.subscribe('/topic/notifications', (message) => {
                const notification = JSON.parse(message.body);
                // Update notifications state with new notification
                setNotifications((prevNotifications): any => [...prevNotifications, notification]);
            });

            // Fetch initial notifications from API
            getNotifications();
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [notifications]);

    const getNotifications = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/notification`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setNotifications(data.content);
                console.log('Fetched notifications:', data.content);
                console.log(Array.isArray(notifications));
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch(`http://localhost:8080/api/notification/read-all`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include'
            });
            notifications.map((notification : any ) => { notification.read = true; });
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const deleteAllNotifications = async () => {
        try {
            await fetch(`http://localhost:8080/api/notification/delete-all`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include'
            });
            setNotifications([]);
        } catch (error) {
            console.error('Error deleting all notifications:', error);
        }
    };

    const handleClick = (event : any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickNotify = (resource : any, id : any, idNotify: any) => {
        handleClose();
        readNotification(idNotify);

        navigate(`/${resource}/${id}`)
    }

    const readNotification = async (id : any) => {
        try {
            await fetch(`http://localhost:8080/api/notification/read/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include'
            });
            notifications.map((notification : any) => {
                if (notification.id === id) {
                    notification.read = true;
                }
            } )
        } catch (error) {
            console.error('Error reading notification:', error);
        }
    }


    const calculateTime = (createdAt : string) => {
        const createdDate : any = new Date(createdAt);
        const currentDate : any = new Date();

        const diffInMilliseconds = currentDate - createdDate;

        const seconds = Math.floor(diffInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return days + " ngày trước";
        } else if (hours > 0) {
            return hours + " giờ trước";
        } else if (minutes > 0) {
            return minutes + " phút trước";
        } else {
            return seconds + " giây trước";
        }
    }

    const countUnread = () => {
        return notifications.filter((notification : any) => notification.read === false).length;
    }

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={countUnread()} color="info">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: '300px',
                        width: '400px',
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxHeight: '300px',
                        overflow: 'auto',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', cursor: 'pointer' }}>
                        <Typography variant="body2" color="primary" onClick={markAllAsRead}>Đánh dấu đã đọc tất cả</Typography>
                        <Typography variant="body2" color="error" onClick={deleteAllNotifications}>Xóa tất cả</Typography>
                    </Box>
                    {notifications.length === 0 ? (
                        <MenuItem onClick={handleClose}>Chưa có thông báo mới</MenuItem>
                    ) : (
                        <List>
                            {notifications.map((notification : any, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleClickNotify(notification.resource, notification.idResource, notification.id)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: notification.read ? 'white' : 'lightgrey',
                                        position: 'relative',
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            notification.resource === 'order' ? `Đơn hàng mới: #${notification.idResource}` : notification.message
                                        }
                                        secondary={calculateTime(notification.createdAt)}
                                    />
                                    {!notification.read && (
                                        <Box
                                            sx={{
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: 'red',
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                top: '50%',
                                                right: '16px',
                                                transform: 'translateY(-50%)',
                                            }}
                                        />
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Menu>
        </>
    );
};

export default Notification;
