import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, ILoadOptionsFunctions, INodeExecutionData, INodeParameters, INodeProperties, INodeType, INodeTypeDescription, NodeOperationError, INodePropertyOptions } from 'n8n-workflow';
import { idoitRequest } from './GenericFunctions';

export class idoit implements INodeType {
	description: INodeTypeDescription = {
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
						namespace:[
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
						namespace:[
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
						namespace:[
							'cmdb.objects',
							'cmdb.object',
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
						operation:[
							'read',
							'update',
							'delete',
							'archive',
							'recycle',
							'purge',
						],
						namespace:[
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
				displayName: 'Id',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation:[
							'create',
						],
						namespace:[
							'cmdb.category',
						],						
					},
				},
				default: '',
				required: true,
				description: 'Id of Object',
			},			
			{
				displayName: 'Category entry Id',
				name: 'cateid',
				type: 'string',
				displayOptions: {
					show: {
						operation:[
							'delete',
							'archive',
							'recycle',
							'purge',							
						],
						namespace:[
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
						namespace:[
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
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						operation:[
							'create',
							'update',
						],
						namespace:[
							'cmdb.object',
						],						
					},
				},
				default: '',
				required: true,
				description: 'Object title',
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
						operation:[
							'create',
							'update',
						],
						namespace:[
							'cmdb.category',
						],						
					},
				},
			},				
			{
				displayName: 'Retrieve and Split Data Items',
				name: 'split',
				type: 'boolean',
				displayOptions: {
					show: {
						operation:[
							'read',
						],
						namespace:[
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
						namespace:[
							'idoit.search',
							'cmdb.objects',
						],						
					},
				},
				default: true,
				description: 'Retrieve and Split Data array into seperate Items',
			},				
		],
	};

	methods = {
		loadOptions: {
			async getObjectTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('idoit') as IDataObject;
				const rbody =
					{
						'jsonrpc': '2.0',
						'method': 'idoit.constants',
						'params': {
							'apikey': `${credentials.apikey}`
						},
						'id': 1
					}
				const data = await idoitRequest.call(this, rbody);
				const objecttypes = data.result.objectTypes;
				
				for (const [key, value] of Object.entries(objecttypes)) {
					const keyName = key;
					const keyValue = value;
					returnData.push({
						//@ts-ignore
						name: keyValue + ' ('+keyName+')',
						value: keyName,
					});
				}
				return returnData;
			},
			
			async getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('idoit') as IDataObject;
				
				returnData.push({
					//@ts-ignore
					name: 'no Category',
					value: 'no',
				});
				
				const rbody =
					{
						'jsonrpc': '2.0',
						'method': 'idoit.constants',
						'params': {
							'apikey': `${credentials.apikey}`
						},
						'id': 1
					}
				const data = await idoitRequest.call(this, rbody);
				const globals = data.result.categories.g;
				
				returnData.push({
					//@ts-ignore
					name: '--- Global Categories ---',
					value: '',
				});
				for (const [key, value] of Object.entries(globals)) {
					const keyName = key;
					const keyValue = value;
					returnData.push({
						//@ts-ignore
						name: keyValue + ' ('+keyName+')',
						value: keyName,
					});
				}

				const specific = data.result.categories.s;
				
				returnData.push({
					//@ts-ignore
					name: '--- Specific Categories ---',
					value: '',
				});
				for (const [key, value] of Object.entries(specific)) {
					const keyName = key;
					const keyValue = value;
					returnData.push({
						//@ts-ignore
						name: keyValue + ' ('+keyName+')',
						value: keyName,
					});
				}				
				
				const custom = data.result.categories.g_custom;
				
				returnData.push({
					//@ts-ignore
					name: '--- Custom Categories ---',
					value: '',
				});
				for (const [key, value] of Object.entries(custom)) {
					const keyName = key;
					const keyValue = value;
					returnData.push({
						//@ts-ignore
						name: keyValue + ' ('+keyName+')',
						value: keyName,
					});
				}						
				
				return returnData;
			},
		},
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnItems: INodeExecutionData[] = [];
		let item: INodeExecutionData;
		
