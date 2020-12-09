/* @name GetChecks */
SELECT
  q.table_schema::text AS table_schema,
  q.table_name::text AS table_name,
  q.constraint_name::text AS constraint_name,
  min(ac.attname) AS column_name,
  min(q.definition::text) AS definition
  
FROM (
  SELECT
    ctn.nspname AS table_schema,
    ct.relname AS table_name,
    r.conrelid AS table_id,
    r.conname AS constraint_name,
    unnest(r.conkey) AS column_id,
    pg_get_constraintdef(r.oid, true) AS definition
  FROM
    pg_constraint r
    JOIN pg_class ct ON r.conrelid = ct.oid
    JOIN pg_namespace ctn ON ct.relnamespace = ctn.oid
WHERE
  r.contype = 'c'::"char"
  ) q
  JOIN pg_attribute ac ON q.column_id = ac.attnum
    AND q.table_id = ac.attrelid
  GROUP BY
    q.table_schema,
    q.table_name,
    q.constraint_name;