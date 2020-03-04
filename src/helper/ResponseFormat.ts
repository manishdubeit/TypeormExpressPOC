
var response_format = {
    success: '',
    status: '',
    data: [],
    error: []
};

export function extractErrorMessages(error) {
    return error.map(a => a.msg);
}

export function setResponse(status = 404, error = null, data = null) {
    if (error) {
        return {
            ...response_format,
            status,
            error: (status === 422) ? extractErrorMessages(error) : error,
            data: [],
            success: false
        };
    } else {
        return {
            ...response_format,
            status,
            data,
            success: true
        }
    }
}
