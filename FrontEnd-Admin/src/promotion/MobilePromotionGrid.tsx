import * as React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, ImageField, FunctionField, ChipField, NumberField, DeleteButton
} from 'react-admin';

import {Promotion} from '../types';
import {checkPermission} from "../helpers";

const MobilePromotionGrid = ({permissions}: any) => {
    const {data, isLoading} = useListContext<Promotion>();

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
                                        Ngày kết thúc: <DateField source="endDate" label={"Ngày kết thúc"}/>
                                    </Typography>
                                </div>
                            }
                            action={<div style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                {permissions && checkPermission(permissions, "PROMOTION_UPDATE") &&
                                    <EditButton/>}
                                {permissions && checkPermission(permissions, "PROMOTION_DELETE") &&
                                    <DeleteButton mutationMode={'pessimistic'}/>}
                            </div>}
                        />
                        <CardContent sx={{pt: 0, display: "flex", alignItems: "center", float: "inline-start"}}>
                            <ImageField sx={{m: "auto"}} className={"cent"} source="thumbnail" label="Ảnh"/>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Typography variant="caption" color="textSecondary" component="span">
                                    Giảm: <TextField source="discount" sx={{color: 'red'}}/>%
                                </Typography>
                                <FunctionField
                                    source="products"
                                    sx={{display: "flex", flexDirection: "column"}}
                                    label="Danh mục"
                                    render={(record: any) => (
                                        <Typography variant="caption" color="textSecondary" component="span">
                                            Sản phẩm: {record.products && record.products.length} sản phẩm
                                        </Typography>
                                    )}
                                />
                            </div>

                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobilePromotionGrid;
