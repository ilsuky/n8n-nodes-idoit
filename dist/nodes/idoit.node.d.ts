import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodeType, INodeTypeDescription, INodePropertyOptions } from 'n8n-workflow';
export declare class idoit implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getObjectTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
