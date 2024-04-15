import * as React from 'react';
import {Box, Card, CardContent, CardHeader} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField
} from 'react-admin';

import AvatarField from './AvatarField';
import {Customer} from '../types';

const MobileGrid = () => {
    const {data, isLoading} = useListContext<Customer>();

    if (isLoading || data.length === 0) {
        return null;
    }

    return (
        <Box margin="0.5em">
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{margin: '0.5rem 0'}}>
                        <CardHeader
                            title={`${record.userInfo.fullName}`}
                            subheader={
                                <>
                                    <DateField source="createdDate" label={"Ngày tạo"}/>
                                </>
                            }
                            avatar={<AvatarField size="45"/>}
                            action={<EditButton/>}
                        />
                        <CardContent sx={{pt: 0}}>
                            <TextField source="username" label="Tên đăng nhập"/>
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileGrid;
