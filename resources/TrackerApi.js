import BaseApi from './BaseApi';

export default class TrackerApi extends BaseApi {
    push(title, text) {
        return this.api('/tracker', 'put', { title, text });
    }

    getCounters() {
        return this.api('/tracker/counters', 'get');
    }

    getPostsFeed(page = 1) {
        return this.api('/tracker/posts', 'get', { page });
    }

    getSubscribersFeed(page = 1) {
        return this.api('/tracker/subscribers', 'get', { page });
    }

    getMentions(page = 1) {
        return this.api('/tracker/mentions', 'get', { page });
    }

    getAppsFeed(page = 1) {
        return this.api('/tracker/apps', 'get', { page });
    }
}
