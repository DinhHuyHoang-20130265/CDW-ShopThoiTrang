import CardWithIcon from "./CardWithIcon";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import * as React from "react";

interface Props {
    value?: number;
    percent?: any;
}

const NbNewUsers = (props: Props) => {
    const {value, percent} = props;
    return (
        <CardWithIcon
            to="/user"
            icon={PersonAddRoundedIcon}
            title={"Người dùng mới"}
            subtitle={value}
            percent={percent}
        />
    );
}

export default NbNewUsers;