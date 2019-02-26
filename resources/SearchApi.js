import BaseApi from './BaseApi';

export default class SearchApi extends BaseApi {
    searchPosts(query, page = 1) {
        return this.api(`/search/posts/${encodeURIComponent(query)}`, 'get', { page });
    }

    searchUsers(query, page) {
        return this.api(`/search/users/${encodeURIComponent(query)}`, 'get', { page });
    }

    searchHubs(query) {
        return this.api(`/hubs/search/${encodeURIComponent(query)}`, 'get');
    }
}
