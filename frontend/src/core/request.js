export class Request {

    constructor() {
        this.options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json; charset=utf-8",
            }
        }

        this.hasTokens = true
    }

    get token() {
        let token = localStorage.getItem('auth');
        return token;
    }

    get(url, options = {}) {
        this.options.method = 'GET'
        return this._makeFetch(url, options)
    }

    post(url, options = {}) {
        this.options.method = 'POST'
        return this._makeFetch(url, options)
    }

    delete(url, options = {}) {
        this.options.method = 'DELETE'
        return this._makeFetch(url, options)
    }

    put(url, options = {}) {
        this.options.method = 'PUT'
        return this._makeFetch(url, options)
    }

    _makeFetch(url, $options) {
        let options = this.hasTokens ? this._setToken(this.options) : this.options
        $options = this.beforeSend($options)
        options = {
            ...options,
            ...$options
        }
        return window.fetch(url, options)
    }

    beforeSend(options) {
        if (options.body) {
            options.body = JSON.stringify(options.body)
        }

        return options
    }

    _setToken(options) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${this.token}`
        }
        return options
    }
}