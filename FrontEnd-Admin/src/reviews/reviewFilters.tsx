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
    <SearchInput source="q" placeholder={'Tìm kiếm theo nội dung'} alwaysOn/>,
    <SelectInput
        source="type"
        choices={[
            {type: 0, name: 'Từ chối'},
            {type: 1, name: 'Chờ xét duyệt'},
            {type: 2, name: 'Đã chấp nhận'},
        ]}
        optionText="name"
        optionValue="type"
        label={'Trạng thái'}
    />,
    <ReferenceInput source="reviewer.id" reference="user" label={'Người đánh giá'}>
        <AutocompleteInput
            optionText={(choice?: Customer) =>
                choice?.id
                    ? `${choice.userInfo.fullName}`
                    : ''
            }
            sx={{minWidth: 200}}
            label={'Người đánh giá'}
        />
    </ReferenceInput>,
    <ReferenceInput source="product.id" reference="product" label={'Sản phẩm'}>
        <AutocompleteInput optionText="name" optionValue={'id'} label={'Sản phẩm'}/>
    </ReferenceInput>,
    <DateInput source="reviewedDate" label={'Ngày đánh giá'}/>,
];

export default reviewFilters;
