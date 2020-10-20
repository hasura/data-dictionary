export default {
    "scalars": [
        0,
        1,
        3,
        4,
        15,
        17
    ],
    "types": {
        "JSON": {},
        "JSONObject": {},
        "Query": {
            "metadata": [
                14
            ],
            "postgres": [
                5
            ],
            "random_words_totaling_kilobytes": [
                3,
                {
                    "kilobytes": [
                        4,
                        "Float!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "String": {},
        "Float": {},
        "Postgres": {
            "schemas": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "Schema": {
            "name": [
                3
            ],
            "tables": [
                9
            ],
            "views": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "BelongsToTable": {
            "table_schema": [
                3
            ],
            "table_name": [
                3
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
                3
            ]
        },
        "PostgresView": {
            "table_schema": [
                3
            ],
            "table_name": [
                3
            ],
            "comment": [
                3
            ],
            "columns": [
                10
            ],
            "__typename": [
                3
            ]
        },
        "PostgresTable": {
            "table_schema": [
                3
            ],
            "table_name": [
                3
            ],
            "comment": [
                3
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
            "indexes": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "PostgresColumn": {
            "table_schema": [
                3
            ],
            "table_name": [
                3
            ],
            "column_name": [
                3
            ],
            "column_default": [
                3
            ],
            "is_nullable": [
                3
            ],
            "data_type": [
                3
            ],
            "udt_name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PostgresIndex": {
            "table_schema": [
                3
            ],
            "table_name": [
                3
            ],
            "index_name": [
                3
            ],
            "index_type": [
                3
            ],
            "index_keys": [
                3
            ],
            "is_unique": [
                3
            ],
            "is_primary": [
                3
            ],
            "is_partial": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PostgresPrimaryKey": {
            "table_schema": [
                3
            ],
            "table_name": [
                3
            ],
            "constraint_name": [
                3
            ],
            "columns": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PostgresForeignKey": {
            "table_schema": [
                3
            ],
            "table_name": [
                3
            ],
            "constraint_name": [
                3
            ],
            "ref_table_table_schema": [
                3
            ],
            "ref_table": [
                3
            ],
            "column_mapping": [
                1
            ],
            "__typename": [
                3
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
                52
            ],
            "functions": [
                61
            ],
            "remote_schemas": [
                63
            ],
            "query_collections": [
                65
            ],
            "allowlist": [
                68
            ],
            "cron_triggers": [
                69
            ],
            "__typename": [
                3
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
                32
            ],
            "object_relationships": [
                35
            ],
            "array_relationships": [
                38
            ],
            "remote_relationships": [
                42
            ],
            "insert_permissions": [
                44
            ],
            "select_permissions": [
                46
            ],
            "update_permissions": [
                48
            ],
            "delete_permissions": [
                50
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {},
        "QualifiedTable": {
            "name": [
                3
            ],
            "schema": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Action": {
            "name": [
                3
            ],
            "definition": [
                21
            ],
            "comment": [
                3
            ],
            "permissions": [
                20
            ],
            "__typename": [
                3
            ]
        },
        "ActionPermission": {
            "role": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ActionDefinition": {
            "arguments": [
                22
            ],
            "output_type": [
                3
            ],
            "kind": [
                3
            ],
            "headers": [
                25
            ],
            "forward_client_headers": [
                17
            ],
            "handler": [
                3
            ],
            "type": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "InputArgument": {
            "name": [
                3
            ],
            "type": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "HeaderFromEnv": {
            "name": [
                3
            ],
            "value_from_env": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "HeaderFromValue": {
            "name": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
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
                3
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
                3
            ]
        },
        "CustomRootFields": {
            "select": [
                3
            ],
            "select_by_pk": [
                3
            ],
            "select_aggregate": [
                3
            ],
            "insert": [
                3
            ],
            "insert_one": [
                3
            ],
            "update": [
                3
            ],
            "update_by_pk": [
                3
            ],
            "delete": [
                3
            ],
            "delete_by_pk": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "EventTrigger": {
            "name": [
                3
            ],
            "definition": [
                29
            ],
            "retry_conf": [
                31
            ],
            "webhook": [
                3
            ],
            "webhook_from_env": [
                3
            ],
            "headers": [
                25
            ],
            "__typename": [
                3
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
                3
            ]
        },
        "OperationSpec": {
            "columns": [
                3
            ],
            "payload": [
                3
            ],
            "__typename": [
                3
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
                3
            ]
        },
        "ComputedField": {
            "name": [
                3
            ],
            "definition": [
                34
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "QualifiedFunction": {
            "name": [
                3
            ],
            "schema": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ComputedFieldDefinition": {
            "function": [
                33
            ],
            "table_argument": [
                3
            ],
            "session_argument": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ObjectRelationship": {
            "name": [
                3
            ],
            "using": [
                36
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ObjRelUsing": {
            "foreign_key_constraint_on": [
                3
            ],
            "manual_configuration": [
                37
            ],
            "__typename": [
                3
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
                3
            ]
        },
        "ArrayRelationship": {
            "name": [
                3
            ],
            "using": [
                39
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ArrRelUsing": {
            "foreign_key_constraint_on": [
                40
            ],
            "manual_configuration": [
                41
            ],
            "__typename": [
                3
            ]
        },
        "ArrRelUsingFKeyOn": {
            "column": [
                3
            ],
            "table": [
                18
            ],
            "__typename": [
                3
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
                3
            ]
        },
        "RemoteRelationship": {
            "name": [
                3
            ],
            "definition": [
                43
            ],
            "__typename": [
                3
            ]
        },
        "RemoteRelationshipDef": {
            "hasura_fields": [
                3
            ],
            "remote_schema": [
                3
            ],
            "remote_field": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "InsertPermissionEntry": {
            "role": [
                3
            ],
            "permission": [
                45
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
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
                3
            ],
            "backend_only": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "SelectPermissionEntry": {
            "role": [
                3
            ],
            "permission": [
                47
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "SelectPermission": {
            "columns": [
                3
            ],
            "computed_fields": [
                3
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
                3
            ]
        },
        "UpdatePermissionEntry": {
            "role": [
                3
            ],
            "permission": [
                49
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
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
                3
            ],
            "filter": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "DeletePermissionEntry": {
            "role": [
                3
            ],
            "permission": [
                51
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DeletePermission": {
            "filter": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "CustomTypes": {
            "input_objects": [
                53
            ],
            "objects": [
                55
            ],
            "scalars": [
                58
            ],
            "enums": [
                59
            ],
            "__typename": [
                3
            ]
        },
        "InputObjectType": {
            "name": [
                3
            ],
            "fields": [
                54
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "InputObjectField": {
            "name": [
                3
            ],
            "type": [
                3
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ObjectType": {
            "name": [
                3
            ],
            "fields": [
                56
            ],
            "relationships": [
                57
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ObjectField": {
            "name": [
                3
            ],
            "type": [
                3
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "CustomTypeObjectRelationship": {
            "name": [
                3
            ],
            "type": [
                3
            ],
            "remote_table": [
                18
            ],
            "field_mapping": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "ScalarType": {
            "name": [
                3
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "EnumType": {
            "name": [
                3
            ],
            "values": [
                60
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "EnumValue": {
            "value": [
                3
            ],
            "is_deprecated": [
                17
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "CustomFunction": {
            "function": [
                33
            ],
            "configuration": [
                62
            ],
            "__typename": [
                3
            ]
        },
        "FunctionConfiguration": {
            "session_argument": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "RemoteSchema": {
            "name": [
                3
            ],
            "definition": [
                64
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "RemoteSchemaDef": {
            "url": [
                3
            ],
            "url_from_env": [
                3
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
                3
            ]
        },
        "QueryCollectionEntry": {
            "name": [
                3
            ],
            "definition": [
                66
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "QueryCollectionDefinition": {
            "queries": [
                67
            ],
            "__typename": [
                3
            ]
        },
        "QueryCollection": {
            "name": [
                3
            ],
            "query": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "AllowList": {
            "collection": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "CronTrigger": {
            "name": [
                3
            ],
            "webhook": [
                3
            ],
            "schedule": [
                3
            ],
            "payload": [
                1
            ],
            "headers": [
                25
            ],
            "retry_conf": [
                70
            ],
            "include_in_metadata": [
                17
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
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
                3
            ]
        }
    }
}