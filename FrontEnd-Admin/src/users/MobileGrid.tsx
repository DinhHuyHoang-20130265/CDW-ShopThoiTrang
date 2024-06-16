import * as React from 'react';
import {Box, Card, CardContent, CardHeader} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, DeleteButton, UpdateButton
} from 'react-admin';

import AvatarField from './AvatarField';
import {Customer} from '../types';
import RestoreIcon from "@mui/icons-material/Restore";
import {checkPermission} from "../helpers";

const MobileGrid = ({permissions}: any) => {
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
                            action={<div style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                {permissions && checkPermission(permissions, "USER_UPDATE") &&
                                    <EditButton/>}
                                {permissions && checkPermission(permissions, "USER_DELETE") && !record.deleted &&
                                    <DeleteButton mutationMode={'pessimistic'}/>}
                                {permissions && checkPermission(permissions, "USER_UPDATE") && record.deleted &&
                                    <UpdateButton resource={'user/deleted'} label="Restore"
                                                  data={{deleted: false}}
                                                  sx={{
                                                      color: 'green',
                                                      borderColor: 'green',
                                                  }}>
                                        <RestoreIcon/>
                                    </UpdateButton>}
                            </div>}
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
