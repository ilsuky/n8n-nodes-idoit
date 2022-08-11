"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idoitRequest = void 0;
const n8n_workflow_1 = require("n8n-workflow");
async function idoitRequest(body = {}) {
    const credentials = await this.getCredentials('idoit');
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'POST',
        body,
        uri: `${credentials.host}`,
        json: true,
        gzip: true,
        rejectUnauthorized: false,
    };
    if (Object.keys(body).length === 0) {
        delete options.body;
    }
    else {
        options.json = true;
    }
    try {
        return await this.helpers.request(options);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
exports.idoitRequest = idoitRequest;
//# sourceMappingURL=GenericFunctions.js.map