import { APIInstance } from "./apiInstances";


export const instance = () => new APIInstance({
    baseURL: '/login'
})

const api = instance.api;

export const login = (payload) => {
    return api.post(null, {...payload})
};