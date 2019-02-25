import RequestSender from './RequestSender';
import UsersApi from './Users';

export default class HabrApi {
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

        this.users = new UsersApi(this.apicall.bind(this));
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

    async apicall(apimethod, requestmethod, params = {}) {
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
