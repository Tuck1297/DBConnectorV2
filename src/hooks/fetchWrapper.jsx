import axios from "axios";

export const fetchWrapper = {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE")
}

function request(method) {
    return async (url, body) => {
        const requestOptions = {
            method,
            headers: {},
            url: url
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.data = body;
        }

        try {
            const response = await axios(requestOptions);
            return handleResponse(response);
        }
        catch (error) {
            return handleResponse(error.response);
        }
    }
}

async function handleResponse(response) {
    const data = response.data;
    if (!response.status || response.status < 200 || response.status >= 300) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}