import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: string;
}



const MonthlyRevenue = (props: Props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/order"
            icon={DollarIcon}
            title={"Doanh thu hàng tháng"}
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;
