import * as React from 'react';
import {
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    TabbedForm, SimpleFormIterator, ArrayInput, AutocompleteInput, ReferenceInput, SelectInput,
} from 'react-admin';
import {Grid, Box, Typography} from '@mui/material';

import FullNameField from './FullNameField';
import {validateForm} from './UserCreate';

const UserEdit = () => {

    return (
        <Edit title={<UserTitle/>} hasShow={false}>
            <TabbedForm validate={validateForm}>
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
                                <NullableBooleanInput
                                    label={"Đang hoạt động"}
                                    fullWidth
                                    source="enabled"
                                />
                                <ReferenceInput label="Tài nguyên" source="role.id" reference="role">
                                    <AutocompleteInput label={"Loại tài khoản"} optionText={"name"} optionValue={"id"}/>
                                </ReferenceInput>
                            </Grid>
                        </Grid>
                    </div>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân quyền"
                    sx={{maxWidth: '40em'}}
                >
                    <ArrayInput source={`resourceVariations`} label={`Phân Quyền`} fullWidth>
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
                    </ArrayInput>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
};

const UserTitle = () => <FullNameField size="32" sx={{margin: '5px 0'}}/>;

export default UserEdit;
