import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	OptionsWithUri,
} from 'request';

import {
	IDataObject,
	ILoadOptionsFunctions,
	NodeApiError,
} from 'n8n-workflow';

export async function idoitRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	body: IDataObject = {},
) {
	const credentials = await this.getCredentials('idoit')  as IDataObject;
	const options: OptionsWithUri = {
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
	else{
		options.json = true;
	}

	try {
		return await this.helpers.request!(options);
	} catch (error:any) {
		throw new NodeApiError(this.getNode(), error);
	}
}