export default {
    "scalars": [
        0,
        1,
        5,
        15,
        17,
        73,
        74
    ],
    "types": {
        "JSON": {},
        "JSONObject": {},
        "Query": {
            "metadata": [
                14
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
            "on_PostgresCheck": [
                9
            ],
            "on_PostgresColumn": [
                10
            ],
            "on_PostgresIndex": [
                11
            ],
            "on_PostgresPrimaryKey": [
                12
            ],
            "on_PostgresForeignKey": [
                13
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
                10
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
                10
            ],
            "primary_key": [
                12
            ],
            "foreign_keys": [
                13
            ],
            "checks": [
                9
            ],
            "indexes": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "PostgresCheck": {
            "table_schema": [
                5
            ],
            "table_name": [
                5
            ],
            "constraint_name": [
                5
            ],
            "column_name": [
                5
            ],
            "definition": [
                5
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
                15
            ],
            "tables": [
                16
            ],
            "actions": [
                19
            ],
            "custom_types": [
                54
            ],
            "functions": [
                63
            ],
            "remote_schemas": [
                65
            ],
            "query_collections": [
                67
            ],
            "allowlist": [
                70
            ],
            "cron_triggers": [
                71
            ],
            "__typename": [
                5
            ]
        },
        "Int": {},
        "TableEntry": {
            "table": [
                18
            ],
            "is_enum": [
                17
            ],
            "configuration": [
                26
            ],
            "event_triggers": [
                28
            ],
            "computed_fields": [
                34
            ],
            "object_relationships": [
                37
            ],
            "array_relationships": [
                40
            ],
            "remote_relationships": [
                44
            ],
            "insert_permissions": [
                46
            ],
            "select_permissions": [
                48
            ],
            "update_permissions": [
                50
            ],
            "delete_permissions": [
                52
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
                21
            ],
            "comment": [
                5
            ],
            "permissions": [
                20
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
                22
            ],
            "output_type": [
                5
            ],
            "kind": [
                5
            ],
            "headers": [
                25
            ],
            "forward_client_headers": [
                17
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
                23
            ],
            "on_HeaderFromValue": [
                24
            ],
            "__typename": [
                5
            ]
        },
        "TableConfig": {
            "custom_root_fields": [
                27
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
                29
            ],
            "retry_conf": [
                33
            ],
            "webhook": [
                5
            ],
            "webhook_from_env": [
                5
            ],
            "headers": [
                25
            ],
            "__typename": [
                5
            ]
        },
        "EventTriggerDefinition": {
            "enable_manual": [
                17
            ],
            "insert": [
                30
            ],
            "delete": [
                30
            ],
            "update": [
                30
            ],
            "__typename": [
                5
            ]
        },
        "OperationSpec": {
            "on_OperationSpecAllColumns": [
                31
            ],
            "on_OperationSpecIndividualColumns": [
                32
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
                15
            ],
            "interval_sec": [
                15
            ],
            "timeout_sec": [
                15
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
                36
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
                35
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
                38
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
                39
            ],
            "__typename": [
                5
            ]
        },
        "ObjRelUsingManualMapping": {
            "remote_table": [
                18
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
                41
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
                42
            ],
            "manual_configuration": [
                43
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
                18
            ],
            "__typename": [
                5
            ]
        },
        "ArrRelUsingManualMapping": {
            "remote_table": [
                18
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
                45
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
                47
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
                17
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
                49
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
                15
            ],
            "allow_aggregations": [
                17
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
                51
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
                53
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
                55
            ],
            "objects": [
                57
            ],
            "scalars": [
                60
            ],
            "enums": [
                61
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
                56
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
                58
            ],
            "relationships": [
                59
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
                18
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
                62
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
                17
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
                35
            ],
            "configuration": [
                64
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
                66
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
                25
            ],
            "forward_client_headers": [
                17
            ],
            "timeout_seconds": [
                15
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
                68
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
                69
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
                25
            ],
            "retry_conf": [
                72
            ],
            "include_in_metadata": [
                17
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
                15
            ],
            "retry_interval_seconds": [
                15
            ],
            "timeout_seconds": [
                15
            ],
            "tolerance_seconds": [
                15
            ],
            "__typename": [
                5
            ]
        },
        "CacheControlScope": {},
        "Upload": {}
    }
}