import {DataProvider, fetchUtils} from 'react-admin';

const apiUrl = 'http://localhost:8080/api';
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
    getList: async (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            sort: field,
            order: order,
            start: (page - 1) * perPage,
            end: page * perPage,
        };
        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

        const {headers, json}: any = await httpClient(url);
        return ({
            data: json.content,
            total: parseInt(headers.get('X-Total-Count'), 10),
        });
    },

    getOne: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json}) => ({
            data: json,
        })),
    getMany: (resource: any, params: any) => Promise.resolve({data: []}),
    getManyReference: (resource: any, params: any) => Promise.resolve({data: []}),
    create: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({
            data: {...params.data, id: json.id},
        })),

    update: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({
            data: json,
        })),

    updateMany: (resource: any, params: any) => Promise.resolve({data: []}),

    delete: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({json}) => ({
            data: json,
        })),
    deleteMany: (resource: any, params: any) => Promise.resolve({data: []}),
};
