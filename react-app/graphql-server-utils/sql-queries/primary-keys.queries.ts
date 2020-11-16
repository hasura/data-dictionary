/** Types generated for queries found in "graphql-server-utils/sql-queries/primary-keys.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'GetPrimaryKeys' parameters type */
export type IGetPrimaryKeysParams = void;

/** 'GetPrimaryKeys' return type */
export interface IGetPrimaryKeysResult {
  table_schema: string | null;
  table_name: string | null;
  constraint_name: string | null;
  columns: Json | null;
}

/** 'GetPrimaryKeys' query type */
export interface IGetPrimaryKeysQuery {
  params: IGetPrimaryKeysParams;
  result: IGetPrimaryKeysResult;
}

const getPrimaryKeysIR: any = {"name":"GetPrimaryKeys","params":[],"usedParamSet":{},"statement":{"body":"SELECT\n    tc.table_schema::text,\n    tc.table_name::text,\n    tc.constraint_name::text,\n    json_agg(constraint_column_usage.column_name) AS columns\nFROM\n    information_schema.table_constraints tc\nJOIN (\n  SELECT\n    x.tblschema AS table_schema,\n    x.tblname AS table_name,\n    x.colname AS column_name,\n    x.cstrname AS constraint_name\n  FROM ( SELECT DISTINCT\n      nr.nspname,\n      r.relname,\n      a.attname,\n      c.conname\n    FROM\n      pg_namespace nr,\n      pg_class r,\n      pg_attribute a,\n      pg_depend d,\n      pg_namespace nc,\n      pg_constraint c\n    WHERE\n      nr.oid = r.relnamespace\n      AND r.oid = a.attrelid\n      AND d.refclassid = 'pg_class'::regclass::oid\n      AND d.refobjid = r.oid\n      AND d.refobjsubid = a.attnum\n      AND d.classid = 'pg_constraint'::regclass::oid\n      AND d.objid = c.oid\n      AND c.connamespace = nc.oid\n      AND c.contype = 'c'::\"char\"\n      AND(r.relkind = ANY (ARRAY ['r'::\"char\", 'p'::\"char\"]))\n      AND NOT a.attisdropped\n    UNION ALL\n    SELECT\n      nr.nspname,\n      r.relname,\n      a.attname,\n      c.conname\n    FROM\n      pg_namespace nr,\n      pg_class r,\n      pg_attribute a,\n      pg_namespace nc,\n      pg_constraint c\n    WHERE\n      nr.oid = r.relnamespace\n      AND r.oid = a.attrelid\n      AND nc.oid = c.connamespace\n      AND r.oid = CASE c.contype\n      WHEN 'f'::\"char\" THEN\n        c.confrelid\n      ELSE\n        c.conrelid\n      END\n      AND(a.attnum = ANY (\n          CASE c.contype\n          WHEN 'f'::\"char\" THEN\n            c.confkey\n          ELSE\n            c.conkey\n          END))\n      AND NOT a.attisdropped\n      AND(c.contype = ANY (ARRAY ['p'::\"char\", 'u'::\"char\", 'f'::\"char\"]))\n      AND(r.relkind = ANY (ARRAY ['r'::\"char\", 'p'::\"char\"]))) x (tblschema, tblname, colname, cstrname)) constraint_column_usage ON tc.constraint_name::text = constraint_column_usage.constraint_name::text\n  AND tc.table_schema::text = constraint_column_usage.table_schema::text\n  AND tc.table_name::text = constraint_column_usage.table_name::text\n  AND tc.constraint_type::text = 'PRIMARY KEY'::text\nGROUP BY\n  tc.table_schema, tc.table_name, tc.constraint_name","loc":{"a":27,"b":2176,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     tc.table_schema::text,
 *     tc.table_name::text,
 *     tc.constraint_name::text,
 *     json_agg(constraint_column_usage.column_name) AS columns
 * FROM
 *     information_schema.table_constraints tc
 * JOIN (
 *   SELECT
 *     x.tblschema AS table_schema,
 *     x.tblname AS table_name,
 *     x.colname AS column_name,
 *     x.cstrname AS constraint_name
 *   FROM ( SELECT DISTINCT
 *       nr.nspname,
 *       r.relname,
 *       a.attname,
 *       c.conname
 *     FROM
 *       pg_namespace nr,
 *       pg_class r,
 *       pg_attribute a,
 *       pg_depend d,
 *       pg_namespace nc,
 *       pg_constraint c
 *     WHERE
 *       nr.oid = r.relnamespace
 *       AND r.oid = a.attrelid
 *       AND d.refclassid = 'pg_class'::regclass::oid
 *       AND d.refobjid = r.oid
 *       AND d.refobjsubid = a.attnum
 *       AND d.classid = 'pg_constraint'::regclass::oid
 *       AND d.objid = c.oid
 *       AND c.connamespace = nc.oid
 *       AND c.contype = 'c'::"char"
 *       AND(r.relkind = ANY (ARRAY ['r'::"char", 'p'::"char"]))
 *       AND NOT a.attisdropped
 *     UNION ALL
 *     SELECT
 *       nr.nspname,
 *       r.relname,
 *       a.attname,
 *       c.conname
 *     FROM
 *       pg_namespace nr,
 *       pg_class r,
 *       pg_attribute a,
 *       pg_namespace nc,
 *       pg_constraint c
 *     WHERE
 *       nr.oid = r.relnamespace
 *       AND r.oid = a.attrelid
 *       AND nc.oid = c.connamespace
 *       AND r.oid = CASE c.contype
 *       WHEN 'f'::"char" THEN
 *         c.confrelid
 *       ELSE
 *         c.conrelid
 *       END
 *       AND(a.attnum = ANY (
 *           CASE c.contype
 *           WHEN 'f'::"char" THEN
 *             c.confkey
 *           ELSE
 *             c.conkey
 *           END))
 *       AND NOT a.attisdropped
 *       AND(c.contype = ANY (ARRAY ['p'::"char", 'u'::"char", 'f'::"char"]))
 *       AND(r.relkind = ANY (ARRAY ['r'::"char", 'p'::"char"]))) x (tblschema, tblname, colname, cstrname)) constraint_column_usage ON tc.constraint_name::text = constraint_column_usage.constraint_name::text
 *   AND tc.table_schema::text = constraint_column_usage.table_schema::text
 *   AND tc.table_name::text = constraint_column_usage.table_name::text
 *   AND tc.constraint_type::text = 'PRIMARY KEY'::text
 * GROUP BY
 *   tc.table_schema, tc.table_name, tc.constraint_name
 * ```
 */
export const getPrimaryKeys = new PreparedQuery<IGetPrimaryKeysParams,IGetPrimaryKeysResult>(getPrimaryKeysIR);


