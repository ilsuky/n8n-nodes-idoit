"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idoit = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class idoit {
    constructor() {
        this.description = {
            displayName: 'i-doit',
            name: 'i-doit',
            icon: 'file:idoit.png',
            group: ['transform'],
            version: 1,
            description: 'i-doit JSON-RPC API',
            defaults: {
                name: 'idoit',
                color: '#772244',
            },
            subtitle: '={{$parameter["namespace"]}}',
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
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getCategories',
                    },
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
                    displayName: 'Search String',
                    name: 'searchstring',
                    type: 'string',
                    displayOptions: {
                        show: {
                            namespace: [
                                'idoit.search',
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
                {
                    displayName: 'Retrieve and Split Data Items',
                    name: 'split',
                    type: 'boolean',
                    displayOptions: {
                        show: {
                            namespace: [
                                'idoit.search',
                            ],
                        },
                    },
                    default: true,
                    description: 'Retrieve and Split Data array into seperate Items',
                },
            ],
        };
        this.methods = {
            loadOptions: {
                async getCategories() {
                    const returnData = [];
                    const credentials = await this.getCredentials('idoit');
                    const rbody = {
                        'jsonrpc': '2.0',
                        'method': 'idoit.constants',
                        'params': {
                            'apikey': `${credentials.apikey}`
                        },
                        'id': 1
                    };
                    const data = await GenericFunctions_1.idoitRequest.call(this, rbody);
                    const globals = data.result.categories.g;
                    returnData.push({
                        name: '--- Global Categories ---',
                        value: '',
                    });
                    for (const [key, value] of Object.entries(globals)) {
                        const keyName = key;
                        const keyValue = value;
                        returnData.push({
                            name: keyValue,
                            value: keyName,
                        });
                    }
                    const specific = data.result.categories.s;
                    returnData.push({
                        name: '--- Specific Categories ---',
                        value: '',
                    });
                    for (const [key, value] of Object.entries(specific)) {
                        const keyName = key;
                        const keyValue = value;
                        returnData.push({
                            name: keyValue,
                            value: keyName,
                        });
                    }
                    const custom = data.result.categories.g_custom;
                    returnData.push({
                        name: '--- Custom Categories ---',
                        value: '',
                    });
                    for (const [key, value] of Object.entries(custom)) {
                        const keyName = key;
                        const keyValue = value;
                        returnData.push({
                            name: keyValue,
                            value: keyName,
                        });
                    }
                    return returnData;
                },
            },
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
                    if (namespace === 'cmdb.object') {
                        item = items[itemIndex];
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.create`,
                            'params': {
                                'type': 'C__OBJTYPE__SERVER',
                                'title': 'My little server',
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
                            'method': `${namespace}.create`,
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
                if (namespace == 'idoit.version' || namespace == 'idoit.constants') {
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
                if (namespace == 'idoit.search') {
                    const searchstring = this.getNodeParameter('searchstring', itemIndex, '');
                    const split = this.getNodeParameter('split', itemIndex, '');
                    const rbody = {
                        'jsonrpc': '2.0',
                        'method': `${namespace}`,
                        'params': {
                            'q': `${searchstring}`,
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
                    ;
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