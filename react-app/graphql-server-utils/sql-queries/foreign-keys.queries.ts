/** Types generated for queries found in "graphql-server-utils/sql-queries/foreign-keys.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'GetForeignKeys' parameters type */
export type IGetForeignKeysParams = void;

/** 'GetForeignKeys' return type */
export interface IGetForeignKeysResult {
  table_schema: string | null;
  table_name: string | null;
  constraint_name: string | null;
  ref_table_table_schema: string | null;
  ref_table: string | null;
  column_mapping: Json | null;
  on_update: string | null;
  on_delete: string | null;
}

/** 'GetForeignKeys' query type */
export interface IGetForeignKeysQuery {
  params: IGetForeignKeysParams;
  result: IGetForeignKeysResult;
}

const getForeignKeysIR: any = {"name":"GetForeignKeys","params":[],"usedParamSet":{},"statement":{"body":"SELECT\n  q.table_schema::text AS table_schema,\n  q.table_name::text AS table_name,\n  q.constraint_name::text AS constraint_name,\n  min(q.ref_table_table_schema::text) AS ref_table_table_schema,\n  min(q.ref_table::text) AS ref_table,\n  json_object_agg(ac.attname, afc.attname) AS column_mapping,\n  min(q.confupdtype::text) AS on_update,\n  min(q.confdeltype::text) AS\n  on_delete\nFROM (\n  SELECT\n    ctn.nspname AS table_schema,\n    ct.relname AS table_name,\n    r.conrelid AS table_id,\n    r.conname AS constraint_name,\n    cftn.nspname AS ref_table_table_schema,\n    cft.relname AS ref_table,\n    r.confrelid AS ref_table_id,\n    r.confupdtype,\n    r.confdeltype,\n    unnest(r.conkey) AS column_id,\n    unnest(r.confkey) AS ref_column_id\n  FROM\n    pg_constraint r\n    JOIN pg_class ct ON r.conrelid = ct.oid\n    JOIN pg_namespace ctn ON ct.relnamespace = ctn.oid\n    JOIN pg_class cft ON r.confrelid = cft.oid\n    JOIN pg_namespace cftn ON cft.relnamespace = cftn.oid\nWHERE\n  r.contype = 'f'::\"char\"\n  ) q\n  JOIN pg_attribute ac ON q.column_id = ac.attnum\n    AND q.table_id = ac.attrelid\n  JOIN pg_attribute afc ON q.ref_column_id = afc.attnum\n    AND q.ref_table_id = afc.attrelid\n  GROUP BY\n    q.table_schema,\n    q.table_name,\n    q.constraint_name","loc":{"a":27,"b":1280,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   q.table_schema::text AS table_schema,
 *   q.table_name::text AS table_name,
 *   q.constraint_name::text AS constraint_name,
 *   min(q.ref_table_table_schema::text) AS ref_table_table_schema,
 *   min(q.ref_table::text) AS ref_table,
 *   json_object_agg(ac.attname, afc.attname) AS column_mapping,
 *   min(q.confupdtype::text) AS on_update,
 *   min(q.confdeltype::text) AS
 *   on_delete
 * FROM (
 *   SELECT
 *     ctn.nspname AS table_schema,
 *     ct.relname AS table_name,
 *     r.conrelid AS table_id,
 *     r.conname AS constraint_name,
 *     cftn.nspname AS ref_table_table_schema,
 *     cft.relname AS ref_table,
 *     r.confrelid AS ref_table_id,
 *     r.confupdtype,
 *     r.confdeltype,
 *     unnest(r.conkey) AS column_id,
 *     unnest(r.confkey) AS ref_column_id
 *   FROM
 *     pg_constraint r
 *     JOIN pg_class ct ON r.conrelid = ct.oid
 *     JOIN pg_namespace ctn ON ct.relnamespace = ctn.oid
 *     JOIN pg_class cft ON r.confrelid = cft.oid
 *     JOIN pg_namespace cftn ON cft.relnamespace = cftn.oid
 * WHERE
 *   r.contype = 'f'::"char"
 *   ) q
 *   JOIN pg_attribute ac ON q.column_id = ac.attnum
 *     AND q.table_id = ac.attrelid
 *   JOIN pg_attribute afc ON q.ref_column_id = afc.attnum
 *     AND q.ref_table_id = afc.attrelid
 *   GROUP BY
 *     q.table_schema,
 *     q.table_name,
 *     q.constraint_name
 * ```
 */
export const getForeignKeys = new PreparedQuery<IGetForeignKeysParams,IGetForeignKeysResult>(getForeignKeysIR);


