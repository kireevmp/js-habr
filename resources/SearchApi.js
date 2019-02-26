import BaseApi from './BaseApi';

export default class SearchApi extends BaseApi {
    posts(query, page = 1) {
        return this.api(`/search/posts/${encodeURIComponent(query)}`, 'get', { page });
    }

    users(query, page) {
        return this.api(`/search/users/${encodeURIComponent(query)}`, 'get', { page });
    }

    hubs(query) {
        return this.api(`/hubs/search/${encodeURIComponent(query)}`, 'get');
    }
}
