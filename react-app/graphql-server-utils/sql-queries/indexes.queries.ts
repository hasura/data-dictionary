/** Types generated for queries found in "graphql-server-utils/sql-queries/indexes.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'GetIndexes' parameters type */
export type IGetIndexesParams = void;

/** 'GetIndexes' return type */
export interface IGetIndexesResult {
  user_name: string | null;
  table_schema: string | null;
  table_name: string | null;
  index_name: string | null;
  is_unique: string | null;
  is_primary: string | null;
  index_type: string | null;
  index_keys: Json | null;
  is_functional: boolean | null;
  is_partial: boolean | null;
}

/** 'GetIndexes' query type */
export interface IGetIndexesQuery {
  params: IGetIndexesParams;
  result: IGetIndexesResult;
}

const getIndexesIR: any = {"name":"GetIndexes","params":[],"usedParamSet":{},"statement":{"body":"SELECT\n  U.usename::text                AS user_name,\n  ns.nspname::text               AS table_schema,\n  idx.indrelid::regclass::text   AS table_name,\n  i.relname::text                AS index_name,\n  idx.indisunique::text          AS is_unique,\n  idx.indisprimary::text         AS is_primary,\n  am.amname::text                AS index_type,\n  ARRAY_TO_JSON(ARRAY(\n          SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE)\n          FROM\n            generate_subscripts(idx.indkey, 1) AS k\n          ORDER BY k\n      )) AS index_keys,\n  (idx.indexprs IS NOT NULL) OR (idx.indkey::int[] @> array[0]) AS is_functional,\n  idx.indpred IS NOT NULL AS is_partial\nFROM pg_index AS idx\n  JOIN pg_class AS i\n    ON i.oid = idx.indexrelid\n  JOIN pg_am AS am\n    ON i.relam = am.oid\n  JOIN pg_namespace AS NS ON i.relnamespace = NS.OID\n  JOIN pg_user AS U ON i.relowner = U.usesysid\nWHERE NOT nspname LIKE 'pg%'","loc":{"a":23,"b":927,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   U.usename::text                AS user_name,
 *   ns.nspname::text               AS table_schema,
 *   idx.indrelid::regclass::text   AS table_name,
 *   i.relname::text                AS index_name,
 *   idx.indisunique::text          AS is_unique,
 *   idx.indisprimary::text         AS is_primary,
 *   am.amname::text                AS index_type,
 *   ARRAY_TO_JSON(ARRAY(
 *           SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE)
 *           FROM
 *             generate_subscripts(idx.indkey, 1) AS k
 *           ORDER BY k
 *       )) AS index_keys,
 *   (idx.indexprs IS NOT NULL) OR (idx.indkey::int[] @> array[0]) AS is_functional,
 *   idx.indpred IS NOT NULL AS is_partial
 * FROM pg_index AS idx
 *   JOIN pg_class AS i
 *     ON i.oid = idx.indexrelid
 *   JOIN pg_am AS am
 *     ON i.relam = am.oid
 *   JOIN pg_namespace AS NS ON i.relnamespace = NS.OID
 *   JOIN pg_user AS U ON i.relowner = U.usesysid
 * WHERE NOT nspname LIKE 'pg%'
 * ```
 */
export const getIndexes = new PreparedQuery<IGetIndexesParams,IGetIndexesResult>(getIndexesIR);


