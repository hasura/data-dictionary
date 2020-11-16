/* @name GetForeignKeys */
SELECT
  q.table_schema::text AS table_schema,
  q.table_name::text AS table_name,
  q.constraint_name::text AS constraint_name,
  min(q.ref_table_table_schema::text) AS ref_table_table_schema,
  min(q.ref_table::text) AS ref_table,
  json_object_agg(ac.attname, afc.attname) AS column_mapping,
  min(q.confupdtype::text) AS on_update,
  min(q.confdeltype::text) AS
  on_delete
FROM (
  SELECT
    ctn.nspname AS table_schema,
    ct.relname AS table_name,
    r.conrelid AS table_id,
    r.conname AS constraint_name,
    cftn.nspname AS ref_table_table_schema,
    cft.relname AS ref_table,
    r.confrelid AS ref_table_id,
    r.confupdtype,
    r.confdeltype,
    unnest(r.conkey) AS column_id,
    unnest(r.confkey) AS ref_column_id
  FROM
    pg_constraint r
    JOIN pg_class ct ON r.conrelid = ct.oid
    JOIN pg_namespace ctn ON ct.relnamespace = ctn.oid
    JOIN pg_class cft ON r.confrelid = cft.oid
    JOIN pg_namespace cftn ON cft.relnamespace = cftn.oid
WHERE
  r.contype = 'f'::"char"
  ) q
  JOIN pg_attribute ac ON q.column_id = ac.attnum
    AND q.table_id = ac.attrelid
  JOIN pg_attribute afc ON q.ref_column_id = afc.attnum
    AND q.ref_table_id = afc.attrelid
  GROUP BY
    q.table_schema,
    q.table_name,
    q.constraint_name;