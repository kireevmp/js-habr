import BaseApi from './BaseApi';

export default class UsersApi extends BaseApi {
    get(login) {
        return this.api(`/users/${login}`, 'get');
    }

    me() {
        return this.get('me');
    }

    list(page = 1) {
        return this.api('/users', 'get', { page });
    }

    getComments(login, page = 1) {
        return this.api(`/users/${login}/comments`, 'get', { page });
    }

    getPosts(login, page) {
        return this.api(`/users/${login}/posts`, 'get', { page });
    }

    getHubs(login) {
        return this.api(`/users/${login}/hubs`, 'get');
    }

    getCompanies(login) {
        return this.api(`/users/${login}/companies`, 'get');
    }

    getFollowers(login, page) {
        return this.api(`/users/${login}/followers`, 'get', { page });
    }

    getFollowed(login, page) {
        return this.api(`/users/${login}/followed`, 'get', { page });
    }

    voteKarmaPlus(login) {
        return this.api(`/users/${login}/vote`, 'put');
    }

    voteKarmaMinus(login) {
        return this.api(`/users/${login}/vote`, 'delete');
    }

    voteKarma(login, vote) {
        if (vote > 0) {
            return this.voteKarmaPlus(login);
        }

        return this.voteKarmaMinus(login);
    }

    getFavoritePosts(login, page) {
        return this.api(`/users/${login}/favorites/posts`, 'get', { page });
    }

    getFavoriteComments(login, page) {
        return this.api(`/users/${login}/favorites/comments`, 'get', { page });
    }
}
