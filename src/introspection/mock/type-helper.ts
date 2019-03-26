import { GraphQLOutputType, GraphQLObjectType } from 'graphql';
import { MockDataEntity } from '../../model/data-source';
import { Field } from '../../model/field';
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
import { File, FileType, DateType } from '../ex-graphql-type';
import { getRealType } from '../common-handler';

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
