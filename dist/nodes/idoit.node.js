"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idoit = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
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
            subtitle: '={{$parameter["namespace"] + ": " + $parameter["operation"]}}',
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
                            namespace: [
                                'cmdb.object',
                                'cmdb.category',
                            ],
                        },
                    },
                    default: '',
                    description: 'Id of Resource',
                },
                {
                    displayName: 'Retrieve and Split Data Items',
                    name: 'split',
                    type: 'boolean',
                    displayOptions: {
                        show: {
                            operation: [
                                'read',
                            ],
                            namespace: [
                                'cmdb.category',
                            ],
                        },
                    },
                    default: true,
                    description: 'Retrieve and Split Data array into seperate Items',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnItems = [];
        let item;
        const namespace = this.getNodeParameter('namespace', 0, '');
        const operation = this.getNodeParameter('operation', 0, '');
        const credentials = await this.getCredentials('idoit');
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                if (operation == 'delete') {
                }
                if (operation == 'update') {
                }
                if (operation == 'read') {
                    if (namespace === 'cmdb.object') {
                        const id = this.getNodeParameter('id', itemIndex, '');
                        item = items[itemIndex];
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.read`,
                            'params': {
                                'id': id,
                                'apikey': `${credentials.apikey}`
                            },
                            'id': 1
                        };
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        newItem.json = await GenericFunctions_1.idoitRequest.call(this, rbody);
                        returnItems.push(newItem);
                    }
                    if (namespace === 'cmdb.category') {
                        const id = this.getNodeParameter('id', itemIndex, '');
                        const category = this.getNodeParameter('category', itemIndex, '');
                        const split = this.getNodeParameter('split', itemIndex, '');
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.read`,
                            'params': {
                                'objID': id,
                                'category': `${category}`,
                                'apikey': `${credentials.apikey}`
                            },
                            'id': 1
                        };
                        const data = await GenericFunctions_1.idoitRequest.call(this, rbody);
                        if (split) {
                            const datajson = data.result;
                            for (let dataIndex = 0; dataIndex < datajson.length; dataIndex++) {
                                const newItem = {
                                    json: {},
                                    binary: {},
                                };
                                newItem.json = datajson[dataIndex];
                                returnItems.push(newItem);
                            }
                        }
                        else {
                            const newItem = {
                                json: {},
                                binary: {},
                            };
                            newItem.json = await GenericFunctions_1.idoitRequest.call(this, rbody);
                            returnItems.push(newItem);
                        }
                    }
                }
                if (operation == 'create') {
                }
                if (namespace == 'idoit.version') {
                    const rbody = {
                        'jsonrpc': '2.0',
                        'method': `${namespace}`,
                        'params': {
                            'apikey': `${credentials.apikey}`
                        },
                        'id': 1
                    };
                    const newItem = {
                        json: {},
                        binary: {},
                    };
                    newItem.json = await GenericFunctions_1.idoitRequest.call(this, rbody);
                    returnItems.push(newItem);
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnItems.push({ json: { error: error.message } });
                    continue;
                }
                throw error;
            }
        }
        return this.prepareOutputData(returnItems);
    }
}
exports.idoit = idoit;
//# sourceMappingURL=idoit.node.js.map