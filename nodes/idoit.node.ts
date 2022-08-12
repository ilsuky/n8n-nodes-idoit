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
						],
					},
				},
				default: '',
				description: 'Category',							
			},
//			{
//				displayName: 'Category',
//				name: 'category',
//				type: 'string',
//				displayOptions: {
//					show: {
//						namespace:[
//							'cmdb.category',
//						],
//					},
//				},
//				default: '',
//				description: 'Category',				
//			},			
			{
				displayName: 'Id',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation:[
							'read',
							'update',
						],
						namespace:[
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
						namespace:[
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
			// Get all the available streams to display them to user so that he can
			// select them easily
			async getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
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
				const streams = data.result.categories.g;
				
				for (const [key, value] of Object.entries(streams)) {
					const keyName = key;
					const keyValue = value;
					returnData.push({
						//@ts-ignore
						name: keyValue,
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
				// 						Delete
				//--------------------------------------------------------
				if(operation == 'delete'){

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

						item = items[itemIndex];
					
						const rbody =
						{
							'jsonrpc': '2.0',
							'method': `${namespace}.create`,
							'params': {
								'type': 'C__OBJTYPE__SERVER',
								'title': 'My little server',
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
							'method': `${namespace}.create`,
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