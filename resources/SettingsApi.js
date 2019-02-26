import BaseApi from './BaseApi';

export default class SettingsApi extends BaseApi {
    acceptAgreement() {
        return this.api('/settings/agreement', 'put');
    }
}
