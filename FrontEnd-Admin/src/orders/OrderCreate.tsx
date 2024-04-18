import {Create, SaveButton, TabbedForm, TextInput, Toolbar} from "react-admin";
import {Grid, Typography} from "@mui/material";
import React from "react";

const OrderCreate = () => {

    return (
        <Create>
            <TabbedForm toolbar={<Toolbar>
                <SaveButton
                    label="Create"
                    alwaysEnable
                />
            </Toolbar>}>
                <TabbedForm.Tab
                    label="Thông tin khách hàng"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Thông tin chung
                            </Typography>
                            <TextInput source="name" fullWidth/>
                            <TextInput source="phone" fullWidth/>
                            <TextInput source="address" fullWidth/>
                            <TextInput source="note" fullWidth/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Sản phẩm"
                    path="details"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextInput source="product" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextInput source="quantity" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextInput source="price" fullWidth/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>

        </Create>
    )
}

export default OrderCreate;