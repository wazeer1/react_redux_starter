import { APIInstance } from "./apiInstances";


export const instance = () => new APIInstance({
    baseURL: '/url'
})

const api = instance.api;

export const users = (payload) => {
    return api.get(null, {...payload})
};