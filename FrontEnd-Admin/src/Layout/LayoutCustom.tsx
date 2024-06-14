import * as React from 'react';
import {Layout} from 'react-admin';
import {MyAppBar} from "./MyAppBar";

export const LayoutCustom = (props: any) => {
    return (
        <Layout {...props} appBar={MyAppBar} appBarAlwaysOn />
    )
}
