import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    FunctionField,
    EditButton,
    ChipField,
    SearchInput,
    DateInput,
    SelectColumnsButton,
    DatagridConfigurable,
    useRecordContext,
    WrapperField,
    ArrayField,
    Button, FilterLiveSearch, SavedQueriesList, FilterList, FilterListItem, useGetList, DeleteButton, UpdateButton,
} from 'react-admin';

import {
    List,
    NumberField,
    ImageField,
    TextField,
} from "react-admin";
import {Dialog, DialogActions, DialogContent, DialogTitle, Theme, useMediaQuery} from "@mui/material";
import Aside from "./Aside";
import MobileProductGrid from "./MobileProductGrid";
import {styled} from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import LockIcon from "@mui/icons-material/Lock";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import CategoryIcon from "@mui/icons-material/CategoryRounded";
import {Category} from "../types";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import {checkPermission} from "../helpers";
import {authProvider} from "../authProvider";
import {useEffect} from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({theme}: any) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function CustomDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {data} = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} id={'filter'} label={"Filter"}>
                <FilterListIcon/>
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Filter"}
                </DialogTitle>
                <DialogContent sx={{overflowY: "scroll"}}>
                    <FilterLiveSearch label={"Tìm..."} name={"search"}/>

                    <SavedQueriesList/>

                    <FilterList
                        label="Trạng thái"
                        icon={<LockIcon/>}
                    >
                        <FilterListItem
                            label="Đã ẩn"
                            value={{
                                status: false,
                            }}
                        />
                        <FilterListItem
                            label="Hiển thị"
                            value={{
                                status: true,
                            }}
                        />

                    </FilterList>
                    <FilterList
                        label="Đã bị xoá"
                        icon={<DeleteIcon/>}
                    >
                        <FilterListItem
                            label="Đã xoá"
                            value={{deleted: true}}
                        />
                        <FilterListItem
                            label="Chưa xoá"
                            value={{deleted: false}}
                        />

                    </FilterList>
                    <FilterList
                        label="Giá"
                        icon={<AttachMoneyRoundedIcon/>}
                    >
                        <FilterListItem
                            label="0 - 99.000"
                            value={{
                                price_lt: 100000,
                                price_gt: undefined,
                            }}
                        />
                        <FilterListItem
                            label="100.000 - 299.000"
                            value={{
                                price_lt: 300000,
                                price_gt: 100000,
                            }}
                        />
                        <FilterListItem
                            label="300.000 trở lên"
                            value={{
                                price_lt: undefined,
                                price_gt: 300000,
                            }}
                        />

                    </FilterList>

                    <FilterList
                        label="Danh mục"
                        icon={<CategoryIcon/>}
                    >
                        {data &&
                            data.map((record: any) => (
                                <FilterListItem
                                    label={record.name}
                                    key={record.id}
                                    value={{categoryId: record.id}} // Truyền record làm giá trị của value
                                />
                            ))}
                    </FilterList>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} label={'Xác nhận'}>
                        <DoneOutlineIcon/>
                    </Button>
                    <Button onClick={handleClose} autoFocus label={'Huỷ'}>
                        <CancelIcon/>
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const ProductListActions = (props: any) => (
    <TopToolbar>
        {props.permissions && checkPermission(props.permissions, "PRODUCT_CREATE") && <CreateButton/>}
        {props.isSmall && <CustomDialog/>}
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

const ProductList = () => {
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            setPermissions(response.permissions)
        })
    }, []);
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );

    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

    const getPromotionPrice = (product: any) => {
        const currentDate = new Date();
        const activePromotion = product.promotions.find((promotion: any) => {
            const startDate = new Date(promotion.startDate);
            const endDate = new Date(promotion.endDate);
            return (currentDate >= startDate && currentDate <= endDate && promotion.status);
        });


        if (activePromotion) {
            const discountedPrice = product.price.price - (product.price.price * activePromotion.discount) / 100;
            return (<div>
                <span style={{textDecorationLine: "line-through"}}>{formatPrice(product.price.price)}</span>
                <br/>
                <span style={{color: 'red'}}>{formatPrice(discountedPrice)}</span>
            </div>);
        }
        return (
            <span>{formatPrice(product.price.price)}</span>
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
    }
    const Test = () => {
        const record = useRecordContext();
        if (!record) return null;
        console.log(record);
        return null;
    };
    return (
        <List
            sort={{field: 'name', order: 'DESC'}}
            perPage={25}
            aside={<Aside/>}
            actions={<ProductListActions permissions={permissions} isSmall={isSmall}/>}
        >
            {isXsmall ? (
                <MobileProductGrid permissions={permissions}/>
            ) : (
                <DatagridConfigurable
                    rowClick="show"
                    bulkActionButtons={false}
                >
                    {/*<Test/>*/}
                    <NumberField source="id" label="ID"/>
                    <ImageField sx={{m: "auto"}} className={"cent"} source="imageUrl" label="Ảnh"/>
                    <TextField source="name" label="Tên SP"/>
                    <TextField source="description" label="Mô tả"/>
                    <FunctionField
                        source="categories"
                        label="Danh mục"
                        render={(record: any) => (
                            record.categories.map((category: any) => (
                                <ChipField sx={{margin: "2px"}} record={category} source="name" key={category.id}/>
                            ))
                        )}
                    />

                    <FunctionField
                        label="Giá"
                        source="price"
                        render={(record: any) => getPromotionPrice(record)}
                        sortable
                    />

                    <FunctionField render={
                        (record: any) => {
                            return (<ArrayField label={"Tuỳ chọn"}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    {permissions && checkPermission(permissions, "PRODUCT_UPDATE") &&
                                        <EditButton/>}
                                    {permissions && checkPermission(permissions, "PRODUCT_DELETE") && !record.deleted &&
                                        <DeleteButton mutationMode={'pessimistic'}/>}
                                    {permissions && checkPermission(permissions, "PRODUCT_UPDATE") && record.deleted &&
                                        <UpdateButton resource={'product/deleted'} label="Restore"
                                                      data={{deleted: false}}
                                                      sx={{
                                                          color: 'green',
                                                          borderColor: 'green',
                                                      }}>
                                            <RestoreIcon/>
                                        </UpdateButton>}
                                </div>
                            </ArrayField>)
                        }
                    }/>
                </DatagridConfigurable>
            )}
        </List>
    )
};

export default ProductList;
