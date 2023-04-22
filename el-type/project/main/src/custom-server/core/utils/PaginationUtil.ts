import { intersection, toNumber } from 'lodash';
import type { CustomModelStatic, OrderItem } from '../database';

export interface PaginationOptions {
  rpp?: number;
  page?: number;
  field?: string;
  order?: OrderItem[];
  where?: any;
  options?: object;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mergeOrder(entity: CustomModelStatic, orderBy: [[string, string]]) {
  // TODO Incompleto
  const allFieldsOfEntity = Object.keys(entity.getAttributes());
  // CASO REQUEST NÃO TENHA CAMPOS ESPECIFICOS, ORDENAR APENAS PELO ID
  if (!orderBy.length) {
    return [['id', 'ASC']];
  }
  // RETORNA CAMPOS DE ORDENAÇÃO VALIDOS
  const resultOrder = orderBy.filter(o => allFieldsOfEntity.includes(o[0]));
  if (resultOrder.length) {
    return orderBy.map(o => o);
  }
  // CASO REQUEST NÃO TENHA CAMPOS VALIDOS, ORDENAR APENAS PELO ID
  return [['id', 'ASC']];
}

function mergeFields(entity: CustomModelStatic, strFields: string) {
  const allFieldsOfEntity = Object.keys(entity.getAttributes());
  // CASO REQUEST NÃO TENHA CAMPOS ESPECIFICOS, PEGAR TODOS CAMPOS DA ENTIDADE
  if (!strFields.length) {
    return allFieldsOfEntity;
  }
  let fields: string[] = [];
  // SPLITA CAMPOS REQUISITADOS NA REQUEST
  if (strFields.length) {
    fields = strFields?.split(',');
  }
  // RETORNA CAMPOS SOLICITADOS QUE ESTEJAM NA ENTIDADE
  const resultFields = intersection(allFieldsOfEntity, fields);
  if (resultFields.length) {
    return resultFields;
  }
  // CASO NENHUM CAMPO SOLICITADO SEJA VALIDO RETORNAR TODOS
  return allFieldsOfEntity;
}

function getOffset(page: number, rpp: number): number {
  return page * rpp;
}

function getEndPosition(page: number, rpp: number, resultLength: number): number {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getWhere(cond: boolean, where: object) {
  // TODO Incompleto
  if (cond) {
    return {
      ...where,
    };
  }
  return {};
}

export function GetWhere(cond: boolean, where: any) {
  if (cond) {
    return {
      ...where,
    };
  }
  return {};
}

export async function PaginationUtil(
  entity: CustomModelStatic,
  { rpp = 10, page = 0, field = '', order = [], where = null, options }: PaginationOptions = {},
): Promise<any> {
  // TRANSFORMAR PARAMS EM NUMERO
  const actualPage = toNumber(page); // Query page
  const actualRpp = toNumber(rpp); // Query limit
  // OFFSET DA QUERY NO BANCO
  const offset: number = getOffset(actualPage, actualRpp);
  // CAMPOS REQUISITADOS NA QUERY
  const fields = mergeFields(entity, field);
  // QUERY NO BANCO
  const result = await entity.findAndCountAll({
    limit: actualRpp,
    where,
    order,
    attributes: fields,
    offset,
    ...options,
  });
  const count = result.count;
  // POSIÇÃO DO RESULTADO CONSIDERANDO OFFSET
  const endPosition: number = getEndPosition(actualPage, actualRpp, result.rows.length);
  // RESULTADO DA PAGINAÇÃO
  return {
    resultList: result.rows,
    count,
    rpp,
    page,
    endPosition,
    more: result.count > endPosition,
    maxPages: getMaxPages(count, rpp),
  };
}
