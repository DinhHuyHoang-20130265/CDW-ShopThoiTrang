import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
    percent?: any;
}

const NbNewOrders = (props: Props) => {
    const { value,percent } = props;
    return (
        <CardWithIcon
            to="/commands"
            icon={ShoppingCartIcon}
            title={"Đơn hàng mới"}
            subtitle={value}
            percent={percent}
        />
    );
};

export default NbNewOrders;
