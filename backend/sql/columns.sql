select
    table_schema,
    table_name,
    column_name,
    column_default,
    is_nullable::bool,
    data_type,
    udt_name
from
    information_schema.columns
where
    columns.table_schema not in ('pg_catalog', 'information_schema', 'hdb_catalog')