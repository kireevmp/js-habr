import BaseApi from './BaseApi';

export default class CommentsApi extends BaseApi {
    get(post) {
        return this.api(`/comments/${post}`, 'get');
    }

    post(post, text, parent) {
        return this.api(`/comments/${post}`, 'put', {
            text,
            parent_id: parent
        });
    }

    vote(comment, vote) {
        return this.api(`/comments/${comment}/vote`, 'put', { vote });
    }

    votePlus(comment) {
        return this.vote(comment, 1);
    }

    voteMinus(comment) {
        return this.vote(comment, -1);
    }
}
