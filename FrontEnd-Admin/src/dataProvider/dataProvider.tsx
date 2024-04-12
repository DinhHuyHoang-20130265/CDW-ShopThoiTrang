import {DataProvider, fetchUtils} from 'react-admin';
import {authProvider} from "../authProvider";
import {imgProvider} from "../imgProvider/imgProvider";


const httpClient = fetchUtils.fetchJson;

async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader: any = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result.split(',')[1])
        }
        reader.onerror = reject
    })
}


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
                data: resource !== 'product' ? resource !== 'user' ? json.content :
                        json.content.map((item: any) => ({
                            ...item,
                            resourceVariations: [
                                ...item.resourceVariations.map((cat: any) => ({
                                    ...cat,
                                    permission_id: cat.permissions.map((cat: any) => cat.id)
                                }))
                            ],
                            resource_id: {
                                resource_id: item.resourceVariations.map((cat: any) => cat.resource.id)
                            }
                        })) :
                    json.content.map((item: any) => ({
                        ...item,
                        categoriesIds: item.categories.map((cat: any) => cat.id)
                    })),
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
        }).then(({json}) => {
            return ({
                data: resource === 'product' ? {
                    ...json,
                    categoriesIds: json.categories.map((cat: any) => cat.id)
                } : resource === 'user' ? {
                    ...json
                } : json
            })
        }),
    getMany: async (resource: any, params: any) => {
        try {
            const ids = params.ids.map((cate: object | any) => typeof cate === "object" ? cate.id : cate)
            const query = {
                ids: JSON.stringify({ids: ids}),
            };

            const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/${resource}/ids?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include',
            });

            return Promise.resolve({data: json})
        } catch (error: any) {
            if (error.status === 401) {
                // @ts-ignore
                await authProvider.logout();
                window.location.href = '/#/login';
            }
            return Promise.resolve({data: []})
        }
    },
    getManyReference: (resource: any, params: any) => Promise.resolve({data: []}),
    // @ts-ignore
    create: async (resource: any, params: any) => {
        try {
            let avtUrl = null;
            let categories = null;
            let role = null;
            let resourceUser: any = null;
            let permissions: any = null;
            if (resource === 'product') {
                const query = {
                    ids: JSON.stringify({ids: params.data.categories}),
                };
                const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/category/ids?${fetchUtils.queryParameters(query)}`, {
                    method: 'GET',

                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                    credentials: 'include'
                })
                categories = json;
            } else if (resource === 'user') {
                const query = {
                    ids: JSON.stringify({ids: params.data.role}),
                };
                const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/role/ids?${fetchUtils.queryParameters(query)}`, {
                    method: 'GET',

                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                    credentials: 'include'
                })
                const query1 = {
                    ids: JSON.stringify({ids: params.data.resourceVariations.map((item: any) => item.resource.id)}),
                };
                const json2 = await httpClient(`${process.env.REACT_APP_API_URL}/resource/ids?${fetchUtils.queryParameters(query1)}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                    credentials: 'include'
                })
                const json3: any = await httpClient(`${process.env.REACT_APP_API_URL}/permission`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                    credentials: 'include'
                })
                if (params.data.userInfo.avt !== undefined && params.data.userInfo.avt !== null) {
                    let selectedImg = null;
                    await getBase64(params.data.userInfo.avt.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    avtUrl = await imgProvider(selectedImg);
                }
                role = json;
                resourceUser = json2.json;
                permissions = json3.json.content;
            }
            const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(resource === "import-invoice" ? params.data.ImportInvoiceRequest
                    : (categories !== null ? {
                        ...params.data,
                        categories: categories
                    } : (role !== null ? {
                        ...params.data,
                        role: role[0],
                        userInfo: {
                            ...params.data.userInfo,
                            avtUrl: (avtUrl !== null ? avtUrl : null)
                        },
                        resourceVariations: resourceUser != null && permissions !== null ? params.data.resourceVariations.map((item: any, index: any) => ({
                            resource: resourceUser.find((resource: any) => resource.id === item.resource.id),
                            permissions: item.permissions.map((item: any) => permissions.find((cat: any) => cat.id === item.id))
                        })) : []
                    } : params.data))),

                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            if (json.statusCodeValue < 200 || json.statusCodeValue >= 300) {
                console.log(json)
                return Promise.reject({message: json.body});
            }
            window.location.href = `/#/${resource}`;
            console.log(json)
            return Promise.resolve({data: json});
        } catch (error: any) {
            if (error.status === 401) {
                // @ts-ignore
                authProvider.logout().then(r => console.log(r));
                window.location.href = '/#/login';
            }
        }
    },

    update: async (resource: any, params: any) => {
        let categories = null;
        let role = null;
        let resourceUser: any = null;
        let permissions: any = null;
        if (resource === 'product') {
            const query = {
                ids: JSON.stringify({ids: params.data.categoriesIds}),
            };
            console.log(params.data)
            const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/category/ids?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',

                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            categories = json;
            console.log(categories);
        } else if (resource === 'user') {
            const query = {
                ids: JSON.stringify({ids: params.data.role}),
            };
            const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/role/ids?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',

                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            const query1 = {
                ids: JSON.stringify({ids: params.data.resourceVariations.map((item: any) => item.resource.id)}),
            };
            const json2 = await httpClient(`${process.env.REACT_APP_API_URL}/resource/ids?${fetchUtils.queryParameters(query1)}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            const json3: any = await httpClient(`${process.env.REACT_APP_API_URL}/permission`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            role = json;
            resourceUser = json2.json;
            permissions = json3.json.content;
        }
        const {json} = await httpClient(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(categories !== null ? {...params.data, categories: categories} :
                (role !== null ? {
                    ...params.data,
                    role: role[0],
                    resourceVariations: resourceUser != null && permissions !== null ? params.data.resourceVariations.map((item: any, index: any) => ({
                        resource: resourceUser.find((resource: any) => resource.id === item.resource.id),
                        permissions: item.permissions.map((item: any) => permissions.find((cat: any) => cat.id === item.id))
                    })) : []
                } : params.data)),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        })
        return Promise.resolve({data: json});
    },

    updateMany: (resource: any, params: any) => Promise.resolve({data: []}),

    delete: (resource: any, params: any) =>
        httpClient(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        }).then(({json}) => ({
            data: json,
        })),
    deleteMany: (resource: any, params: any) => Promise.resolve({data: []}),
};
