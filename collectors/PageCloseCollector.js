const BaseCollector = require('./BaseCollector');

/**
 * @typedef { import('./BaseCollector').CollectorInitOptions } CollectorInitOptions
 */

class PageCloseCollector extends BaseCollector {

    id() {
        return 'close';
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
        await this._cdpClient.send('Page.navigate', {'url': 'about:blank'});
        //await this._cdpClient.send('Runtime.evaluate', {'expression': 'window.location.replace("about:blank");'});
        return "closed page";
    }

}
module.exports = PageCloseCollector;

