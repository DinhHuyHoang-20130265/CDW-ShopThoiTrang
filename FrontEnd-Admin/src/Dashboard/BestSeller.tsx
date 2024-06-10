import * as React from 'react';
import { Card, CardHeader, List } from '@mui/material';
import {Product} from '../types';
import {FixedSizeList} from "react-window";
import {ProductItem} from "./ProductItem";


const BestSeller = (products: any) => {
    const Row = ({ index, style } : any) => {
        const record = products.products[index].product;
        return (
            <div style={style}>
                <ProductItem key={record.id} product={record} quantity={products.products[index].quantity} />
            </div>
        );
    };

    return (
        <Card sx={{ flex: 1 }}>
            <CardHeader title={"Sản phẩm bán chạy"} />
            <FixedSizeList
                height={400}
                itemCount={products.products.length}
                itemSize={60}
                width="100%"
                style={{ listStyle: 'none', padding: 0 }}
            >
                {Row}
            </FixedSizeList>
        </Card>
    );
};

export default BestSeller;
