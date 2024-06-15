import {DataProvider, fetchUtils} from 'react-admin';
import {imgProvider} from "../imgProvider/imgProvider";
import axios from "axios";
import {authProvider} from "../authProvider";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && (error.response.status === 401)) {
            await httpClient.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then((response: any) => {
                console.log(response)
                Promise.resolve();
            }).catch((error) => {
                if (error.response.status === 400) {
                    // @ts-ignore
                    authProvider.logout();
                    window.location.href = '/#/login';
                    return Promise.reject({message: "Your session is expired. Please login again."});
                }
            });
        } else {
            if (error.response.status === 400) {
                // @ts-ignore
                authProvider.logout();
                window.location.href = '/#/login';
                return Promise.reject({message: "Your session is expired. Please login again."});
            }
            return Promise.reject({message: "There was an error. Please try again."});
        }
    }
)

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
    getList: async (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
            sort: field,
            order: order,
            page: page - 1,
            perPage: perPage,
        };
        let json: any;

        await httpClient.get(`${process.env.REACT_APP_API_URL}/${resource}?${fetchUtils.queryParameters(query)}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true
        }).then((response: any) => {
            json = response.data;
        });

        return {
            data: resource !== 'product' ? resource !== 'user' ?
                    json.content :
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

    },
    getOne: async (resource: any, params: any) =>
        await httpClient.get(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        }).then((response) => {
            return ({
                data: resource === 'product' ? {
                    ...response.data,
                    categoriesIds: response.data.categories.map((cat: any) => cat.id)
                } : resource === 'user' ? {
                    ...response.data,
                } : response.data
            })
        }),
    getMany: async (resource: any, params: any) => {
        const ids = params.ids.map((cate: object | any) => typeof cate === "object" ? cate.id : cate)
        const query = {
            ids: JSON.stringify({ids: ids}),
        };
        let result: never[] = [];
        await httpClient.get(`${process.env.REACT_APP_API_URL}/${resource}/ids?${fetchUtils.queryParameters(query)}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true
        }).then((response: any) => {
            result = response.data;
        })
        return Promise.resolve({data: result})
    },
    getManyReference: (resource: any, params: any) => Promise.resolve({data: []}),
    create: async (resource: any, params: any) => {
        let payload = {};
        let avtUrl = null;
        let categories = null;
        let role = null;
        let imageUrl = null;
        let imgProducts = [];
        let resourceUser: any = null;
        let permissions: any = null;
        let query = {};
        switch (resource) {
            case 'product':
                if (params.data.imageUrl === undefined || params.data.imageUrl === null)
                    return Promise.reject({message: "Ảnh chính không được để trống"});

                if (params.data.imgProducts !== undefined && params.data.imgProducts !== null && params.data.imgProducts.length > 4)
                    return Promise.reject({message: "Số lượng ảnh phụ không được vượt quá 4 ảnh"});

                if (params.data.imageUrl !== undefined && params.data.imageUrl !== null) {
                    let selectedImg = null;
                    await getBase64(params.data.imageUrl.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageUrl = await imgProvider(selectedImg);
                }
                if (params.data.imgProducts !== undefined && params.data.imgProducts !== null) {
                    for (const item of params.data.imgProducts) {
                        let selectedImg = null;
                        await getBase64(item.rawFile)
                            .then(res => {
                                selectedImg = res;
                            })
                            .catch(err => console.log(err))
                        imgProducts.push({
                            product: null,
                            url: await imgProvider(selectedImg),
                            releaseDate: null,
                            releaseBy: null,
                            updateDate: null,
                            updateBy: null,
                        });
                    }
                }
                query = {ids: JSON.stringify({ids: params.data.categories})};
                await httpClient.get(`${process.env.REACT_APP_API_URL}/category/ids?${fetchUtils.queryParameters(query)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    categories = response.data;
                });
                payload = categories !== null ? {
                    ...params.data,
                    categories: categories,
                    imageUrl: imageUrl,
                    imgProducts: imgProducts
                } : params.data;
                break;
            case 'user':
                query = {ids: JSON.stringify({ids: params.data.role})};
                await httpClient.get(`${process.env.REACT_APP_API_URL}/role/ids?${fetchUtils.queryParameters(query)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    role = response.data;
                })
                const query1 = {
                    ids: JSON.stringify({ids: params.data.resourceVariations.map((item: any) => item.resource.id)}),
                };
                await httpClient.get(`${process.env.REACT_APP_API_URL}/resource/ids?${fetchUtils.queryParameters(query1)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    resourceUser = response.data;
                })
                await httpClient.get(`${process.env.REACT_APP_API_URL}/permission`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    permissions = response.data.content;
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
                payload = role !== null ? {
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
                } : params.data;
                break;
            case 'import-invoice':
                payload = params.data.importInvoiceDetails;
                break;
            case 'promotion':
                if (params.data.thumbnail === undefined || params.data.thumbnail === null)
                    return Promise.reject({message: "Ảnh thumbnail không được để trống"});
                if (params.data.thumbnail !== undefined && params.data.thumbnail !== null) {
                    let selectedImg = null;
                    await getBase64(params.data.thumbnail.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageUrl = await imgProvider(selectedImg);
                }
                payload = {...params.data, thumbnail: imageUrl};
                break;
            case 'blog':
                if (params.data.thumbnail === undefined || params.data.thumbnail === null)
                    return Promise.reject({message: "Ảnh thumbnail không được để trống"});
                if (params.data.thumbnail !== undefined && params.data.thumbnail !== null) {
                    let selectedImg = null;
                    await getBase64(params.data.thumbnail.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageUrl = await imgProvider(selectedImg);
                }
                payload = {...params.data, thumbnail: imageUrl};
                break;
            default:
                payload = params.data;
                break;
        }
        return await httpClient.post(`${process.env.REACT_APP_API_URL}/${resource}`,
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                withCredentials: true
            }).then((response: any) => {
            if (response.status === 200) {
                if (response.data.statusCodeValue === 200) {
                    window.location.href = `/#/${resource}`;
                    return Promise.resolve({data: response.data.body});
                } else if (response.data.statusCodeValue === undefined || response.data.statusCodeValue === null) {
                    window.location.href = `/#/${resource}`;
                    return Promise.resolve({data: response.data});
                } else {
                    return Promise.reject(response.data.body);
                }
            }
            return Promise.reject(response.data.body);
        }).catch((error: any) => {
            return Promise.reject(error);
        })
    },
    update: async (resource: any, params: any) => {
        console.log(params)
        let payload = {};
        let categories = null;
        let role = null;
        let imageUrl = null;
        let imgProducts = [];
        let avtUrl = null;
        let resourceUser: any = null;
        let permissions: any = null;
        let query = {};
        switch (resource) {
            case 'product':
                if (params.data.imgProducts_new !== undefined && params.data.imgProducts_new !== null && params.data.imgProducts_new.length > 4)
                    return Promise.reject({message: "Số lượng ảnh phụ không được vượt quá 4 ảnh"});

                if (params.data.imageUrl_new !== undefined && params.data.imageUrl_new !== null) {
                    let selectedImg = null;
                    await getBase64(params.data.imageUrl_new.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageUrl = await imgProvider(selectedImg);
                }
                if (params.data.imgProducts_new !== undefined && params.data.imgProducts_new !== null) {
                    for (const item of params.data.imgProducts_new) {
                        let selectedImg = null;
                        await getBase64(item.rawFile)
                            .then(res => {
                                selectedImg = res;
                            })
                            .catch(err => console.log(err))
                        imgProducts.push({
                            product: null,
                            url: await imgProvider(selectedImg),
                            releaseDate: null,
                            releaseBy: null,
                            updateDate: null,
                            updateBy: null,
                        });
                    }
                }
                query = {
                    ids: JSON.stringify({ids: params.data.categoriesIds}),
                };
                await httpClient.get(`${process.env.REACT_APP_API_URL}/category/ids?${fetchUtils.queryParameters(query)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    categories = response.data;
                })
                payload = categories !== null ? {
                    ...params.data,
                    categories: categories,
                    imageUrl: imageUrl !== null ? imageUrl : params.data.imageUrl,
                    imgProducts: imgProducts !== null && imgProducts.length > 0 ? imgProducts : params.data.imgProducts
                } : params.data;
                break;
            case 'user':
                query = {
                    ids: JSON.stringify({ids: params.data.role}),
                };
                await httpClient.get(`${process.env.REACT_APP_API_URL}/role/ids?${fetchUtils.queryParameters(query)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    role = response.data;
                })
                const query1 = {
                    ids: JSON.stringify({ids: params.data.resourceVariations.map((item: any) => item.resource.id)}),
                };
                await httpClient.get(`${process.env.REACT_APP_API_URL}/resource/ids?${fetchUtils.queryParameters(query1)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    resourceUser = response.data;
                })
                await httpClient.get(`${process.env.REACT_APP_API_URL}/permission`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true
                }).then((response: any) => {
                    permissions = response.data.content;
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
                payload = role !== null ? {
                    ...params.data,
                    role: role[0],
                    userInfo: {
                        ...params.data.userInfo,
                        avtUrl:
                            avtUrl !== null ? avtUrl :
                                params.data.userInfo.avtUrl !== undefined && params.data.userInfo.avtUrl !== null ?
                                    params.data.userInfo.avtUrl :
                                    null
                    },
                    resourceVariations: resourceUser != null && permissions !== null ? params.data.resourceVariations.map((item: any, index: any) => ({
                        resource: resourceUser.find((resource: any) => resource.id === item.resource.id),
                        permissions: item.permissions.map((item: any) => permissions.find((cat: any) => cat.id === item.id))
                    })) : []
                } : params.data;
                break;
            case 'promotion':
                if (params.data.newthumbnail !== undefined && params.data.newthumbnail !== null) {
                    let selectedImg = null;
                    await getBase64(params.data.newthumbnail.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageUrl = await imgProvider(selectedImg);
                }
                payload = {...params.data, thumbnail: imageUrl !== null ? imageUrl : params.data.thumbnail};
                break;
            case 'blog':
                if (params.data.newthumbnail !== undefined && params.data.newthumbnail !== null) {
                    let selectedImg = null;
                    await getBase64(params.data.newthumbnail.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageUrl = await imgProvider(selectedImg);
                }
                payload = {...params.data, thumbnail: imageUrl !== null ? imageUrl : params.data.thumbnail};
                break;
            default:
                payload = params.data;
                break;
        }
        let result: any;
        await httpClient.put(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`,
            JSON.stringify(payload), {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }).then((response: any) => {
            result = response.data;
        })
        return Promise.resolve({data: result});
    },

    updateMany: (resource: any, params: any) => Promise.resolve({data: []}),

    delete: async (resource: any, params: any) =>
        await httpClient.delete(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true
        }).then((response) => {
            return Promise.resolve({data: response.data})
        }),
    deleteMany: (resource: any, params: any) => {
        console.log("Delete many")
        console.log(resource, params)
        return Promise.resolve({data: []})
    },
};
