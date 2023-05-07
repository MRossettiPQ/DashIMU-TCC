import { intersection, toNumber } from 'lodash';
import { CustomModelStatic, OrderItem } from '../index';

export interface PaginationOptions {
  rpp?: number;
  page?: number;
  field?: string;
  order?: OrderItem[];
  where?: any;
  options?: object;
}

function mergeOrder(entity: CustomModelStatic, orderBy: [[string, string]]) {
  // TODO Incompleto
  const allFieldsOfEntity = Object.keys(entity.getAttributes());
  // IF REQUEST DOES NOT HAVE SPECIFIC FIELDS, ORDER BY ID ONLY
  if (!orderBy.length) {
    return [['id', 'ASC']];
  }
  // RETURNS VALID ORDERING FIELDS
  const resultOrder = orderBy.filter((o) => allFieldsOfEntity.includes(o[0]));
  if (resultOrder.length) {
    return orderBy.map((o) => o);
  }
  // IF REQUEST DOES NOT HAVE VALID FIELDS, ORDER ONLY BY ID
  return [['id', 'ASC']];
}

function mergeFields(entity: CustomModelStatic, strFields: string) {
  const allFieldsOfEntity = Object.keys(entity.getAttributes());
  // IF REQUEST DOES NOT HAVE SPECIFIC FIELDS, GET ALL ENTITY FIELDS
  if (!strFields.length) {
    return allFieldsOfEntity;
  }
  let fields: string[] = [];
  // SPLIT REQUIRED FIELDS IN THE REQUEST
  if (strFields.length) {
    fields = strFields?.split(',');
  }
  // RETURNS REQUESTED FIELDS THAT ARE IN THE ENTITY
  const resultFields = intersection(allFieldsOfEntity, fields);
  if (resultFields.length) {
    return resultFields;
  }
  // IF NO FIELD REQUESTED IS VALID, RETURN ALL
  return allFieldsOfEntity;
}

function getOffset(page: number, rpp: number): number {
  return page * rpp;
}

function getEndPosition(
  page: number,
  rpp: number,
  resultLength: number
): number {
  if (page > 0) {
    return page * rpp + resultLength;
  }
  return resultLength;
}

function getMaxPages(count: number, rpp: number) {
  const maxPages = count / rpp;
  if (maxPages <= 1) {
    return count / rpp;
  }
  return Math.ceil(maxPages);
}

function getWhere(cond: boolean, where: object) {
  // TODO Incompleto
  if (cond) {
    return {
      ...where
    };
  }
  return {};
}

export function GetWhere(cond: boolean, where: any) {
  if (cond) {
    return {
      ...where
    };
  }
  return {};
}

export async function PaginationUtil(
  entity: CustomModelStatic,
  {
    rpp = 10,
    page = 0,
    field = '',
    order = [],
    where = null,
    options
  }: PaginationOptions = {}
): Promise<Pagination> {
  // TRANSFORM PARAMS INTO NUMBER
  const actualPage = toNumber(page); // Query page
  const actualRpp = toNumber(rpp); // Query limit
  // QUERY OFFSET IN THE BANK
  const offset: number = getOffset(actualPage, actualRpp);
  // FIELDS REQUIRED IN THE QUERY
  const fields = mergeFields(entity, field);
  // QUERY IN THE BANK
  const result = await entity.findAndCountAll({
    limit: actualRpp,
    where,
    order,
    attributes: fields,
    offset,
    ...options
  });
  const count = result.count;
  // RESULT POSITION CONSIDERING OFFSET
  const endPosition: number = getEndPosition(
    actualPage,
    actualRpp,
    result.rows.length
  );
  // PAGINATION RESULT
  return {
    resultList: result.rows,
    count,
    rpp,
    page,
    endPosition,
    more: result.count > endPosition,
    maxPages: getMaxPages(count, rpp)
  };
}

export interface Pagination {
  resultList: any[];
  count: number;
  rpp: number;
  page: number;
  endPosition: number;
  maxPages: number;
  more: boolean;
}
