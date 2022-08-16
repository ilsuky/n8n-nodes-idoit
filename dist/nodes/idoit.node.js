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
                            name: 'CMDB Objects (List)',
                            value: 'cmdb.objects',
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
                            description: 'Mark a record as deleted',
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
                        {
                            name: 'Purge',
                            value: 'purge',
                            description: 'Delete a record from Database',
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
                                'cmdb.objects',
                            ],
                        },
                    },
                    default: 'no',
                    description: 'Category',
                },
                {
                    displayName: 'Object Type',
                    name: 'type',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getObjectTypes',
                    },
                    displayOptions: {
                        show: {
                            namespace: [
                                'cmdb.objects',
                            ],
                        },
                    },
                    default: '',
                    description: 'Object Type ex. Server or Switch',
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
                                'delete',
                                'archive',
                                'recycle',
                                'purge',
                            ],
                            namespace: [
                                'cmdb.object',
                                'cmdb.category',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Id of Resource',
                },
                {
                    displayName: 'Category entry Id',
                    name: 'cateid',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: [
                                'delete',
                                'archive',
                                'recycle',
                                'purge',
                            ],
                            namespace: [
                                'cmdb.category',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Entry identifier, for example: 3',
                },
                {
                    displayName: 'Search String',
                    name: 'searchstring',
                    type: 'string',
                    displayOptions: {
                        show: {
                            namespace: [
                                'idoit.search',
                                'cmdb.objects',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'ex. Search over all or Object title',
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
                                'cmdb.objects',
                            ],
                        },
                    },
                    default: true,
                    description: 'Retrieve and Split Data array into seperate Items',
                },
                {
                    displayName: 'Values to Set',
                    name: 'values',
                    placeholder: 'Add Value',
                    type: 'fixedCollection',
                    typeOptions: {
                        multipleValues: true,
                        sortable: true,
                    },
                    description: 'The value to set.',
                    default: {},
                    options: [
                        {
                            name: 'attributes',
                            displayName: 'Attributes',
                            values: [
                                {
                                    displayName: 'Name',
                                    name: 'name',
                                    type: 'string',
                                    default: '',
                                    description: 'Name of value to set',
                                },
                                {
                                    displayName: 'Value',
                                    name: 'value',
                                    type: 'string',
                                    default: '',
                                    description: 'Value to set.',
                                },
                            ],
                        },
                    ],
                    displayOptions: {
                        show: {
                            operation: [
                                'create',
                                'update',
                            ],
                            namespace: [
                                'cmdb.category',
                                'cmdb.objects',
                            ],
                        },
                    },
                },
            ],
        };
        this.methods = {
            loadOptions: {
                async getObjectTypes() {
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
                    const objecttypes = data.result.objectTypes;
                    for (const [key, value] of Object.entries(objecttypes)) {
                        const keyName = key;
                        const keyValue = value;
                        returnData.push({
                            name: keyValue,
                            value: keyName,
                        });
                    }
                    return returnData;
                },
                async getCategories() {
                    const returnData = [];
                    const credentials = await this.getCredentials('idoit');
                    returnData.push({
                        name: 'no Category',
                        value: 'no',
                    });
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
                if (operation == 'recycle' || operation == 'archive' || operation == 'purge') {
                    if (namespace === 'cmdb.object') {
                        const id = this.getNodeParameter('id', itemIndex, '');
                        item = items[itemIndex];
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.${operation}`,
                            'params': {
                                'object': id,
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
                        const cateid = this.getNodeParameter('cateid', itemIndex, '');
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.${operation}`,
                            'params': {
                                'object': id,
                                'category': `${category}`,
                                'entry': `${cateid}`,
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
                if (operation == 'delete') {
                    if (namespace === 'cmdb.object') {
                        const id = this.getNodeParameter('id', itemIndex, '');
                        item = items[itemIndex];
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.${operation}`,
                            'params': {
                                'id': id,
                                'status': 'C__RECORD_STATUS__DELETED',
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
                        const cateid = this.getNodeParameter('cateid', itemIndex, '');
                        item = items[itemIndex];
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.${operation}`,
                            'params': {
                                'objID': id,
                                'category': `${category}`,
                                'cateID': `${cateid}`,
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
                if (namespace === 'cmdb.objects') {
                    const type = this.getNodeParameter('type', itemIndex, '');
                    const category = this.getNodeParameter('category', itemIndex, '');
                    const searchstring = this.getNodeParameter('searchstring', itemIndex, '');
                    const split = this.getNodeParameter('split', itemIndex, '');
                    item = items[itemIndex];
                    if (category == 'no') {
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.read`,
                            'params': {
                                'filter': {
                                    'type': `${type}`,
                                    'title': `${searchstring}`
                                },
                                'order_by': 'title',
                                'sort': 'ASC',
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
                    else {
                        const rbody = {
                            'jsonrpc': '2.0',
                            'method': `${namespace}.read`,
                            'params': {
                                'filter': {
                                    'type': `${type}`,
                                    'title': `${searchstring}`
                                },
                                'categories': ['`${category}`'],
                                'order_by': 'title',
                                'sort': 'ASC',
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