import { IExecuteFunctions } from 'n8n-core';
import { ILoadOptionsFunctions, INodeExecutionData, INodeType, INodeTypeDescription, INodePropertyOptions } from 'n8n-workflow';
export declare class idoit implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
