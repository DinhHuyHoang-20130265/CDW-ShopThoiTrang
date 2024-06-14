import {
    DateInput, DeleteButton,
    Edit, NullableBooleanInput, NumberInput,
    required, SaveButton, TabbedForm,
    TextInput, Toolbar
} from "react-admin";
import {Grid, InputAdornment} from "@mui/material";
import React from "react";


const CouponEdit = () => {

    return (
        <Edit>
            <TabbedForm warnWhenUnsavedChanges toolbar={

                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <SaveButton/>
                    <DeleteButton mutationMode="pessimistic"/>
                </Toolbar>
            }>
                <TabbedForm.Tab
                    label="Thông tin khuyến mãi"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextInput source="name" label="Tên" validate={required()} fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextInput source="couponCode" label="Mã" fullWidth multiline/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <DateInput source="expiredDate" label="Ngày hết hạn" fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <NumberInput source="quantity" label="Số lượt dùng" fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <NumberInput
                                source="price"
                                label="Giảm giá"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">đ</InputAdornment>
                                    ),
                                }}
                                defaultValue={0}
                                validate={required()}
                                fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <NullableBooleanInput source="status" label="Trạng thái" defaultValue={false} fullWidth/>
                        </Grid>

                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    )
};

export default CouponEdit;

