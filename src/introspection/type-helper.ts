import { GraphQLOutputType, GraphQLObjectType } from 'graphql';
import { MockDataEntity } from '../model/data-source';
import { Field } from '../model/field';
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import * as GraphQLJSON from 'graphql-type-json';
import * as BigInt from 'graphql-bigint';
import { File, FileType, DateType } from './ex-graphql-type';
import { getRealType } from './common-handler';
import { RelationshipConfig } from '../model/relationship-config';

const MAX_INT = 2147483647;
const MIN_INT = -2147483648;

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
const isInteger = (value) => Number.isInteger(value) && value >= MIN_INT && value <= MAX_INT;
const isBitInt = (value) => !isInteger(value) && Number.isInteger(value);
const isBoolean = (value) => typeof value === 'boolean';
const isString = (value) => typeof value === 'string';
const isArray = (value) => Array.isArray(value);
const isDate = (value) => value instanceof Date;
const isFile = (value) => value && value.constructor === File;
const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

export const valuesAreNumeric = (values) => values.every(isNumeric);
export const valuesAreInteger = (values) => values.every(isInteger);
export const valuesAreBitInt = (values) => values.every(isBitInt);
export const valuesAreBoolean = (values) => values.every(isBoolean);
export const valuesAreString = (values) => values.every(isString);
export const valuesAreArray = (values) => values.every(isArray);
export const valuesAreDate = (values) => values.every(isDate);
export const valuesAreFile = (values) => values.every(isFile);
export const valuesAreObject = (values) => values.every(isObject);

export const requiredTypeOrNormal = (
    type: GraphQLOutputType,
    isRequired
): [GraphQLOutputType, boolean, boolean, boolean, boolean] => {
    const realType = getRealType(type),
        hasDate: boolean = realType == DateType,
        hasBigInt: boolean = realType == BigInt,
        hasJSON: boolean = realType == GraphQLJSON,
        hasFile: boolean = realType == FileType;
    return [isRequired ? new GraphQLNonNull(type) : type, hasDate, hasBigInt, hasJSON, hasFile];
};

export function getTypeFromValues(
    entityKey: string,
    fieldKey: string,
    values: any[],
    entityDataCount: number,
    relationshipConfig: RelationshipConfig,
    isId: boolean
): [GraphQLOutputType, boolean, boolean, boolean, boolean] {
    const isRequired = values.length == entityDataCount;
    if (isId || (relationshipConfig[entityKey] && relationshipConfig[entityKey][fieldKey])) {
        return requiredTypeOrNormal(GraphQLID, isRequired);
    }
    if (values.length > 0) {
        if (valuesAreArray(values)) {
            const leafValues = values.reduce((agg, arr) => {
                arr.forEach((value) => agg.push(value));
                return agg;
            }, []);
            if (valuesAreBoolean(leafValues)) {
                return requiredTypeOrNormal(new GraphQLList(GraphQLBoolean), isRequired);
            }
            if (valuesAreDate(leafValues)) {
                return requiredTypeOrNormal(new GraphQLList(DateType), isRequired);
            }
            if (valuesAreFile(leafValues)) {
                return requiredTypeOrNormal(new GraphQLList(FileType), isRequired);
            }
            if (valuesAreString(leafValues)) {
                return requiredTypeOrNormal(new GraphQLList(GraphQLString), isRequired);
            }
            if (valuesAreInteger(leafValues)) {
                return requiredTypeOrNormal(new GraphQLList(GraphQLInt), isRequired);
            }
            if (valuesAreBitInt(leafValues)) {
                return requiredTypeOrNormal(new GraphQLList(BigInt), isRequired);
            }
            if (valuesAreNumeric(leafValues)) {
                return requiredTypeOrNormal(new GraphQLList(GraphQLFloat), isRequired);
            }
            if (valuesAreObject(leafValues)) {
                return requiredTypeOrNormal(GraphQLJSON, isRequired);
            }
            return requiredTypeOrNormal(new GraphQLList(GraphQLString), isRequired); // FIXME introspect further
        }
        if (valuesAreBoolean(values)) {
            return requiredTypeOrNormal(GraphQLBoolean, isRequired);
        }
        if (valuesAreDate(values)) {
            return requiredTypeOrNormal(DateType, isRequired);
        }
        if (valuesAreFile(values)) {
            return requiredTypeOrNormal(FileType, isRequired);
        }
        if (valuesAreString(values)) {
            return requiredTypeOrNormal(GraphQLString, isRequired);
        }
        if (valuesAreInteger(values)) {
            return requiredTypeOrNormal(GraphQLInt, isRequired);
        }
        if (valuesAreBitInt(values)) {
            return requiredTypeOrNormal(BigInt, isRequired);
        }
        if (valuesAreNumeric(values)) {
            return requiredTypeOrNormal(GraphQLFloat, isRequired);
        }
        if (valuesAreObject(values)) {
            return requiredTypeOrNormal(GraphQLJSON, isRequired);
        }
    }
    return requiredTypeOrNormal(GraphQLString, isRequired); // FIXME introspect further
}
