import BaseApi from './BaseApi';

export default class FeedApi extends BaseApi {
    getFlows() {
        return this.api('/flows', 'get');
    }

    getInteresting(alias, page = 1) {
        return this.api(`/flows/${alias}/interesting`, 'get', { page });
    }

    getAll(alias, page = 1) {
        return this.api(`/flows/${alias}/all`, 'get', { page });
    }

    getBest(alias, page = 1) {
        return this.api(`/flows/${alias}/best`, 'get', { page });
    }

    getHubList(alias, page = 1) {
        return this.api(`/flows/${alias}/hubs`, 'get', { page });
    }
}
