import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class idoit implements ICredentialType {
	name = 'idoit';
	documentationUrl = 'https://kb.i-doit.com/pages/viewpage.action?pageId=7831613';
	displayName = 'i-doit';

	properties: INodeProperties[] = [
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
