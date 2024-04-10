import * as React from 'react';
import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    email,
} from 'react-admin';
import {Box, Typography} from '@mui/material';

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

const UserCreate = () => (
    <Create>
        <SimpleForm
            sx={{maxWidth: 500}}
            defaultValues={{
                fullName: "",
                username: "",
                email: "",
                status: false,
                phone: "",
                address: false,
                authorities: [],
            }}
            validate={validateForm}
        >
            <SectionTitle label="resources.customers.fieldGroups.identity"/>
            <Box display={{xs: 'block', sm: 'flex', width: '100%'}}>
                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                    <TextInput source="first_name" isRequired fullWidth/>
                </Box>
                <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                    <TextInput source="last_name" isRequired fullWidth/>
                </Box>
            </Box>
            <TextInput type="email" source="email" isRequired fullWidth/>
            <DateInput source="birthday"/>
            <Separator/>
            <SectionTitle label="resources.customers.fieldGroups.address"/>
            <TextInput
                source="address"
                multiline
                fullWidth
                helperText={false}
            />
            <Box display={{xs: 'block', sm: 'flex'}}>
                <Box flex={2} mr={{xs: 0, sm: '0.5em'}}>
                    <TextInput source="city" fullWidth helperText={false}/>
                </Box>
                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                    <TextInput
                        source="stateAbbr"
                        fullWidth
                        helperText={false}
                    />
                </Box>
                <Box flex={2}>
                    <TextInput source="zipcode" fullWidth helperText={false}/>
                </Box>
            </Box>
            <Separator/>
            <SectionTitle label="resources.customers.fieldGroups.password"/>
            <Box display={{xs: 'block', sm: 'flex'}}>
                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                    <PasswordInput source="password" fullWidth/>
                </Box>
                <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                    <PasswordInput source="confirm_password" fullWidth/>
                </Box>
            </Box>
        </SimpleForm>
    </Create>
);

const SectionTitle = ({label}: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label as string)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em"/>;

export default UserCreate;
