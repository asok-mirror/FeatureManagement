/* tslint:disable */
/* eslint-disable */
/**
 * Unleash API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.11.0-beta.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    ConstraintSchema,
    ConstraintSchemaFromJSON,
    ConstraintSchemaFromJSONTyped,
    ConstraintSchemaToJSON,
} from './ConstraintSchema';

/**
 * 
 * @export
 * @interface FeatureStrategySchema
 */
export interface FeatureStrategySchema {
    /**
     * 
     * @type {string}
     * @memberof FeatureStrategySchema
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureStrategySchema
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof FeatureStrategySchema
     */
    createdAt?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof FeatureStrategySchema
     */
    featureName: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureStrategySchema
     */
    projectId?: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureStrategySchema
     */
    environment: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureStrategySchema
     */
    strategyName: string;
    /**
     * 
     * @type {number}
     * @memberof FeatureStrategySchema
     */
    sortOrder?: number;
    /**
     * 
     * @type {Array<ConstraintSchema>}
     * @memberof FeatureStrategySchema
     */
    constraints: Array<ConstraintSchema>;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof FeatureStrategySchema
     */
    parameters: { [key: string]: string; };
}

export function FeatureStrategySchemaFromJSON(json: any): FeatureStrategySchema {
    return FeatureStrategySchemaFromJSONTyped(json, false);
}

export function FeatureStrategySchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureStrategySchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (json['createdAt'] === null ? null : new Date(json['createdAt'])),
        'featureName': json['featureName'],
        'projectId': !exists(json, 'projectId') ? undefined : json['projectId'],
        'environment': json['environment'],
        'strategyName': json['strategyName'],
        'sortOrder': !exists(json, 'sortOrder') ? undefined : json['sortOrder'],
        'constraints': ((json['constraints'] as Array<any>).map(ConstraintSchemaFromJSON)),
        'parameters': json['parameters'],
    };
}

export function FeatureStrategySchemaToJSON(value?: FeatureStrategySchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt === null ? null : value.createdAt.toISOString().substr(0,10)),
        'featureName': value.featureName,
        'projectId': value.projectId,
        'environment': value.environment,
        'strategyName': value.strategyName,
        'sortOrder': value.sortOrder,
        'constraints': ((value.constraints as Array<any>).map(ConstraintSchemaToJSON)),
        'parameters': value.parameters,
    };
}

