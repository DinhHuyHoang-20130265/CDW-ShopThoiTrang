import * as React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, BooleanField,
} from 'react-admin';

import {Contact} from '../types';
import {checkPermission} from "../helpers";
import ReplyIcon from '@mui/icons-material/Reply';

const ContactMobileGrid = ({permissions}: any) => {
    const {data, isLoading} = useListContext<Contact>();

    return (
        <Box margin="0.5em">
            {data && data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{margin: '0.5rem 0'}}>
                        <CardHeader
                            title={`${record.name}`}
                            subheader={
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography variant="caption" color="textSecondary" component="span">
                                        Ngày gửi: <DateField source="repliedDate" label={"Ngày gửi"}/>
                                    </Typography>
                                </div>
                            }
                            action={<div style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                {permissions && checkPermission(permissions, "CONTACT_UPDATE") && !record.status &&
                                    <EditButton label={"Reply"} icon={<ReplyIcon/>}/>}
                            </div>}
                        />
                        <CardContent sx={{pt: 0, display: "flex", alignItems: "center", float: "inline-start"}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Typography variant="caption" color="textSecondary" component="span">
                                    Tên người gửi: <TextField source="name" sx={{color: 'red'}}/>
                                </Typography>
                                <Typography variant="caption" color="textSecondary" component="span">
                                    Email: <TextField source="email" sx={{color: 'blue'}}/>
                                </Typography>
                                <Typography variant="caption" color="textSecondary" component="span">
                                    Trạng thái: <BooleanField source="status"
                                                              sx={{color: !record.status ? 'red' : 'green'}}/>
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default ContactMobileGrid;
