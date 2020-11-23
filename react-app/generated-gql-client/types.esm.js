export default {
    "scalars": [
        0,
        1,
        5,
        14,
        16,
        72,
        73
    ],
    "types": {
        "JSON": {},
        "JSONObject": {},
        "Query": {
            "metadata": [
                13
            ],
            "postgres": [
                3
            ],
            "__typename": [
                5
            ]
        },
        "Postgres": {
            "schemas": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "Schema": {
            "name": [
                5
            ],
            "tables": [
                8
            ],
            "views": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "String": {},
        "BelongsToTable": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "on_PostgresColumn": [
                9
            ],
            "on_PostgresIndex": [
                10
            ],
            "on_PostgresPrimaryKey": [
                11
            ],
            "on_PostgresForeignKey": [
                12
            ],
            "__typename": [
                5
            ]
        },
        "PostgresView": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "comment": [
                5
            ],
            "columns": [
                9
            ],
            "__typename": [
                5
            ]
        },
        "PostgresTable": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "comment": [
                5
            ],
            "columns": [
                9
            ],
            "primary_key": [
                11
            ],
            "foreign_keys": [
                12
            ],
            "indexes": [
                10
            ],
            "__typename": [
                5
            ]
        },
        "PostgresColumn": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "column_name": [
                5
            ],
            "column_default": [
                5
            ],
            "is_nullable": [
                5
            ],
            "data_type": [
                5
            ],
            "udt_name": [
                5
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "PostgresIndex": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "index_name": [
                5
            ],
            "index_type": [
                5
            ],
            "index_keys": [
                5
            ],
            "is_unique": [
                5
            ],
            "is_primary": [
                5
            ],
            "is_partial": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "PostgresPrimaryKey": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "constraint_name": [
                5
            ],
            "columns": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "PostgresForeignKey": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "constraint_name": [
                5
            ],
            "ref_table_table_schema": [
                5
            ],
            "ref_table": [
                5
            ],
            "column_mapping": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "HasuraMetadata": {
            "version": [
                14
            ],
            "tables": [
                15
            ],
            "actions": [
                18
            ],
            "custom_types": [
                53
            ],
            "functions": [
                62
            ],
            "remote_schemas": [
                64
            ],
            "query_collections": [
                66
            ],
            "allowlist": [
                69
            ],
            "cron_triggers": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "Int": {},
        "TableEntry": {
            "table": [
                17
            ],
            "is_enum": [
                16
            ],
            "configuration": [
                25
            ],
            "event_triggers": [
                27
            ],
            "computed_fields": [
                33
            ],
            "object_relationships": [
                36
            ],
            "array_relationships": [
                39
            ],
            "remote_relationships": [
                43
            ],
            "insert_permissions": [
                45
            ],
            "select_permissions": [
                47
            ],
            "update_permissions": [
                49
            ],
            "delete_permissions": [
                51
            ],
            "__typename": [
                5
            ]
        },
        "Boolean": {},
        "QualifiedTable": {
            "name": [
                5
            ],
            "schema": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "Action": {
            "name": [
                5
            ],
            "definition": [
                20
            ],
            "comment": [
                5
            ],
            "permissions": [
                19
            ],
            "__typename": [
                5
            ]
        },
        "ActionPermission": {
            "role": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ActionDefinition": {
            "arguments": [
                21
            ],
            "output_type": [
                5
            ],
            "kind": [
                5
            ],
            "headers": [
                24
            ],
            "forward_client_headers": [
                16
            ],
            "handler": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "InputArgument": {
            "name": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "HeaderFromEnv": {
            "name": [
                5
            ],
            "value_from_env": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "HeaderFromValue": {
            "name": [
                5
            ],
            "value": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "Header": {
            "on_HeaderFromEnv": [
                22
            ],
            "on_HeaderFromValue": [
                23
            ],
            "__typename": [
                5
            ]
        },
        "TableConfig": {
            "custom_root_fields": [
                26
            ],
            "custom_column_names": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "CustomRootFields": {
            "select": [
                5
            ],
            "select_by_pk": [
                5
            ],
            "select_aggregate": [
                5
            ],
            "insert": [
                5
            ],
            "insert_one": [
                5
            ],
            "update": [
                5
            ],
            "update_by_pk": [
                5
            ],
            "delete": [
                5
            ],
            "delete_by_pk": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "EventTrigger": {
            "name": [
                5
            ],
            "definition": [
                28
            ],
            "retry_conf": [
                32
            ],
            "webhook": [
                5
            ],
            "webhook_from_env": [
                5
            ],
            "headers": [
                24
            ],
            "__typename": [
                5
            ]
        },
        "EventTriggerDefinition": {
            "enable_manual": [
                16
            ],
            "insert": [
                29
            ],
            "delete": [
                29
            ],
            "update": [
                29
            ],
            "__typename": [
                5
            ]
        },
        "OperationSpec": {
            "on_OperationSpecAllColumns": [
                30
            ],
            "on_OperationSpecIndividualColumns": [
                31
            ],
            "__typename": [
                5
            ]
        },
        "OperationSpecAllColumns": {
            "columns": [
                5
            ],
            "payload": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "OperationSpecIndividualColumns": {
            "columns": [
                5
            ],
            "payload": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "RetryConf": {
            "num_retries": [
                14
            ],
            "interval_sec": [
                14
            ],
            "timeout_sec": [
                14
            ],
            "__typename": [
                5
            ]
        },
        "ComputedField": {
            "name": [
                5
            ],
            "definition": [
                35
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "QualifiedFunction": {
            "name": [
                5
            ],
            "schema": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ComputedFieldDefinition": {
            "function": [
                34
            ],
            "table_argument": [
                5
            ],
            "session_argument": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ObjectRelationship": {
            "name": [
                5
            ],
            "using": [
                37
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ObjRelUsing": {
            "foreign_key_constraint_on": [
                5
            ],
            "manual_configuration": [
                38
            ],
            "__typename": [
                5
            ]
        },
        "ObjRelUsingManualMapping": {
            "remote_table": [
                17
            ],
            "column_mapping": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "ArrayRelationship": {
            "name": [
                5
            ],
            "using": [
                40
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ArrRelUsing": {
            "foreign_key_constraint_on": [
                41
            ],
            "manual_configuration": [
                42
            ],
            "__typename": [
                5
            ]
        },
        "ArrRelUsingFKeyOn": {
            "column": [
                5
            ],
            "table": [
                17
            ],
            "__typename": [
                5
            ]
        },
        "ArrRelUsingManualMapping": {
            "remote_table": [
                17
            ],
            "column_mapping": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "RemoteRelationship": {
            "name": [
                5
            ],
            "definition": [
                44
            ],
            "__typename": [
                5
            ]
        },
        "RemoteRelationshipDef": {
            "hasura_fields": [
                5
            ],
            "remote_schema": [
                5
            ],
            "remote_field": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "InsertPermissionEntry": {
            "role": [
                5
            ],
            "permission": [
                46
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "InsertPermission": {
            "check": [
                1
            ],
            "set": [
                1
            ],
            "columns": [
                5
            ],
            "backend_only": [
                16
            ],
            "__typename": [
                5
            ]
        },
        "SelectPermissionEntry": {
            "role": [
                5
            ],
            "permission": [
                48
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "SelectPermission": {
            "columns": [
                5
            ],
            "computed_fields": [
                5
            ],
            "limit": [
                14
            ],
            "allow_aggregations": [
                16
            ],
            "filter": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "UpdatePermissionEntry": {
            "role": [
                5
            ],
            "permission": [
                50
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "UpdatePermission": {
            "check": [
                1
            ],
            "set": [
                1
            ],
            "columns": [
                5
            ],
            "filter": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "DeletePermissionEntry": {
            "role": [
                5
            ],
            "permission": [
                52
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "DeletePermission": {
            "filter": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "CustomTypes": {
            "input_objects": [
                54
            ],
            "objects": [
                56
            ],
            "scalars": [
                59
            ],
            "enums": [
                60
            ],
            "__typename": [
                5
            ]
        },
        "InputObjectType": {
            "name": [
                5
            ],
            "fields": [
                55
            ],
            "description": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "InputObjectField": {
            "name": [
                5
            ],
            "type": [
                5
            ],
            "description": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ObjectType": {
            "name": [
                5
            ],
            "fields": [
                57
            ],
            "relationships": [
                58
            ],
            "description": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ObjectField": {
            "name": [
                5
            ],
            "type": [
                5
            ],
            "description": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "CustomTypeObjectRelationship": {
            "name": [
                5
            ],
            "type": [
                5
            ],
            "remote_table": [
                17
            ],
            "field_mapping": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "ScalarType": {
            "name": [
                5
            ],
            "description": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "EnumType": {
            "name": [
                5
            ],
            "values": [
                61
            ],
            "description": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "EnumValue": {
            "value": [
                5
            ],
            "is_deprecated": [
                16
            ],
            "description": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "CustomFunction": {
            "function": [
                34
            ],
            "configuration": [
                63
            ],
            "__typename": [
                5
            ]
        },
        "FunctionConfiguration": {
            "session_argument": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "RemoteSchema": {
            "name": [
                5
            ],
            "definition": [
                65
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "RemoteSchemaDef": {
            "url": [
                5
            ],
            "url_from_env": [
                5
            ],
            "headers": [
                24
            ],
            "forward_client_headers": [
                16
            ],
            "timeout_seconds": [
                14
            ],
            "__typename": [
                5
            ]
        },
        "QueryCollectionEntry": {
            "name": [
                5
            ],
            "definition": [
                67
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "QueryCollectionDefinition": {
            "queries": [
                68
            ],
            "__typename": [
                5
            ]
        },
        "QueryCollection": {
            "name": [
                5
            ],
            "query": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "AllowList": {
            "collection": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "CronTrigger": {
            "name": [
                5
            ],
            "webhook": [
                5
            ],
            "schedule": [
                5
            ],
            "payload": [
                1
            ],
            "headers": [
                24
            ],
            "retry_conf": [
                71
            ],
            "include_in_metadata": [
                16
            ],
            "comment": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "RetryConfST": {
            "num_retries": [
                14
            ],
            "retry_interval_seconds": [
                14
            ],
            "timeout_seconds": [
                14
            ],
            "tolerance_seconds": [
                14
            ],
            "__typename": [
                5
            ]
        },
        "CacheControlScope": {},
        "Upload": {}
    }
}