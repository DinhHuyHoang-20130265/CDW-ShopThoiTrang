import * as React from 'react';
import {Admin, Resource} from 'react-admin';
import {dataProvider} from "./dataProvider/dataProvider";
import UserList from "./users/UserList";

const App = () => {
    return (
        <Admin
            title=""
            dataProvider={dataProvider}
            disableTelemetry
        >
            <Resource name="user" list={UserList}/>
        </Admin>
    );
};

export default App;
