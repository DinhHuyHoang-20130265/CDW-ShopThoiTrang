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
    required,
} from 'react-admin';
import {Box, Grid, Typography} from '@mui/material';
import {useState} from "react";

export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.fullName) {
        errors.fullName = 'ra.validation.required';
    }
    if (!values.username) {
        errors.fullName = 'ra.validation.required';
    }
    if (!values.email) {
        errors.email = 'ra.validation.required';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    if (values.password && values.password !== values.confirm_password) {
        errors.confirm_password =
            'passwords do not match';
    }
    return errors;
};

const UserCreate = () => {

    const [admin, setAdmin] = useState(false)

    const handleRoleChange = (e: any) => {
        if (e === 1) {
            setAdmin(false)
        } else
            setAdmin(true)
    }

    return <Create title={"Create User"}>
        <TabbedForm>
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
                                        validate={req}
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                    <TextInput
                                        source="username"
                                        validate={req}
                                        fullWidth
                                        label={"Tên đăng nhập"}
                                    />
                                </Box>
                            </Box>
                            <TextInput
                                type="email"
                                source="userInfo.email"
                                label={"Email"}
                                validate={req}
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

                            <Typography variant="h6" gutterBottom>
                                Mật khẩu
                            </Typography>
                            <Box display={{xs: 'block', sm: 'flex'}}>
                                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                    <PasswordInput
                                        source="password"
                                        fullWidth
                                        validate={req}
                                    />
                                </Box>
                                <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                                    <PasswordInput
                                        source="confirm_password"
                                        fullWidth
                                        validate={req}
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
                                validate={req}
                            />
                            <ReferenceInput label="Tài nguyên" source="role.id" reference="role">
                                <AutocompleteInput label={"Loại tài khoản"} optionText={"name"} optionValue={"id"}
                                                   validate={req} onChange={handleRoleChange}/>
                            </ReferenceInput>
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
                            <AutocompleteInput label={"Tài nguyên"} optionText={"name"} optionValue={"id"}/>
                        </ReferenceInput>
                        <ArrayInput sx={{marginLeft: 10}} source={`permissions`} label={`Quyền`}>
                            <SimpleFormIterator inline>
                                <ReferenceInput label="Quyền" source="id" reference="permission">
                                    <AutocompleteInput label={"Quyền"} optionText={"name"} optionValue={"id"}/>
                                </ReferenceInput>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SimpleFormIterator>
                </ArrayInput> : <></>}
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
}

const req = [required()];
export default UserCreate;
