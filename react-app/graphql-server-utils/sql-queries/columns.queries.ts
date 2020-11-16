/** Types generated for queries found in "graphql-server-utils/sql-queries/columns.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetColumns' parameters type */
export type IGetColumnsParams = void;

/** 'GetColumns' return type */
export interface IGetColumnsResult {
  table_schema: string | null;
  table_name: string | null;
  column_name: string | null;
  column_default: string | null;
  is_nullable: string | null;
  data_type: string | null;
  udt_name: string | null;
  comment: string | null;
}

/** 'GetColumns' query type */
export interface IGetColumnsQuery {
  params: IGetColumnsParams;
  result: IGetColumnsResult;
}

const getColumnsIR: any = {"name":"GetColumns","params":[],"usedParamSet":{},"statement":{"body":"select\n    table_schema::text,\n    table_name::text,\n    column_name::text,\n    column_default::text,\n    is_nullable::text,\n    data_type::text,\n    udt_name::text,\n    pg_catalog.col_description(\n        format('%s.%s', col.table_schema, col.table_name)::regclass::oid,\n        col.ordinal_position\n    ) as comment\nfrom\n    information_schema.columns as col\nwhere\n    col.table_schema not in ('pg_catalog', 'information_schema', 'hdb_catalog')","loc":{"a":23,"b":468,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * select
 *     table_schema::text,
 *     table_name::text,
 *     column_name::text,
 *     column_default::text,
 *     is_nullable::text,
 *     data_type::text,
 *     udt_name::text,
 *     pg_catalog.col_description(
 *         format('%s.%s', col.table_schema, col.table_name)::regclass::oid,
 *         col.ordinal_position
 *     ) as comment
 * from
 *     information_schema.columns as col
 * where
 *     col.table_schema not in ('pg_catalog', 'information_schema', 'hdb_catalog')
 * ```
 */
export const getColumns = new PreparedQuery<IGetColumnsParams,IGetColumnsResult>(getColumnsIR);


