/* @name GetViews */
select
  t.table_schema::text,
  t.table_name::text,
  obj_description(pg_class.oid)::text as comment
from
  information_schema.tables t
  inner join pg_class
    on pg_class.relname = t.table_name
where table_type = 'VIEW' 
      and t.table_schema not in ('information_schema', 'pg_catalog')
order by table_schema,
        table_name;