"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idoit = void 0;
class idoit {
    constructor() {
        this.description = {
            displayName: 'i-doit',
            name: 'idoit',
            icon: 'file:idoit.png',
            group: ['transform'],
            version: 1,
            description: 'i-doit JSON-RPC API',
            defaults: {
                name: 'idoit',
                color: '#772244',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'idoit',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Namespace',
                    name: 'namespace',
                    type: 'options',
                    options: [
                        {
                            name: 'Search',
                            value: 'idoit.search',
                        },
                        {
                            name: 'Version',
                            value: 'idoit.version',
                        },
                        {
                            name: 'Constants',
                            value: 'idoit.constants',
                        },
                        {
                            name: 'CMDB Object',
                            value: 'cmdb.object',
                        },
                        {
                            name: 'CMDB Category',
                            value: 'cmdb.category',
                        },
                    ],
                    default: 'cmdb.object',
                    description: 'Namespace to use',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a record',
                        },
                        {
                            name: 'Read',
                            value: 'read',
                            description: 'Retrieve a record',
                        },
                        {
                            name: 'Update',
                            value: 'update',
                            description: 'Update a records',
                        },
                        {
                            name: 'Delete',
                            value: 'delete',
                            description: 'Delete a record',
                        },
                        {
                            name: 'Recycle',
                            value: 'recycle',
                            description: 'Recycle a record',
                        },
                        {
                            name: 'Archive',
                            value: 'archive',
                            description: 'Archive a record',
                        },
                    ],
                    default: 'read',
                    description: 'Operation to perform',
                    displayOptions: {
                        show: {
                            namespace: [
                                'cmdb.object',
                                'cmdb.category',
                            ],
                        },
                    },
                },
                {
                    displayName: 'Category',
                    name: 'category',
                    type: 'string',
                    displayOptions: {
                        show: {
                            namespace: [
                                'cmdb.category',
                            ],
                        },
                    },
                    default: '',
                    description: 'Category',
                },
                {
                    displayName: 'Id',
                    name: 'id',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: [
                                'read',
                                'update',
                            ],
                        },
                    },
                    default: '',
                    description: 'Id of Resource',
                },
            ],
        };
    }
    async execute() {
        let responseData;
        const namespace = this.getNodeParameter('namespace', 0);
        const operation = this.getNodeParameter('operation', 0);
        const credentials = await this.getCredentials('idoit');
        if (operation == 'delete') {
        }
        if (operation == 'update') {
        }
        if (operation == 'read') {
            if (namespace === 'cmdb.object') {
                const id = this.getNodeParameter('id', 0);
                const data = [{
                        'jsonrpc': '2.0',
                        'method': `${namespace}.read`,
                        'params': {
                            'id': id,
                            'apikey': `${credentials.apikey}`
                        },
                        'id': 1
                    }];
                const options = {
                    headers: {
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: data,
                    uri: `${credentials.host}`,
                    json: true,
                    rejectUnauthorized: false,
                };
                responseData = await this.helpers.request(options);
            }
            if (namespace === 'cmdb.category') {
                const id = this.getNodeParameter('id', 0);
                const category = this.getNodeParameter('category', 0);
                const data = [{
                        'jsonrpc': '2.0',
                        'method': `${namespace}.read`,
                        'params': {
                            'objID': id,
                            'category': `${category}`,
                            'apikey': `${credentials.apikey}`
                        },
                        'id': 1
                    }];
                const options = {
                    headers: {
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: data,
                    uri: `${credentials.host}`,
                    json: true,
                    rejectUnauthorized: false,
                };
                responseData = await this.helpers.request(options);
            }
        }
        if (operation == 'create') {
        }
        return [this.helpers.returnJsonArray(responseData)];
    }
}
exports.idoit = idoit;
//# sourceMappingURL=idoit.node.js.map