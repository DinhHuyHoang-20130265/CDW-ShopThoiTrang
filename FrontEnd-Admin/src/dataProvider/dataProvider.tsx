import {DataProvider, fetchUtils} from 'react-admin';
import {authProvider} from "../authProvider";

const httpClient = fetchUtils.fetchJson;


export const dataProvider: DataProvider = {
    // @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
            const {page, perPage} = params.pagination;
            const {field, order} = params.sort;
            const query = {
                filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
                sort: field,
                order: order,
                page: page - 1,
                perPage: perPage,
            };

            const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/${resource}?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include',
            });

            return {
                data: json.content,
                total: parseInt(json.totalElements, 10),
            };
        } catch (error: any) {
            if (error.status === 401) {
                // @ts-ignore
                await authProvider.logout();
                window.location.href = '/#/login';
            }
        }
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
    // @ts-ignore
    create: (resource: any, params: any) => {
        try {
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
            }));
        } catch (error: any) {
            if (error.status === 401) {
                // @ts-ignore
                authProvider.logout().then(r => console.log(r));
                window.location.href = '/#/login';
            }
        }
    },

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
