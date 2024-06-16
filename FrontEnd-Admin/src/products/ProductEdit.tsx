import {
    ImageField,
    Edit,
    TabbedForm,
    TextInput,
    useRecordContext,
    required,
    ImageInput,
    SimpleFormIterator, ArrayInput, NumberField, NullableBooleanInput, useNotify, SaveButton, TopToolbar, DeleteButton,
} from "react-admin";
import React, {useEffect} from "react";
import {Product} from "../types";
import {ProductEditDetails} from "./ProductEditDetails";
import {Grid, Typography} from "@mui/material";
import {useWatch} from "react-hook-form";
import {ColorInput} from "react-admin-color-picker";
import {authProvider} from "../authProvider";
import {checkPermission} from "../helpers";

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>{record.name}</span> : null;
};

const ReturnedImgList = () => {
    const isReturned = useWatch({name: 'imgProducts'});
    return isReturned ?
        <>
            <ImageField source="imgProducts" src="url" label="imgProducts"/>
            <ImageInput source="imgProducts_new" accept="image/*" multiple={true}
                        placeholder={<p>Add new List Img</p>} label={"Thêm danh sách ảnh phụ mới"}>
                <ImageField source="src" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput name={"imgProducts"} source={"imgProducts"} multiple>
            <ImageField source="src" label="Danh sách ảnh phụ"/>
        </ImageInput>;
};
const ReturnedImg = () => {
    const isReturned = useWatch({name: 'imageUrl'});
    return isReturned ?
        <>
            <ImageField source="imageUrl" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="imageUrl_new" accept="image/*"
                        placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh Thumnail mới"}>
                <ImageField source="src" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput name={"imageUrl"} source={"imageUrl"}>
            <ImageField source="src" label="Ảnh chính"/>
        </ImageInput>;
};

export const ProductEdit = (props: any) => {
    const notify = useNotify();
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "PRODUCT_UPDATE")) {
                window.location.replace("/#/product");
                notify("Permission denied", {type: 'error'});
            } else
                setPermissions(response.permissions)
        })
    }, [props]);

    return (
        <Edit title={<ProductTitle/>} hasShow={false}>
            <TabbedForm toolbar={<TopToolbar sx={{justifyContent: 'space-between'}}>
                <SaveButton/>
                {permissions && checkPermission(permissions, "PRODUCT_DELETE") &&
                    <DeleteButton mutationMode={'pessimistic'}/>}
            </TopToolbar>}>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Ảnh chính
                            </Typography>
                            <ReturnedImg/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Danh sách ảnh phụ
                            </Typography>
                            <ReturnedImgList/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Chi tiết"
                    path="details"
                    sx={{maxWidth: '40em'}}
                >
                    <ProductEditDetails/>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân loại"
                    path="description"
                    sx={{maxWidth: '100%'}}
                >
                    <ArrayInput source={`variations`} label={`Biến thể`} fullWidth>
                        <SimpleFormIterator inline>
                            <NumberField source={"id"} label={"ID"} sx={{
                                width: 80, alignItems: "center",
                                display: "flex",
                                marginTop: "8px",
                                border: "solid 1px",
                                borderRadius: "10px",
                                padding: "8px",
                                textAlign: "center"
                            }}/>
                            <TextInput source="color" label="Màu sắc"/>
                            <ColorInput source="colorCode" label="Mã màu" isRequired={true}/>
                            <ArrayInput sx={{marginLeft: 10}} source={`sizes`} label={`Sizes`}>
                                <SimpleFormIterator inline>
                                    <NumberField source={"id"} label={"ID"} sx={{
                                        width: 80, alignItems: "center",
                                        display: "flex",
                                        marginTop: "8px",
                                        border: "solid 1px",
                                        borderRadius: "10px",
                                        padding: "8px",
                                        textAlign: "center"
                                    }}/>
                                    <TextInput source="size" label="Kích cỡ"/>
                                    <NumberField source="stock" label="Số lượng" sx={{
                                        width: 80, alignItems: "center",
                                        display: "flex",
                                        marginTop: "8px",
                                        border: "solid 1px",
                                        borderRadius: "10px",
                                        padding: "8px",
                                        textAlign: "center"
                                    }}/>
                                    <NullableBooleanInput source="status" label="Trạng thái"/>
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Edit>
    )
};


const req = [required()];
