import {Link, ReferenceField, TextField, useRecordContext} from "react-admin";
import {ImportInvoice} from "../types";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, {ReactNode} from "react";


const ImportInvoiceShow = () => {
    const record = useRecordContext<ImportInvoice>();
    if (!record) return null;
    let i = 1;
    return (
        <Card sx={{width: 600, margin: 'auto'}}>
            <CardContent>
                <Grid container spacing={2}>
                    {/*<Grid item xs={6}>*/}
                    {/*    <Typography variant="h6" gutterBottom>*/}
                    {/*        Posters Galore*/}
                    {/*    </Typography>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom align="left">
                            Import Bill #{record.id}
                        </Typography>
                    </Grid>
                </Grid>
                {/*<Grid container spacing={2}>*/}
                {/*    <Grid item xs={12} container alignContent="flex-end">*/}
                {/*        <ReferenceField*/}
                {/*            reference="customers"*/}
                {/*            source="customer_id"*/}
                {/*            link={false}*/}
                {/*        >*/}
                {/*            /!*<CustomerField />*!/*/}
                {/*        </ReferenceField>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <Box height={20}>&nbsp;</Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="center">
                            Ngày nhập hàng{' '}
                        </Typography>
                        <Typography gutterBottom align="center">
                            {new Date(record.importDate).toLocaleDateString()}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="center">
                            Người nhập hàng{' '}
                        </Typography>
                        <Typography gutterBottom align="center">
                            {record.importBy.userInfo.fullName}
                        </Typography>
                    </Grid>
                </Grid>
                <Box margin="10px 0">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left' }}>
                                    Sản phẩm
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right' }}>
                                    Số lượng
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right' }}>
                                    Giá Nhập
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {record.importInvoiceDetails.map((item: any) => (
                                <TableRow key={i++}>
                                    <TableCell>
                                        {i}
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'left'}}>
                                        <Link to={`/product/${item.product.id}`}>
                                            {item.product.name} ({item.variation.color}/{item.size.size})
                                        </Link>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{item.quantity}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        {item.importPrice.toLocaleString(
                                            undefined,
                                            {
                                                style: 'currency',
                                                currency: 'VND',
                                            }
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom align="center">
                        Tổng tiền: {record.totalPrice.toLocaleString(
                        undefined,
                        {
                            style: 'currency',
                            currency: 'VND',
                        }
                    )}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ImportInvoiceShow;