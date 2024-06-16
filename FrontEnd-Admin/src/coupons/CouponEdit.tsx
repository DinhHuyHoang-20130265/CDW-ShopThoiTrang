import {
    DateInput, DeleteButton,
    Edit, NullableBooleanInput, NumberInput,
    required, SaveButton, SelectArrayInputProps, TabbedForm,
    TextInput, Toolbar, useNotify
} from "react-admin";
import {Grid, InputAdornment} from "@mui/material";
import React, {useEffect} from "react";
import {authProvider} from "../authProvider";
import {checkPermission} from "../helpers";


const CouponEdit = (props: SelectArrayInputProps) => {
    const notify = useNotify();
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "COUPON_UPDATE")) {
                window.location.replace("/#/coupon");
                notify("Permission denied", {type: 'error'});
            } else
                setPermissions(response.permissions)
        })
    }, [props]);
    return (
        <Edit>
            <TabbedForm warnWhenUnsavedChanges toolbar={
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <SaveButton/>
                    {permissions && checkPermission(permissions, "COUPON_DELETE") &&
                        <DeleteButton mutationMode="pessimistic"/>}
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
                                        <InputAdornment position="end">đ</InputAdornment>
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

