import React, {
    createContext,
    useState,
    useCallback,
    useMemo,
    useContext, useEffect
} from "react";
import {
    TextInput,
    ImageInput,
    ImageField,
    useDataProvider,
    useNotify,
    SaveContextProvider,
    useGetIdentity,
    email,
    BooleanInput,
    PasswordInput,
    Toolbar,
    SaveButton,
    TabbedForm,
    NullableBooleanInput,
    ArrayInput, SimpleFormIterator, ReferenceInput, AutocompleteInput
} from "react-admin";
import {checkPassword} from "../users/UserCreate";
import {Box, Grid, Typography} from "@mui/material";

import {useWatch} from "react-hook-form";

type ProfileContextType = {
    profileVersion: number;
    refreshProfile: () => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
export const ReturnedImg = () => {
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
export const ProfileProvider = ({children}: any) => {
    const [profileVersion, setProfileVersion] = useState(0);
    const context: ProfileContextType = useMemo(
        () => ({
            profileVersion,
            refreshProfile: () =>
                setProfileVersion((currentVersion) => currentVersion + 1)
        }),
        [profileVersion]
    );

    return (
        <ProfileContext.Provider value={context}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

export const ProfileEdit = ({staticContext, ...props}: any) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const [saving, setSaving] = useState(false);
    const {refreshProfile} = useProfile();
    const [password, setPassword] = useState(false);
    const handlePassword = useCallback((event: any) => {
        setPassword(event.target.checked)
    }, []);
    const validateForm = (values: Record<any, any>): Record<any, any> => {
        const errors = {} as any;
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
        return errors;
    }
    const {data, isLoading}: any = useGetIdentity();
    const [profile, setProfile]: any = useState(null)
    useEffect(() => {
        if (data) {
            dataProvider.getOne("user", {id: data.id}).then((response: any) => {
                setProfile(response.data)
            })
        }
    }, [data, dataProvider, isLoading]);

    const handleSave = useCallback(
        (values: any) => {
            setSaving(true);
            console.log(values)
            dataProvider.update("user", {previousData: profile, id: profile.id, data: values})
                .then(() => {
                    setSaving(false);
                    notify("Thay đổi thông tin cá nhân thành công");
                    refreshProfile();
                }).catch((error: any) => {
                console.log(error)
                setSaving(false);
                notify("Thay đổi thông tin cá nhân thất bại");
            });
        }, [dataProvider, profile, notify, refreshProfile]);

    const saveContext = useMemo(
        () => ({
            save: handleSave,
            saving
        }),
        [saving, handleSave]);

    if (isLoading || !profile) {
        return null;
    }

    return (
        <SaveContextProvider value={saveContext}>
            <TabbedForm validate={validateForm}
                        record={profile}
                        onSubmit={handleSave}
                        toolbar={<Toolbar>
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
                                            readOnly={true}
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
                                    source="enabled" readOnly={true}
                                />
                                <ReferenceInput label="Role" source="role.id" reference="role">
                                    <AutocompleteInput label={"Loại tài khoản"} optionText={"name"} optionValue={"id"}
                                                       readOnly={true}/>
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
                    label={"Phân quyền"}
                    path={"role"}
                    sx={{maxWidth: '80em'}}
                >
                    {profile.role.name === "ADMIN" &&
                        <ArrayInput source={`resourceVariations`} label={`Phân Quyền`} fullWidth
                                    readOnly={true}>
                            <SimpleFormIterator inline>
                                <ReferenceInput label="Tài nguyên" source="resource.id" reference="resource"
                                                readOnly>
                                    <AutocompleteInput label={"Tài nguyên"} optionText={"name"}
                                                       optionValue={"id"}
                                                       isRequired={true} readOnly={true}/>
                                </ReferenceInput>
                                <ArrayInput sx={{marginLeft: 10}} source={`permissions`} label={`Quyền`}>
                                    <SimpleFormIterator inline>
                                        <ReferenceInput label="Quyền" source="id" reference="permission"
                                                        readOnly>
                                            <AutocompleteInput label={"Quyền"} optionText={"name"}
                                                               optionValue={"id"}
                                                               isRequired={true} readOnly={true}/>
                                        </ReferenceInput>
                                    </SimpleFormIterator>
                                </ArrayInput>
                            </SimpleFormIterator>
                        </ArrayInput>}
                </TabbedForm.Tab>
            </TabbedForm>
        </SaveContextProvider>
    );
};
