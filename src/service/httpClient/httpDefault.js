import { baseUrl, logger, ERROR_CONNECTION } from './config'

const getHeaders = () => {
    const token = localStorage.getItem("token")
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
    };
}

const getFormDataHeaders = () => {
    const token = localStorage.getItem("token")
    return {
        // "Content-Type": "application/x-www-form-urlencoded",
        ...(token && { "Authorization": `Bearer ${token}` }),
    };
}

export const get = async (url, query) => {
    let urlFull = `${baseUrl}${url}`
    try {
        if (query) {
            urlFull = new URL(urlFull)
            urlFull.search = new URLSearchParams(query)
        }
        const response = await fetch(urlFull, {
            method: "GET",
            headers: getHeaders(),
        });
        const json = await response.json();

        logger(`GET: ${urlFull}. Result: `, json);
        return json;
    } catch (err) {
        logger(`GET: ${urlFull}. Error: `, err);
        return ERROR_CONNECTION(baseUrl + url, err)
    }
}

export const post = async (url, body = {}) => {
    try {
        const response = await fetch(`${baseUrl}${url}`, {
            body: JSON.stringify(body),
            method: "POST",
            headers: getHeaders(),
        });
        logger(`POST: ${baseUrl}${url}. body:`, body)
        const json = await response.json();
        logger(`Result: `, json);
        return json;
    } catch (err) {
        logger(`Error: `, err);
        return ERROR_CONNECTION(baseUrl + url, err)
    }
}

export const put = async (url, body = {}) => {
    try {
        const response = await fetch(`${baseUrl}${url}`, {
            body: JSON.stringify(body),
            method: "PUT",
            headers: getHeaders(),
        });
        logger(`PUT: ${baseUrl}${url}. body:`, body)
        const json = await response.json();
        logger(`Result: `, json);
        return json;
    } catch (err) {
        logger(`Error: `, err);
        return ERROR_CONNECTION(baseUrl + url, err)
    }
}

export const putFormData = async (url, formData) => {
    try {
        const response = await fetch(`${baseUrl}${url}`, {
            body: formData,
            method: "PUT",
            headers: getFormDataHeaders(),
        });
        const json = await response.json();
        logger(`PUT DATA: ${baseUrl}${url}. Result: `, json);
        return json;
    } catch (err) {
        logger(`PUT DATA: ${baseUrl}${url}. Error: `, err);
        return ERROR_CONNECTION(baseUrl + url, err)
    }
}


export const del = async (url, body = {}) => {
    try {
        const response = await fetch(`${baseUrl}${url}`, {
            body: JSON.stringify(body),
            method: "DELETE",
            headers: getHeaders(),
        });
        logger(`DELETE: ${baseUrl}${url}. body:`, body)
        const json = await response.json();
        logger(`Result: `, json);
        return json;
    } catch (err) {
        logger(`Error: `, err);
        return ERROR_CONNECTION(baseUrl + url, err)
    }
}