"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idoit = void 0;
class idoit {
    constructor() {
        this.name = 'idoit';
        this.documentationUrl = 'https://kb.i-doit.com/pages/viewpage.action?pageId=7831613';
        this.displayName = 'i-doit';
        this.properties = [
            {
                displayName: 'Host',
                name: 'host',
                type: 'string',
                default: 'https://domain/src/jsonrpc.php',
            },
            {
                displayName: 'API-Key',
                name: 'apikey',
                type: 'string',
                default: '',
            },
        ];
    }
}
exports.idoit = idoit;
//# sourceMappingURL=idoit.credentials.js.map