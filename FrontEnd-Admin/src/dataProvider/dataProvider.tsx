import {DataProvider, fetchUtils} from 'react-admin';

const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
    getList: async (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
            sort: field,
            order: order,
            start: (page - 1) * perPage,
            end: page * perPage,
        };

        const {
            headers,
            json
        }: any = await httpClient(`${process.env.REACT_APP_API_URL}/${resource}?${fetchUtils.queryParameters(query)}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include',
        });
        return ({
            data: json.content,
            total: parseInt(json.totalElements, 10),
        });
    },

    getOne: (resource: any, params: any) =>
        httpClient(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include',
        }).then(({json}) => ({
            data: json,
        })),
    getMany: (resource: any, params: any) => Promise.resolve({data: []}),
    getManyReference: (resource: any, params: any) => Promise.resolve({data: []}),
    create: (resource: any, params: any) =>
        httpClient(`${process.env.REACT_APP_API_URL}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),

            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        }).then(({json}) => ({
            data: {...params.data, id: json.id},
        })),

    update: (resource: any, params: any) =>
        httpClient(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                credentials: 'include',
            })
        }).then(({json}) => ({
            data: json,
        })),

    updateMany: (resource: any, params: any) => Promise.resolve({data: []}),

    delete: (resource: any, params: any) =>
        httpClient(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                credentials: 'include',
            })
        }).then(({json}) => ({
            data: json,
        })),
    deleteMany: (resource: any, params: any) => Promise.resolve({data: []}),
};
