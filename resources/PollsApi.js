import BaseApi from './BaseApi';

export default class PollsApi extends BaseApi {
    get(id) {
        return this.api(`/polls/${id}`, 'get');
    }

    vote(id, votes) {
        let votesList;
        if (!Array.isArray(votes)) {
            votesList = [votes];
        } else {
            votesList = votes;
        }
        return this.api(`/polls/${id}/vote`, 'put', {
            id: votesList
        });
    }
}
