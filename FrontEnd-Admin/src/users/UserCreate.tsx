import * as React from 'react';
import {
    Create,
    TextInput,
    PasswordInput,
    email,
    TabbedForm,
    NullableBooleanInput,
    ReferenceInput,
    AutocompleteInput,
    ArrayInput,
    SimpleFormIterator,
    Toolbar, SaveButton, ImageInput, ImageField, useNotify,
} from 'react-admin';
import {Box, Grid, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {authProvider} from "../authProvider";
import {checkPermission} from "../helpers";


export const checkPassword = (password: string) => {
    // Regex pattern kiểm tra password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return passwordPattern.test(password);
}

const validateForm = (values: Record<any, any>): Record<any, any> => {
    const errors = {} as any;
    if (!values.username) {
        errors.username = 'username is required';
    }
    if (!values.userInfo.fullName) {
        errors.userInfo = {...errors.userInfo, fullName: 'fullName is required'}
    }
    if (!values.userInfo.email) {
        errors.userInfo = {...errors.userInfo, email: 'email is required'};
    } else {
        const error: any = email()(values.userInfo.email);
        if (error) {
            errors.userInfo = {email: error.message};
        }
    }
    if (values.password && values.confirm_password && values.password !== values.confirm_password) {
        errors.password = 'password and confirm_password do not match';
        errors.confirm_password =
            'password and confirm_password do not match';
    }
    if (!checkPassword(values.password) || !checkPassword(values.confirm_password)) {
        errors.password = 'password must be at least 8 characters, including uppercase, lowercase, and number';
        errors.confirm_password = 'password must be at least 8 characters, including uppercase, lowercase, and number';
    }
    if (!values.role.id) {
        errors.role = {id: 'required a role'};
    }
    if (values.role && values.role.id !== 1) {
        if (values.resourceVariations === null || values.resourceVariations === undefined || values.resourceVariations.length === 0) {
            errors.resourceVariations = 'required at least one resource and one permission for that resource';
        } else {
            let resourceIds = new Set();
            values.resourceVariations.forEach((item: any) => {
                let permissionIds = new Set();
                if (item.resource.id === undefined || item.resource.id === null || resourceIds.has(item.resource.id)) {
                    errors.resourceVariations = 'resources cannot be duplicated or empty';
                } else
                    resourceIds.add(item.resource.id)
                item.permissions.forEach((itemPer: any) => {
                    if (itemPer.id === undefined || itemPer.id === null || permissionIds.has(itemPer.id)) {
                        errors.resourceVariations = 'permissions cannot be duplicated or empty';
                    } else
                        permissionIds.add(itemPer.id)
                });
            })
        }
    }
    return errors;
}

const UserCreate = () => {
    const notify = useNotify();
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "USER_CREATE")) {
                window.location.replace("/#/user");
                notify("Permission denied", {type: 'error'});
            }
        })
    }, [])

    const [admin, setAdmin] = useState(true)

    const handleRoleChange = (e: any) => {
        if (e === 1) {
            setAdmin(false)
        } else
            setAdmin(true)
    }

    return <Create title={"Create User"}>
        <TabbedForm validate={validateForm} defaultValues={{
            address: undefined,
            confirm_password: undefined,
            district: undefined,
            enabled: true,
            password: undefined,
            province: undefined,
            resourceVariations: [],
            role: {
                id: undefined
            },
            userInfo: {
                fullName: undefined,
                email: undefined,
                phone: undefined
            },
            username: undefined,
            ward: undefined
        }} toolbar={<Toolbar>
            <SaveButton
                label="Tạo"
                alwaysEnable
            />
        </Toolbar>}>
            <TabbedForm.Tab
                label="Thông tin"
                sx={{maxWidth: '40em'}}
            >
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
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                    <TextInput
                                        source="username"
                                        fullWidth
                                        label={"Tên đăng nhập"}
                                    />
                                </Box>
                            </Box>
                            <TextInput
                                type="email"
                                source="userInfo.email"
                                label={"Email"}
                                fullWidth
                            />
                            <TextInput
                                type="text"
                                source="userInfo.phone"
                                label={"SĐT"}
                                fullWidth
                            />
                            <Box mt="1em"/>

                            <Typography variant="h6" gutterBottom>
                                Mật khẩu
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
                            <NullableBooleanInput
                                label={"Đang hoạt động"}
                                fullWidth
                                source="enabled"
                                defaultValue={true}
                            />
                            <ReferenceInput label="Tài nguyên" source="role.id" reference="role">
                                <AutocompleteInput label={"Loại tài khoản"} optionText={"name"} optionValue={"id"}
                                                   onChange={handleRoleChange}/>
                            </ReferenceInput>
                            <Typography variant="h6" gutterBottom>
                                Ảnh đại diện
                            </Typography>
                            <ImageInput source="userInfo.avt" accept="image/*"
                                        placeholder={<p>Drop your img file here</p>}>
                                <ImageField source="src" title="title" sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                    maxHeight: "100px"
                                }}/>
                            </ImageInput>
                        </Grid>
                    </Grid>
                </div>
            </TabbedForm.Tab>
            <TabbedForm.Tab
                label="Phân quyền"
                sx={{maxWidth: '40em'}}
                path="role"
            >
                {admin ? <ArrayInput source={`resourceVariations`} label={`Phân Quyền`} fullWidth>
                    <SimpleFormIterator inline>
                        <ReferenceInput label="Tài nguyên" source="resource.id" reference="resource">
                            <AutocompleteInput label={"Tài nguyên"} optionText={"name"} optionValue={"id"}
                                               isRequired={true}/>
                        </ReferenceInput>
                        <ArrayInput sx={{marginLeft: 10}} source={`permissions`} label={`Quyền`}>
                            <SimpleFormIterator inline>
                                <ReferenceInput label="Quyền" source="id" reference="permission">
                                    <AutocompleteInput label={"Quyền"} optionText={"name"} optionValue={"id"}
                                                       isRequired={true}/>
                                </ReferenceInput>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SimpleFormIterator>
                </ArrayInput> : <></>}
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
}

export default UserCreate;
