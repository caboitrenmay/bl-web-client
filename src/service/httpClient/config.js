export { default as logger} from "../../helper/logger";

export const baseUrl = process.env.REACT_APP_BASE_API_URL;
export const ERROR_CONNECTION = (url, err) => {
    return {
        success: false,
        message: `Lỗi kết nối với server`,
        url: url,
        error: err
    }
}

export const CORS_PROXY = "http://localhost:3000/proxy?proxy="
