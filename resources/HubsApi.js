import BaseApi from './BaseApi';

export default class HubsApi extends BaseApi {
    getInfo(alias) {
        return this.api(`/hub/${alias}/info`, 'get');
    }

    getHabred(alias, page = 1) {
        return this.api(`/hub/${alias}/habred`, 'get', { page });
    }

    getUnhabred(alias, page = 1) {
        return this.api(`/hub/${alias}/unhabred`, 'get', { page });
    }

    getNew(alias, page = 1) {
        return this.api(`/hub/${alias}/new`, 'get', { page });
    }

    getList(page = 1) {
        return this.api('/hubs', 'get', { page });
    }

    subscribe(alias) {
        return this.api(`/hub/${alias}`, 'put');
    }

    unsubscribe(alias) {
        return this.api(`/hub/${alias}`, 'delete');
    }
}
