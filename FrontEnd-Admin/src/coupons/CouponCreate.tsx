import {
    Create,
    DateInput,
    NullableBooleanInput, NumberInput,
    required, TabbedForm,
    TextInput, useNotify
} from "react-admin";
import {Grid, InputAdornment} from "@mui/material";
import React, {useEffect} from "react";
import {authProvider} from "../authProvider";
import {checkPermission} from "../helpers";


const CouponCreate = (props: any) => {
    const notify = useNotify();
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "COUPON_CREATE")) {
                window.location.replace("/#/coupon");
                notify("Permission denied", {type: 'error'});
            }
        })
    }, [props]);
    return (
        <Create>
            <TabbedForm warnWhenUnsavedChanges>
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
        </Create>
    )
};

export default CouponCreate;

