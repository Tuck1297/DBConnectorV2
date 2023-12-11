import {fetchWrapper} from "@/hooks/fetchWrapper";

let baseUrl = "http://localhost:3000/api";

export const connectService = {
    create,
    update,
    delete: _delete,
}

async function create(connectObj) {
    return await fetchWrapper.post(baseUrl + "/connections", connectObj);
}

async function update(connectObj) {
    return await fetchWrapper.put(baseUrl + "/connections", connectObj);
}

async function _delete(id) {
    return await fetchWrapper.delete(baseUrl + "/connections", id);
}