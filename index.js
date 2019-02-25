/* eslint-disable prefer-const */
/* eslint-disable no-else-return */
// eslint-disable-next-line import/no-extraneous-dependencies

class RequestSender {
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
        } else {
            return '';
        }
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

class HabrApi {
    constructor(options) {
        let {
            client_id,
            token,
            fetch,
            apikey
        } = options;

        if (token) {
            this.token = token;
        } else {
            this.client_id = client_id;
            this.apikey = apikey;
        }

        fetch = fetch || window.fetch;

        if (!fetch) {
            throw new Error("No fetch! Won't work!");
        }

        this.endpoint = 'https://habr.com/api/v1';
        this.requests = new RequestSender(fetch);
    }

    async auth({ password, email }) {
        if (!this.client_id) {
            throw new Error('No client_id parameters in HabrApi auth() call');
        }

        if (!password || !email) {
            throw new Error('No password or email provided');
        }

        const result = await this.requests.post('https://habr.com/auth/o/access-token', {
            grant_type: 'password',
            password,
            email,
            client_id: this.client_id
        }, {
            apikey: this.apikey,
            client: this.client_id,
        });

        this.token = result.access_token;

        console.log('Result', result);
    }

    async api(apimethod, requestmethod, params) {
        let auth_data = this.token
            ? {
                token: this.token,
                client: this.client_id
            } : {
                apikey: this.apikey
            };

        let result = await this.requests.request(
            this.getUrl(apimethod),
            requestmethod,
            params,
            auth_data
        );

        console.log(result);
        return result;
    }
}
