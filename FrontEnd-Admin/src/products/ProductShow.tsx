import * as React from 'react';
import {
    ArrayField,
    BooleanField, ChipField, Datagrid,
    DateField, EditButton, FunctionField, ImageField, Labeled, NumberField, RichTextField,
    Show, TextField, TopToolbar
} from 'react-admin';
import {Grid, Stack} from "@mui/material";
import {ColorField} from "react-admin-color-picker";
import {authProvider} from "../authProvider";
import {useEffect} from "react";
import {checkPermission} from "../helpers";


const ProductShow = () => {
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            setPermissions(response.permissions)
        })
    }, []);

    const getPromotionPrice = (product: any) => {
        const currentDate = new Date();
        const activePromotion = product.promotions.find((promotion: any) => {
            const startDate = new Date(promotion.startDate);
            const endDate = new Date(promotion.endDate);
            return (currentDate >= startDate && currentDate <= endDate && promotion.status) ? promotion : null;
        });

        if (activePromotion !== null && activePromotion !== undefined) {
            const discountedPrice = product.price.price - (product.price.price * activePromotion.discount) / 100;
            return (<div>
                <span style={{
                    textDecorationLine: "line-through",
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>{formatPrice(product.price.price)}</span>
                <br/>
                <span style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>{formatPrice(discountedPrice)} <span
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'red'
                    }}>({activePromotion.discount}%)</span> </span>
            </div>);
        }
        return (
            <span style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>{formatPrice(product.price.price)}</span>
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
    }
    return (
        <>
            <Show actions={permissions && checkPermission(permissions, "PRODUCT_UPDATE") &&
                <TopToolbar>
                    <EditButton/>
                </TopToolbar>}>
                <Grid container margin={0} spacing={2} padding={4} sx={{width: "100%"}}>
                    <Grid item xs={4} sm={"auto"} alignContent={"center"} justifyContent={"center"}
                          sx={theme => ({
                              [theme.breakpoints.down('sm')]: {
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: "column"
                              },
                              padding: 2
                          })}>
                        <Grid item xs={12} sm={12} sx={theme => ({
                            [theme.breakpoints.down('sm')]: {
                                'img.RaImageField-image': {
                                    width: "100% !important"
                                }
                            }

                        })}>
                            <ImageField
                                source="imageUrl"
                                textAlign={"center"}
                                label={"Thumbnail"}
                                sx={{
                                    '& img': {width: "60% !important", height: "60% !important"},
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={"auto"} sx={theme => ({
                            [theme.breakpoints.down('sm')]: {
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: "column",
                                '.RaImageField-image': {
                                    width: '50px !important',
                                    height: "50px !important"
                                },
                                '.RaImageField-list': {
                                    margin: "5px",
                                    padding: "5px !important",
                                    'li:not(:last-child)': {
                                        marginRight: "10px"
                                    }
                                }
                            },
                            overflowX: "scroll"
                        })}>
                            <ImageField source="imgProducts" src="url"
                                        sx={{
                                            display: 'flex', justifyContent: 'center',
                                            '& .RaImageField-list': {
                                                padding: "30px",
                                                '.RaImageField-image': {
                                                    width: "100%"
                                                }
                                            },
                                            '& li': {
                                                display: 'flex', justifyContent: 'center',
                                                alignItems: "center"
                                            }
                                        }}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} sm={"auto"}>
                        <Stack spacing={2} sx={{height: "100%"}} justifyContent={"center"}>
                            <Labeled label="Mã sản phẩm">
                                <TextField source="id" sx={{fontSize: 'larger'}}/>
                            </Labeled>
                            <TextField source="name" sx={{fontSize: 28, fontWeight: 'bold'}}/>
                            <RichTextField source="description"/>
                            <FunctionField
                                label="Giá"
                                render={(record: any) => (
                                    getPromotionPrice(record)
                                )}
                            />
                            <FunctionField
                                source="categories"
                                label="Danh mục"
                                render={(record: any) => (
                                    record.categories.map((category: any) => (
                                        <ChipField sx={{margin: "2px"}} record={category} source="name"
                                                   key={category.id}/>
                                    ))
                                )}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}
                          sx={{
                              backgroundColor: "lightgrey",
                              borderRadius: 1,
                              margin: "auto",
                              padding: 2,
                              marginTop: 1
                          }}>
                        <RichTextField source="content" sx={{margin: 'auto'}}/>
                    </Grid>

                    <Grid item xs={12}>
                        <ArrayField source="variations">
                            <Datagrid bulkActionButtons={false}>
                                <NumberField source="id" label={'Mã sản phẩm'} textAlign={"center"}/>
                                <TextField source="color" label={'Màu'} textAlign={"center"}/>
                                <ColorField source="colorCode" label={'Mã Màu'}/>
                                <ArrayField source="sizes" label={'Các kích thước'} textAlign={'center'}>
                                    <Datagrid bulkActionButtons={false}>
                                        <NumberField source="id" label={'Mã size'} textAlign={"center"}/>
                                        <TextField source="size" label='Size' textAlign={"center"}/>
                                        <NumberField source="stock" label='Tồn kho' textAlign={"center"}/>
                                        <BooleanField source="status" label={'Trạng thái'} textAlign={"center"}/>
                                    </Datagrid>
                                </ArrayField>
                            </Datagrid>
                        </ArrayField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Labeled label="Ngày tạo">
                            <DateField source="releaseDate"/>
                        </Labeled>
                    </Grid>
                </Grid>
            </Show>
        </>
    );
};


export default ProductShow;
