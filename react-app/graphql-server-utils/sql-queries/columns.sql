/* @name GetColumns */
select
    table_schema::text,
    table_name::text,
    column_name::text,
    column_default::text,
    is_nullable::text,
    data_type::text,
    udt_name::text,
    pg_catalog.col_description(
        format('%s.%s', col.table_schema, col.table_name)::regclass::oid,
        col.ordinal_position
    ) as comment
from
    information_schema.columns as col
where
    col.table_schema not in ('pg_catalog', 'information_schema', 'hdb_catalog');