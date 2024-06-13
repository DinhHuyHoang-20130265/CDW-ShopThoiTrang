import * as React from 'react';
import {AppBar, Logout, TitlePortal, UserMenu, useTheme, useUserMenu} from 'react-admin';
import Box from '@mui/material/Box';
import {MenuItem, ListItemIcon, ListItemText} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate} from "react-router-dom";

const SettingsMenuItem = React.forwardRef((props: any, ref: any) => {
    const {onClose} = useUserMenu();
    const navigate = useNavigate();
    return (
        <MenuItem
            onClick={() => {
                navigate('/profile');
                onClose();
            }}
            ref={ref}
            {...props}
        >
            <ListItemIcon>
                <SettingsIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText>Sửa thông tin cá nhân</ListItemText>
        </MenuItem>
    );
});

export const MyAppBar = () => {
    return (
        <AppBar id={'MyAppBar'} color="primary"
                userMenu={
                    <UserMenu>
                        <SettingsMenuItem/>
                        <Logout title={"Đăng xuất"}/>
                    </UserMenu>
                }
                sx={theme => ({
                    '.MuiToolbar-root': {
                        [theme.breakpoints.down("md")]: {
                            minHeight: '48px !important',
                        }
                    }
                })}
        >
            <TitlePortal/>
            <Box flex="1"/>
            <Box flex="1"/>
        </AppBar>)
};
