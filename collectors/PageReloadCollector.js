const BaseCollector = require('./BaseCollector');

class PageReloadCollector extends BaseCollector {

    id() {
        return 'reload';
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
     * @returns {Promise<String>}
     */
    async getData() {
        await this._cdpClient.send('Page.reload');
        return "reloaded page";
    }

    async postLoad() {
    }

}

module.exports = PageReloadCollector;

