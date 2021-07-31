const logger = (message, data) => {
    if (!isLoggerMode()) {
        return
    }
    return console.log(message, data);
}

function isLoggerMode() {
    const type = process.env.REACT_APP_BASE;
    if (type && type === 'production') {
        return false
    }
    return true
}

export const IS_LOGGER = isLoggerMode()

export default logger

