/** Types generated for queries found in "graphql-server-utils/sql-queries/views.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetViews' parameters type */
export type IGetViewsParams = void;

/** 'GetViews' return type */
export interface IGetViewsResult {
  table_schema: string | null;
  table_name: string | null;
  comment: string | null;
}

/** 'GetViews' query type */
export interface IGetViewsQuery {
  params: IGetViewsParams;
  result: IGetViewsResult;
}

const getViewsIR: any = {"name":"GetViews","params":[],"usedParamSet":{},"statement":{"body":"select\n  t.table_schema::text,\n  t.table_name::text,\n  obj_description(pg_class.oid)::text as comment\nfrom\n  information_schema.tables t\n  inner join pg_class\n    on pg_class.relname = t.table_name\nwhere table_type = 'VIEW' \n      and t.table_schema not in ('information_schema', 'pg_catalog')\norder by table_schema,\n        table_name","loc":{"a":21,"b":355,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * select
 *   t.table_schema::text,
 *   t.table_name::text,
 *   obj_description(pg_class.oid)::text as comment
 * from
 *   information_schema.tables t
 *   inner join pg_class
 *     on pg_class.relname = t.table_name
 * where table_type = 'VIEW' 
 *       and t.table_schema not in ('information_schema', 'pg_catalog')
 * order by table_schema,
 *         table_name
 * ```
 */
export const getViews = new PreparedQuery<IGetViewsParams,IGetViewsResult>(getViewsIR);


