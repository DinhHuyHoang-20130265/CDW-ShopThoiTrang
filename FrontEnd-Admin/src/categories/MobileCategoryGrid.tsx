import * as React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, SelectField, BooleanField
} from 'react-admin';

import {Category} from '../types';

const MobileCategoryGrid = () => {
    const {data, isLoading} = useListContext<Category>();

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
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Ngày tạo: <DateField source="releaseDate" label={"Ngày tạo"}/>
                                    </Typography>
                                </>
                            }
                            action={<EditButton/>}
                        />
                        <CardContent sx={{pt: 0}}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Trạng thái: <BooleanField source="status" label="Trạng thái"/>
                            </Typography>
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileCategoryGrid;
