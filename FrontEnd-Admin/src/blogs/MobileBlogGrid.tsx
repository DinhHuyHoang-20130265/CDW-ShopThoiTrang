import * as React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, BooleanField, ImageField, DeleteButton, UpdateButton
} from 'react-admin';

import {Blog} from '../types';
import {checkPermission} from "../helpers";

const MobileBlogGrid = ({permissions}: any) => {
    const {data, isLoading} = useListContext<Blog>();

    if (isLoading || data.length === 0) {
        return null;
    }

    return (
        <Box margin="0.5em">
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{margin: '0.5rem 0'}}>
                        <CardHeader
                            title={`${record.title}`}
                            subheader={
                                <Typography>
                                    Ngày đăng: <DateField source="createDate" label={"Ngày tạo"}/>
                                </Typography>
                            }
                            action={<div style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                {permissions && checkPermission(permissions, "BLOG_UPDATE") &&
                                    <EditButton/>}
                                {permissions && checkPermission(permissions, "BLOG_DELETE") &&
                                    <DeleteButton mutationMode={'pessimistic'}/>}
                            </div>}
                        />
                        <CardContent sx={{pt: 0, display: "flex", alignItems: "center", flexDirection: 'row'}}>
                            <ImageField className={"cent"} source="thumbnail" label="Ảnh"/>
                            <div style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <Typography alignItems={'center'} display={'flex'}>
                                    <TextField source="description" label="Mô tả"/>
                                </Typography>
                                <Typography alignItems={'center'} display={'flex'}>
                                    Trạng thái: <BooleanField source="status" label="Trạng thái"/>
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileBlogGrid;
