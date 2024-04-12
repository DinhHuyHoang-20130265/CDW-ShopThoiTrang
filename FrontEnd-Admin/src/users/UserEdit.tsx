import * as React from 'react';
import {
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    TabbedForm,
    SimpleFormIterator,
    ArrayInput,
    AutocompleteInput,
    ReferenceInput,
    BooleanInput,
    email,
    Toolbar,
    SaveButton, ImageInput, ImageField, useRecordContext,
} from 'react-admin';
import {Grid, Box, Typography} from '@mui/material';

import FullNameField from './FullNameField';
import {useCallback, useState} from "react";
import {checkPassword} from "./UserCreate";
import {useWatch} from 'react-hook-form';

const ReturnedImg = () => {
    const isReturned = useWatch({name: 'userInfo.avtUrl'});
    return isReturned ?
        <>
            <ImageField source="userInfo.avtUrl" title="title" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="userInfo.avt" accept="image/*"
                        placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh đại diện mới"}>
                <ImageField source="src" title="title" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput source="userInfo.avt" accept="image/*"
                          placeholder={<p>Drop your img file here</p>}>
            <ImageField source="src" title="title" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
        </ImageInput>;
};

const UserEdit = () => {
    const [admin, setAdmin] = useState(false)
    const [password, setPassword] = useState(false)
    const handlePassword = useCallback((event: any) => {
        setPassword(event.target.checked)
    }, []);
    const handleRoleChange = (e: any) => {
        if (e === 1 || e === null || e === undefined) {
            setAdmin(false)
        } else
            setAdmin(true)
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
        if (password) {
            if (values.password && values.confirm_password && values.password !== values.confirm_password) {
                errors.password = 'password and confirm_password do not match';
                errors.confirm_password =
                    'password and confirm_password do not match';
            }
            if (!checkPassword(values.password) || !checkPassword(values.confirm_password)) {
                errors.password = 'password must be at least 8 characters, including uppercase, lowercase, and number';
                errors.confirm_password = 'password must be at least 8 characters, including uppercase, lowercase, and number';
            }
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

    return (
        <Edit title={<UserTitle/>} hasShow={false}>
            <TabbedForm validate={validateForm} toolbar={<Toolbar>
                <SaveButton
                    label="Save"
                    alwaysEnable
                />
            </Toolbar>}>
                <TabbedForm.Tab
                    label="Thông tin"
                    sx={{maxWidth: '80em'}}
                >
                    <div>
                        <Grid container width={{xs: '100%', xl: 1200}} spacing={2}>
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
                                <BooleanInput source="status" label="Đổi mật khẩu" defaultValue={false}
                                              onChange={handlePassword}/>

                                {password ? <Box display={{xs: 'block', sm: 'flex'}}>
                                    <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                        <PasswordInput
                                            source="password"
                                            fullWidth
                                            label={"Mật khẩu"}
                                        />
                                    </Box>
                                    <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                                        <PasswordInput
                                            source="confirm_password"
                                            fullWidth
                                            label={"Nhập lại mật khẩu"}
                                        />
                                    </Box>
                                </Box> : <></>}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" gutterBottom>
                                    Khác
                                </Typography>
                                <NullableBooleanInput
                                    label={"Đang hoạt động"}
                                    fullWidth
                                    source="enabled"
                                />
                                <ReferenceInput label="Tài nguyên" source="role.id" reference="role">
                                    <AutocompleteInput label={"Loại tài khoản"} optionText={"name"} optionValue={"id"}
                                                       onChange={handleRoleChange}/>
                                </ReferenceInput>
                                <Typography variant="h6" gutterBottom>
                                    Ảnh đại diện
                                </Typography>
                                <ReturnedImg/>
                            </Grid>
                        </Grid>
                    </div>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân quyền"
                    path="role"
                    sx={{maxWidth: '40em'}}
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
        </Edit>
    );
};

const UserTitle = () => <FullNameField size="32" sx={{margin: '5px 0'}}/>;

export default UserEdit;
