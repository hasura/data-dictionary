select
    table_schema,
    table_name,
    column_name,
    column_default,
    is_nullable::bool,
    data_type,
    udt_name,
    pg_catalog.col_description(
        format('%s.%s', col.table_schema, col.table_name)::regclass::oid,
        col.ordinal_position
    ) as comment
from
    information_schema.columns as col
where
    col.table_schema not in ('pg_catalog', 'information_schema', 'hdb_catalog')