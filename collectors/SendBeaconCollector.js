const BaseCollector = require('./BaseCollector');

class SendBeaconCollector extends BaseCollector {

    id() {
        return 'beacons';
    }

    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo 
     */
    addTarget({cdpClient, type}) {
        if (type === 'page') {
            this._cdpClient = cdpClient;
        }
    }

    /**
     * @returns {Promise<string>}
     */
    async getData() {


        return "sendBeacon data found"
    }
}

module.exports = SendBeaconCollector;
