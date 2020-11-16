/* @name GetIndexes */
SELECT
  U.usename::text                AS user_name,
  ns.nspname::text               AS table_schema,
  idx.indrelid::regclass::text   AS table_name,
  i.relname::text                AS index_name,
  idx.indisunique::text          AS is_unique,
  idx.indisprimary::text         AS is_primary,
  am.amname::text                AS index_type,
  ARRAY_TO_JSON(ARRAY(
          SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE)
          FROM
            generate_subscripts(idx.indkey, 1) AS k
          ORDER BY k
      )) AS index_keys,
  (idx.indexprs IS NOT NULL) OR (idx.indkey::int[] @> array[0]) AS is_functional,
  idx.indpred IS NOT NULL AS is_partial
FROM pg_index AS idx
  JOIN pg_class AS i
    ON i.oid = idx.indexrelid
  JOIN pg_am AS am
    ON i.relam = am.oid
  JOIN pg_namespace AS NS ON i.relnamespace = NS.OID
  JOIN pg_user AS U ON i.relowner = U.usesysid
WHERE NOT nspname LIKE 'pg%';