		const namespace = this.getNodeParameter('namespace',  0, '') as string;
		const operation = this.getNodeParameter('operation', 0, '') as string;
		
		const credentials = await this.getCredentials('idoit') as IDataObject;
		
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {

				//--------------------------------------------------------
				// 				Recycle / Archive / Purge
				//--------------------------------------------------------
				if(operation == 'recycle' || operation == 'archive' || operation == 'purge'){
					if (namespace === 'cmdb.object') {
						const id = this.getNodeParameter('id', itemIndex, '') as string;
						item = items[itemIndex];
					
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.${operation}`,
							'params': {
								'object': id,
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
						returnItems.push(newItem);												
					}
					if (namespace === 'cmdb.category') {
						const id = this.getNodeParameter('id', itemIndex, '') as string;
						const category = this.getNodeParameter('category', itemIndex, '') as string;
						const cateid = this.getNodeParameter('cateid', itemIndex, '') as string;	

						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.${operation}`,
							'params': {
								'object': id,
								'category': `${category}`,
								'entry': `${cateid}`,
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}


						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
						returnItems.push(newItem);							
					}
				}
				
				//--------------------------------------------------------
				// 				Delete
				//--------------------------------------------------------				
				if(operation == 'delete'){
					if (namespace === 'cmdb.object') {
						const id = this.getNodeParameter('id', itemIndex, '') as string;
						item = items[itemIndex];
					
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.${operation}`,
							'params': {
								'id': id,
								'status': 'C__RECORD_STATUS__DELETED',
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
						returnItems.push(newItem);												
					}
					
					if (namespace === 'cmdb.category') {
						const id = this.getNodeParameter('id', itemIndex, '') as string;
						const category = this.getNodeParameter('category', itemIndex, '') as string;
						const cateid = this.getNodeParameter('cateid', itemIndex, '') as string;
						
						item = items[itemIndex];
						
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.${operation}`,
							'params': {
								'objID': id,
								'category': `${category}`,
								'cateID': `${cateid}`,
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
						returnItems.push(newItem);						
					}
				}				
			
				//--------------------------------------------------------
				// 						Update
				//--------------------------------------------------------
				if(operation == 'update'){

				}				
				
				//--------------------------------------------------------
				// 						Read
				//--------------------------------------------------------
				if(operation == 'read'){
									
					if (namespace === 'cmdb.object') {
						const id = this.getNodeParameter('id', itemIndex, '') as string;
						item = items[itemIndex];
					
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.read`,
							'params': {
								'id': id,
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
						returnItems.push(newItem);						

					}
					
					if (namespace === 'cmdb.category') {
						const id = this.getNodeParameter('id', itemIndex, '') as string;
						const category = this.getNodeParameter('category', itemIndex, '') as string;
						const split = this.getNodeParameter('split', itemIndex, '') as boolean;
						
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.read`,
							'params': {
								'objID': id,
								'category': `${category}`,
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}
						
						const data = await idoitRequest.call(this, rbody);
						
						if(split){
							const datajson = data.result;
							for (let dataIndex = 0; dataIndex < datajson.length; dataIndex++) {
								const newItem: INodeExecutionData = {
									json: {},
									binary: {},
								};
								newItem.json = datajson[dataIndex];
		
								returnItems.push(newItem);
							}
						} else {
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							newItem.json = await idoitRequest.call(this, rbody);
		
							returnItems.push(newItem);
						}						
		
					}
				}

				//--------------------------------------------------------
				// 						Create
				//--------------------------------------------------------
				if(operation == 'create'){
					if (namespace === 'cmdb.object') {
						const type = this.getNodeParameter('type', itemIndex, '') as string;
						const title = this.getNodeParameter('title', itemIndex, '') as string;
											
						item = items[itemIndex];
					
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.create`,
							'params': {
								'type': `${type}`,
								'title': `${title}`,
								'purpose': 'production',
								'cmdb_status': 'C__CMDB_STATUS__IN_OPERATION',
								'description': 'created by n8n',
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
						returnItems.push(newItem);						

					}
					
					if (namespace === 'cmdb.category') {
						const id = this.getNodeParameter('id', itemIndex, '') as string;
						const category = this.getNodeParameter('category', itemIndex, '') as string;
						
						item = items[itemIndex];
						
						const attributesInput = this.getNodeParameter('values.attributes', itemIndex, []) as INodeParameters[];
						
						const data:IDataObject ={};
						for (let attributesIndex = 0; attributesIndex < attributesInput.length; attributesIndex++) {
							data[`${attributesInput[attributesIndex].name}`] = attributesInput[attributesIndex].value;
						};
						
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.create`,
							'params': {
								'objID': `${id}`,
								'category': `${category}`,
								data,
								'apikey': `${credentials.apikey}`
							},
							'id': 1
						}
															
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
						returnItems.push(newItem);						
		
					}
				}
				
				//--------------------------------------------------------
				// 						Show Version
				//--------------------------------------------------------
				if(namespace == 'idoit.version' || namespace == 'idoit.constants'){
					
					const rbody =
					{
						'jsonrpc': '2.0',
						'method': `${namespace}`,
						'params': {
							'apikey': `${credentials.apikey}`
						},
						'id': 1
					}
					
					const newItem: INodeExecutionData = {
						json: {},
						binary: {},
					};
					newItem.json = await idoitRequest.call(this, rbody);

					returnItems.push(newItem);						
				}

				//--------------------------------------------------------
				// 						Search Global
				//--------------------------------------------------------
				if(namespace == 'idoit.search'){
					
					const searchstring = this.getNodeParameter('searchstring', itemIndex, '') as string;
					const split = this.getNodeParameter('split', itemIndex, '') as boolean;
					
					const rbody =
					{
						'jsonrpc': '2.0',
						'method': `${namespace}`,
						'params': {
							'q': `${searchstring}`,
							'apikey': `${credentials.apikey}`
						},
						'id': 1
					}
					
					const data = await idoitRequest.call(this, rbody);
					
					if(split){
						const datajson = data.result;
						for (let dataIndex = 0; dataIndex < datajson.length; dataIndex++) {
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							newItem.json = datajson[dataIndex];
	
							returnItems.push(newItem);
						}
					} else {
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await idoitRequest.call(this, rbody);
	
						returnItems.push(newItem);
					};						
				}
				
				//--------------------------------------------------------
				// 						CMDB Objects
				//--------------------------------------------------------									
									
				if (namespace === 'cmdb.objects') {
					const type = this.getNodeParameter('type', itemIndex, '') as string;
					const category = this.getNodeParameter('category', itemIndex, '') as string;
					const searchstring = this.getNodeParameter('searchstring', itemIndex, '') as string;
					const split = this.getNodeParameter('split', itemIndex, '') as boolean;
					item = items[itemIndex];
								
					if(category == 'no'){
						const rbody =
						{
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
						}
						
						const data = await idoitRequest.call(this, rbody);
						
						if(split){
							const datajson = data.result;
							for (let dataIndex = 0; dataIndex < datajson.length; dataIndex++) {
								const newItem: INodeExecutionData = {
									json: {},
									binary: {},
								};
								newItem.json = datajson[dataIndex];
		
								returnItems.push(newItem);
							}
						} else {
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							newItem.json = await idoitRequest.call(this, rbody);
		
							returnItems.push(newItem);
						};		
					} else {
						const rbody =
						{
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
						}
						
						const data = await idoitRequest.call(this, rbody);
						
						if(split){
							const datajson = data.result;
							for (let dataIndex = 0; dataIndex < datajson.length; dataIndex++) {
								const newItem: INodeExecutionData = {
									json: {},
									binary: {},
								};
								newItem.json = datajson[dataIndex];
		
								returnItems.push(newItem);
							}
						} else {
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							newItem.json = await idoitRequest.call(this, rbody);
		
							returnItems.push(newItem);
						};		
							
					}		
				}					
				

			} catch (error:any) {
				if (this.continueOnFail()) {
					returnItems.push({json:{ error: error.message}});
					continue;
				}
				throw error;
			}			
		}
		
		return this.prepareOutputData(returnItems);
	}
}