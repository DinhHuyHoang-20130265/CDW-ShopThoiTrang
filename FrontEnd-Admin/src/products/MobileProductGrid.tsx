import * as React from 'react';
import {Box, Card, CardContent, CardHeader} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, ImageField, FunctionField, ChipField, NumberField
} from 'react-admin';

import {Product} from '../types';

const MobileProductGrid = () => {
    const {data, isLoading} = useListContext<Product>();

    if (isLoading || data.length === 0) {
        return null;
    }

    return (
        <Box margin="0.5em">
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{margin: '0.5rem 0'}}>
                        <CardHeader
                            title={`${record.name}`}
                            subheader={
                                <>
                                    <DateField source="releaseDate" label={"Ngày tạo"}/>
                                </>
                            }
                            action={<EditButton/>}
                        />
                        <CardContent sx={{pt: 0, display: "flex", alignItems: "center"}}>
                            <ImageField sx={{m: "auto"}} className={"cent"} source="imageUrl" label="Ảnh"/>
                            <TextField source="description" label="Mô tả"/>
                            <FunctionField
                                source="categories"
                                sx={{display: "flex", flexDirection: "column"}}
                                label="Danh mục"
                                render={(record: any) => (
                                    record.categories.map((category: any) => (
                                        <ChipField sx={{marginBottom: "2.5px", marginTop: "2.5px"}} record={category}
                                                   source="name"
                                                   key={category.id}/>
                                    ))
                                )}
                            />

                            <NumberField
                                source="price.price"
                                sx={{marginLeft: "5px"}}
                                options={{
                                    style: "currency",
                                    currency: "VND",
                                }}
                                label="Giá"
                            />
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileProductGrid;
