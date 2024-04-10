import * as React from 'react';
import {
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    SimpleForm,
    useTranslate,
} from 'react-admin';
import {Grid, Box, Typography} from '@mui/material';

import FullNameField from './FullNameField';
import RolesInput from './RolesInput';
import {validateForm} from './UserCreate';

const UserEdit = () => {
    const translate = useTranslate();
    return (
        <Edit title={<UserTitle/>}>
            <SimpleForm validate={validateForm}>
                <div>
                    <Grid container width={{xs: '100%', xl: 800}} spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                Thông tin cá nhân
                            </Typography>
                            <Box display={{xs: 'block', sm: 'flex'}}>
                                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                    <TextInput
                                        source="userInfo.fullName"
                                        label={"Họ và tên"}
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                    <TextInput
                                        source="username"
                                        isRequired
                                        fullWidth
                                        label={"Tên đăng nhập"}
                                    />
                                </Box>
                            </Box>
                            <TextInput
                                type="email"
                                source="userInfo.email"
                                label={"Email"}
                                isRequired
                                fullWidth
                            />
                            <TextInput
                                type="text"
                                source="userInfo.phone"
                                label={"SĐT"}
                                isRequired
                                fullWidth
                            />
                            <Box mt="1em"/>

                            <Typography variant="h6" gutterBottom>
                                Địa chỉ
                            </Typography>
                            <TextInput
                                source="address"
                                multiline
                                fullWidth
                                helperText={false}
                            />
                            <Box display={{xs: 'block', sm: 'flex'}}>
                                <Box flex={2} mr={{xs: 0, sm: '0.5em'}}>
                                    <TextInput
                                        source="province"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                    <TextInput
                                        source="district"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                                <Box flex={2}>
                                    <TextInput
                                        source="ward"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                            </Box>

                            <Box mt="1em"/>

                            <Typography variant="h6" gutterBottom>
                                Đổi mật khẩu
                            </Typography>
                            <Box display={{xs: 'block', sm: 'flex'}}>
                                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                    <PasswordInput
                                        source="password"
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                                    <PasswordInput
                                        source="confirm_password"
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Khác
                            </Typography>

                            <RolesInput fullWidth/>
                            <NullableBooleanInput
                                fullWidth
                                source="enabled"
                            />
                        </Grid>
                    </Grid>
                </div>
            </SimpleForm>
        </Edit>
    );
};

const UserTitle = () => <FullNameField size="32" sx={{margin: '5px 0'}}/>;

export default UserEdit;
