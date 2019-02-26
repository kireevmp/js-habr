import BaseApi from './BaseApi';

export default class PostApi extends BaseApi {
    get(post) {
        return this.api(`/post/${post}`, 'get');
    }

    getMetadata(posts) {
        let postList = [];
        if (!Array.isArray(posts)) {
            postList = [posts];
        } else {
            postList = posts;
        }

        const postsString = postList.join(',');
        return this.api('/posts/meta', 'get', {
            ids: postsString
        });
    }

    vote(post, vote) {
        return this.api(`/post/${post}/vote`, 'put', { vote });
    }

    votePlus(post) {
        return this.vote(post, 1);
    }

    voteMinus(post) {
        return this.vote(post, -1);
    }

    increaseCount(post) {
        return this.api(`/post/${post}/viewcount`, 'put');
    }

    addFavorite(post) {
        return this.api(`/post/${post}/favorite`, 'put');
    }

    removeFavorite(post) {
        return this.api(`/post/${post}/favorite`, 'delete');
    }
}
