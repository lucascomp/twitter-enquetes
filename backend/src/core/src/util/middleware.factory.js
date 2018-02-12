const createAsyncMiddleware = (property) => (method) =>
    (req, res, next) => {
        const promise = method(req[property], req, res);
        if(promise.then){
            return promise.then((value) => {
                req[property] = value;
                return req[property];
            })
                .then(() => next())
                .catch(next);
        }
        throw new TypeError(`createAsyncMiddleware: o metodo ${method.toString()} deve retornar uma promise`);
    }

module.exports = {
    createAsyncMiddleware
}