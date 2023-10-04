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
     * @returns {Promise<String>}
     */
    async getData() {
        //await this._cdpClient.send('Page.enable');
        //await this._cdpClient.send('Page.enable');
        /*const d = await this._cdpClient.send('Debugger.enable');
        console.log(d);
        const test = await this._cdpClient.send('Debugger.setBreakpointOnFunctionCall', {objectId: '1'})
        console.log(test)*/
        //await this._cdpClient.send('Browser.close');
        //await this._cdpClient.send('Page.navigate', {url: "https://localhost"});
        await this._cdpClient.send('Page.close', {runBeforeUnload: true});
        await this._cdpClient.send('Page.disable');
        //await this._cdpClient.send('Page.reload');
        return "test"
    }

    async postLoad() {
    }

}

module.exports = SendBeaconCollector;

