import BaseApi from './BaseApi';

export default class TrackerApi extends BaseApi {
    push(title, text) {
        return this.api('/tracker', 'put', { title, text });
    }

    getCounters() {
        return this.api('/tracker/counters', 'get');
    }

    getPosts(page = 1) {
        return this.api('/tracker/posts', 'get', { page });
    }

    getSubscribers(page = 1) {
        return this.api('/tracker/subscribers', 'get', { page });
    }

    getMentions(page = 1) {
        return this.api('/tracker/mentions', 'get', { page });
    }

    getApps(page = 1) {
        return this.api('/tracker/apps', 'get', { page });
    }
}
