/* @name GetTables */
SELECT
  c.oid::integer AS id,
  table_catalog::text AS catalog,
  table_schema::text,
  table_name::text,
  obj_description(c.oid)::text AS comment
FROM
  information_schema.tables
  JOIN pg_class c ON quote_ident(table_schema)::regnamespace = c.relnamespace
  AND c.relname = table_name
  LEFT JOIN pg_stat_user_tables ON pg_stat_user_tables.schemaname = tables.table_schema
  AND pg_stat_user_tables.relname = tables.table_name
WHERE
  table_type = 'BASE TABLE'
  AND table_schema not in ('hdb_catalog', 'pg_catalog', 'information_schema');