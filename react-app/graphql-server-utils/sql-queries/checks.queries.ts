/** Types generated for queries found in "graphql-server-utils/sql-queries/checks.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetChecks' parameters type */
export type IGetChecksParams = void;

/** 'GetChecks' return type */
export interface IGetChecksResult {
  table_schema: string | null;
  table_name: string | null;
  constraint_name: string | null;
  column_name: string | null;
  definition: string | null;
}

/** 'GetChecks' query type */
export interface IGetChecksQuery {
  params: IGetChecksParams;
  result: IGetChecksResult;
}

const getChecksIR: any = {"name":"GetChecks","params":[],"usedParamSet":{},"statement":{"body":"SELECT\n  q.table_schema::text AS table_schema,\n  q.table_name::text AS table_name,\n  q.constraint_name::text AS constraint_name,\n  min(ac.attname) AS column_name,\n  min(q.definition::text) AS definition\n  \nFROM (\n  SELECT\n    ctn.nspname AS table_schema,\n    ct.relname AS table_name,\n    r.conrelid AS table_id,\n    r.conname AS constraint_name,\n    unnest(r.conkey) AS column_id,\n    pg_get_constraintdef(r.oid, true) AS definition\n  FROM\n    pg_constraint r\n    JOIN pg_class ct ON r.conrelid = ct.oid\n    JOIN pg_namespace ctn ON ct.relnamespace = ctn.oid\nWHERE\n  r.contype = 'c'::\"char\"\n  ) q\n  JOIN pg_attribute ac ON q.column_id = ac.attnum\n    AND q.table_id = ac.attrelid\n  GROUP BY\n    q.table_schema,\n    q.table_name,\n    q.constraint_name","loc":{"a":22,"b":772,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   q.table_schema::text AS table_schema,
 *   q.table_name::text AS table_name,
 *   q.constraint_name::text AS constraint_name,
 *   min(ac.attname) AS column_name,
 *   min(q.definition::text) AS definition
 *   
 * FROM (
 *   SELECT
 *     ctn.nspname AS table_schema,
 *     ct.relname AS table_name,
 *     r.conrelid AS table_id,
 *     r.conname AS constraint_name,
 *     unnest(r.conkey) AS column_id,
 *     pg_get_constraintdef(r.oid, true) AS definition
 *   FROM
 *     pg_constraint r
 *     JOIN pg_class ct ON r.conrelid = ct.oid
 *     JOIN pg_namespace ctn ON ct.relnamespace = ctn.oid
 * WHERE
 *   r.contype = 'c'::"char"
 *   ) q
 *   JOIN pg_attribute ac ON q.column_id = ac.attnum
 *     AND q.table_id = ac.attrelid
 *   GROUP BY
 *     q.table_schema,
 *     q.table_name,
 *     q.constraint_name
 * ```
 */
export const getChecks = new PreparedQuery<IGetChecksParams,IGetChecksResult>(getChecksIR);


