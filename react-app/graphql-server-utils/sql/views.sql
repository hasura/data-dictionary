select t.table_schema,
       t.table_name,
       obj_description(pg_class.oid) as comment
       from information_schema.tables t
    inner join pg_class
            on pg_class.relname = t.table_name
where table_type = 'VIEW' 
      and t.table_schema not in ('information_schema', 'pg_catalog')
order by table_schema,
         table_name;