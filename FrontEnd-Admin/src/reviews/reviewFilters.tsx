import * as React from 'react';
import {
    AutocompleteInput,
    DateInput,
    ReferenceInput,
    SearchInput,
    SelectInput,
} from 'react-admin';
import {Customer} from '../types';

const reviewFilters = [
    <SearchInput source="q" alwaysOn/>,
    <SelectInput
        source="type"
        choices={[
            {type: 0, name: 'Từ chối'},
            {type: 1, name: 'Chờ xét duyệt'},
            {type: 2, name: 'Đã chấp nhận'},
        ]}
    />,
    <ReferenceInput source="reviewer" reference="user">
        <AutocompleteInput
            optionText={(choice?: Customer) =>
                choice?.id
                    ? `${choice.userInfo.fullName}`
                    : ''
            }
            sx={{minWidth: 200}}
        />
    </ReferenceInput>,
    <ReferenceInput source="product" reference="product">
        <AutocompleteInput optionText="reference"/>
    </ReferenceInput>,
    <DateInput source="reviewedDate"/>,
];

export default reviewFilters;
