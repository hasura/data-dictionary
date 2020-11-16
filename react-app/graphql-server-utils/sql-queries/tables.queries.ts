/** Types generated for queries found in "graphql-server-utils/sql-queries/tables.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetTables' parameters type */
export type IGetTablesParams = void;

/** 'GetTables' return type */
export interface IGetTablesResult {
  id: number | null;
  catalog: string | null;
  table_schema: string | null;
  table_name: string | null;
  comment: string | null;
}

/** 'GetTables' query type */
export interface IGetTablesQuery {
  params: IGetTablesParams;
  result: IGetTablesResult;
}

const getTablesIR: any = {"name":"GetTables","params":[],"usedParamSet":{},"statement":{"body":"SELECT\n  c.oid::integer AS id,\n  table_catalog::text AS catalog,\n  table_schema::text,\n  table_name::text,\n  obj_description(c.oid)::text AS comment\nFROM\n  information_schema.tables\n  JOIN pg_class c ON quote_ident(table_schema)::regnamespace = c.relnamespace\n  AND c.relname = table_name\n  LEFT JOIN pg_stat_user_tables ON pg_stat_user_tables.schemaname = tables.table_schema\n  AND pg_stat_user_tables.relname = tables.table_name\nWHERE\n  table_type = 'BASE TABLE'\n  AND table_schema not in ('hdb_catalog', 'pg_catalog', 'information_schema')","loc":{"a":22,"b":563,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   c.oid::integer AS id,
 *   table_catalog::text AS catalog,
 *   table_schema::text,
 *   table_name::text,
 *   obj_description(c.oid)::text AS comment
 * FROM
 *   information_schema.tables
 *   JOIN pg_class c ON quote_ident(table_schema)::regnamespace = c.relnamespace
 *   AND c.relname = table_name
 *   LEFT JOIN pg_stat_user_tables ON pg_stat_user_tables.schemaname = tables.table_schema
 *   AND pg_stat_user_tables.relname = tables.table_name
 * WHERE
 *   table_type = 'BASE TABLE'
 *   AND table_schema not in ('hdb_catalog', 'pg_catalog', 'information_schema')
 * ```
 */
export const getTables = new PreparedQuery<IGetTablesParams,IGetTablesResult>(getTablesIR);


