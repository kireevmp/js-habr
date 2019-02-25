export default class RequestSender {
    constructor(fetch) {
        this.fetch = fetch;

        this.noEncode = [
            'redirect_uri',
        ];
    }

    toBody(params) {
        const pairs = [];

        Object.keys(params).forEach((key) => {
            if (this.noEncode.includes(key)) {
                pairs.push(`${key}=${params[key]}`);
            } else {
                pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key]).replace('%20', '+')}`);
            }
        });

        if (pairs.length > 0) {
            return `${pairs.join('&')}`;
        }

        return '';
    }

    get(url, params = {}, headers = {}) {
        let packedUrl = `${url}?${this.toBody(params)}`;
        return this.request(packedUrl, 'get', {}, headers);
    }

    post(url, params = {}, headers = {}) {
        return this.request(url, 'post', params, headers);
    }

    put(url, params = {}, headers = {}) {
        return this.request(url, 'put', params, headers);
    }

    delete(url, params = {}, headers = {}) {
        return this.request(url, 'delete', params, headers);
    }

    request(url, method, params = {}, headers = {}) {
        console.log('request', url, params, headers, method);
        return this.fetch(url, {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...headers
            },
            body: this.toBody(params)
        })
            .then(x => x.json())
            .catch(console.error);
    }
}
