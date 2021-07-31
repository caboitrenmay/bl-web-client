import { CORS_PROXY, ERROR_CONNECTION, logger } from './config';

export const get = async (urlFull) => {
    try {
        const response = await fetch(CORS_PROXY + urlFull, {
            method: "GET"
        });
        const json = await response.text()
        logger(`GET: ${urlFull}. Result: `, json);
        return json;
    } catch (err) {
        logger(`GET: ${urlFull}. Error: `, err);
        return ERROR_CONNECTION(urlFull, err)
    }
}
