import {
    ImageField,
    TabbedForm,
    TextInput,
    useRecordContext,
    required,
    SimpleFormIterator,
    ArrayInput,
    NumberInput,
    BooleanInput,
    Create,
    SelectArrayInput,
    useGetList,
    ImageInput,
    Toolbar, SaveButton, useNotify,
} from "react-admin";
import React, {useEffect, useState} from "react";
import {Category, Product} from "../types";
import {Grid, InputAdornment, Typography} from "@mui/material";
import {ColorInput} from "react-admin-color-picker";
import {authProvider} from "../authProvider";
import {checkPermission} from "../helpers";


const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>{record.name}</span> : null;
};
export const ProductCreate = (props: any) => {
    const notify = useNotify();
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "PRODUCT_CREATE")) {
                window.location.replace("/#/product");
                notify("Permission denied", {type: 'error'});
            }
        })
    }, [])
    const [categories, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);
    return (
        <Create title={<ProductTitle/>}>
            <TabbedForm toolbar={<Toolbar>
                <SaveButton
                    label="Create"
                    alwaysEnable
                />
            </Toolbar>}>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Ảnh chính
                            </Typography>
                            <ImageInput name={"imageUrl"} source={"imageUrl"}>
                                <ImageField source="src" label="Ảnh chính"/>
                            </ImageInput>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Danh sách ảnh phụ
                            </Typography>
                            <ImageInput name={"imgProducts"} source={"imgProducts"} multiple>
                                <ImageField source="src" label="Danh sách ảnh phụ"/>
                            </ImageInput>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Chi tiết"
                    path="details"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextInput source="name" fullWidth validate={req}/>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextInput source="description" validate={req} multiline fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <BooleanInput source={"status"} label={"Trạng thái"} defaultValue={false}/>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <NumberInput
                                source="price.price"
                                label={"Giá"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">đ</InputAdornment>
                                    ),
                                }}
                                validate={req}
                                fullWidth
                                step={1000}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>

                            <SelectArrayInput label="Danh mục" source={"categories"}
                                              optionValue={"id"}
                                              choices={categories} fullWidth validate={req}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <RichTextInput source="content" label="Mô tả" validate={req}/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân loại"
                    path="description"
                    sx={{maxWidth: '100%'}}
                >
                    <ArrayInput source={`variations`} label={`Biến thể`} fullWidth>
                        <SimpleFormIterator>
                            <TextInput source="color" label="Màu sắc"/>
                            <ColorInput source="colorCode" label="Mã màu" isRequired={true}/>
                            <ArrayInput sx={{marginLeft: 10}} source={`sizes`} label={`Sizes`}>
                                <SimpleFormIterator inline>
                                    <TextInput source="size" label="Kích cỡ"/>
                                    <NumberInput sx={{width: "20%"}} source="stock" label="Số lượng" disabled
                                                 defaultValue={0}
                                    />
                                    <BooleanInput source="status" label="Trạng thái" defaultValue={true}/>
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    )
};

const req = [required()];
