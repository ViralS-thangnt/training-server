
var exports = module.exports = {};

exports.responseData = function(msg, code, data) {
    return {
        code: code,
        message: msg,
        data: data
    };
};

exports.responseWithError = function(data = {}, code = 500, msg = 'Error !') {
    // return responseData(data, code, msg);
    return {
        code: code,
        message: msg,
        data: data
    };
};

exports.responseWithSuccess = (data = {}, code = 200, msg = 'Success !') => {
    return {
        code: code,
        message: msg,
        data: data
    };
};


