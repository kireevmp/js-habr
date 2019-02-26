import BaseApi from './BaseApi';

export default class CompanyApi extends BaseApi {
    getPosts(alias, page = 1) {
        return this.api(`/company/${alias}`, 'get', { page });
    }

    getInfo(alias) {
        return this.api(`/company/${alias}/info`, 'get');
    }

    getList(page = 1) {
        return this.api('/companies', 'get', { page });
    }
}
