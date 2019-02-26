import BaseApi from './BaseApi';

export default class FeedApi extends BaseApi {
    getHabred(page = 1) {
        return this.api('/feed/habred', 'get', { page });
    }

    getUnhabred(page = 1) {
        return this.api('/feed/unhabred', 'get', { page });
    }

    getNew(page = 1) {
        return this.api('/feed/new', 'get', { page });
    }
}
