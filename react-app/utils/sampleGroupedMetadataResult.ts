import { GroupedMetadataAndPostgresTables } from "../store/utils"

export const sampleGroupedMetadataAndPostgresTables = ({
  actors: {
    array_relationships: null,
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "actors",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "actors",
          column_name: "first_name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "actors",
          column_name: "last_name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "actors",
          column_name: "last_update",
          column_default: "now()",
          is_nullable: "f",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "actors",
          column_name: "id",
          column_default: "nextval('actors_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "actors",
          index_name: "idx_actors_last_name",
          index_type: "btree",
          index_keys: ["last_name"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "actors",
          index_name: "actors_pkey",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "actors",
        constraint_name: "actors_pkey",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "actors",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  albums: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "tracks",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "album_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "tracks",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: [
      {
        using: {
          foreign_key_constraint_on: "artist_id",
          manual_configuration: null
        },
        name: "artist",
        comment: null,
        __typename: "ObjectRelationship"
      }
    ],
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "albums",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "albums",
          column_name: "title",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "albums",
          column_name: "artist_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "albums",
          column_name: "id",
          column_default: "nextval('albums_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [
        {
          table_schema: "public",
          table_name: "albums",
          constraint_name: "fk_album_artist_id",
          ref_table_table_schema: "public",
          ref_table: "artists",
          column_mapping: {
            artist_id: "id"
          },
          __typename: "PostgresForeignKey"
        }
      ],
      indexes: [
        {
          table_schema: "public",
          table_name: "albums",
          index_name: "pk_albums",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "albums",
          index_name: "ifk_album_artist_id",
          index_type: "btree",
          index_keys: ["artist_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "albums",
        constraint_name: "pk_albums",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "albums",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  artists: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "albums",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "artist_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "albums",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "artists",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "artists",
          column_name: "id",
          column_default: "nextval('artists_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "artists",
          column_name: "name",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "artists",
          index_name: "pk_artists",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "artists",
        constraint_name: "pk_artists",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "artists",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  categories: {
    array_relationships: null,
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "categories",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "categories",
          column_name: "name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "categories",
          column_name: "last_update",
          column_default: "now()",
          is_nullable: "f",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "categories",
          column_name: "id",
          column_default: "nextval('categories_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "categories",
          index_name: "categories_pkey",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "categories",
        constraint_name: "categories_pkey",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "categories",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  customers: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "invoices",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "customer_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "invoices",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: [
      {
        using: {
          foreign_key_constraint_on: "support_rep_id",
          manual_configuration: null
        },
        name: "employee",
        comment: null,
        __typename: "ObjectRelationship"
      }
    ],
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "customers",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "city",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "country",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "last_name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "state",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "postal_code",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "company",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "id",
          column_default: "nextval('customers_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "fax",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "first_name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "email",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "phone",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "address",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "customers",
          column_name: "support_rep_id",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [
        {
          table_schema: "public",
          table_name: "customers",
          constraint_name: "fk_customer_support_rep_id",
          ref_table_table_schema: "public",
          ref_table: "employees",
          column_mapping: {
            support_rep_id: "id"
          },
          __typename: "PostgresForeignKey"
        }
      ],
      indexes: [
        {
          table_schema: "public",
          table_name: "customers",
          index_name: "pk_customers",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "customers",
          index_name: "ifk_customer_support_rep_id",
          index_type: "btree",
          index_keys: ["support_rep_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "customers",
        constraint_name: "pk_customers",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "customers",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  employees: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "customers",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "support_rep_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "customers",
        comment: null,
        __typename: "ArrayRelationship"
      },
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "employees",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "reports_to",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "employees",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: [
      {
        using: {
          foreign_key_constraint_on: "reports_to",
          manual_configuration: null
        },
        name: "employee",
        comment: null,
        __typename: "ObjectRelationship"
      }
    ],
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "employees",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "state",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "postal_code",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "last_name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "country",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "phone",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "reports_to",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "email",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "birth_date",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "address",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "city",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "hire_date",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "first_name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "fax",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "id",
          column_default: "nextval('employees_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "employees",
          column_name: "title",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [
        {
          table_schema: "public",
          table_name: "employees",
          constraint_name: "fk_employee_reports_to",
          ref_table_table_schema: "public",
          ref_table: "employees",
          column_mapping: {
            reports_to: "id"
          },
          __typename: "PostgresForeignKey"
        }
      ],
      indexes: [
        {
          table_schema: "public",
          table_name: "employees",
          index_name: "pk_employees",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "employees",
          index_name: "ifk_employee_reports_to",
          index_type: "btree",
          index_keys: ["reports_to"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "employees",
        constraint_name: "pk_employees",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "employees",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  film_actor: {
    array_relationships: null,
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "film_actor",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "film_actor",
          column_name: "last_update",
          column_default: "now()",
          is_nullable: "f",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "film_actor",
          column_name: "actor_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "smallint",
          udt_name: "int2",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "film_actor",
          column_name: "film_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "smallint",
          udt_name: "int2",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "film_actor",
          index_name: "idx_fk_films_id",
          index_type: "btree",
          index_keys: ["film_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "film_actor",
          index_name: "film_actor_pkey",
          index_type: "btree",
          index_keys: ["actor_id", "film_id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "film_actor",
        constraint_name: "film_actor_pkey",
        columns: ["film_id", "actor_id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "film_actor",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  film_category: {
    array_relationships: null,
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "film_category",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "film_category",
          column_name: "last_update",
          column_default: "now()",
          is_nullable: "f",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "film_category",
          column_name: "film_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "smallint",
          udt_name: "int2",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "film_category",
          column_name: "category_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "smallint",
          udt_name: "int2",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [],
      primary_key: null,
      table_schema: "public",
      table_name: "film_category",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  films: {
    array_relationships: null,
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "films",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "films",
          column_name: "rental_duration",
          column_default: "3",
          is_nullable: "f",
          data_type: "smallint",
          udt_name: "int2",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "length",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "smallint",
          udt_name: "int2",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "description",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "text",
          udt_name: "text",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "rental_rate",
          column_default: "4.99",
          is_nullable: "f",
          data_type: "numeric",
          udt_name: "numeric",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "replacement_cost",
          column_default: "19.99",
          is_nullable: "f",
          data_type: "numeric",
          udt_name: "numeric",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "release_year",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "id",
          column_default: "nextval('films_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "last_update",
          column_default: "now()",
          is_nullable: "f",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "title",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "special_features",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "ARRAY",
          udt_name: "_text",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "rating",
          column_default: "'G'::text",
          is_nullable: "t",
          data_type: "text",
          udt_name: "text",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "language_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "smallint",
          udt_name: "int2",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "films",
          column_name: "fulltext",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "tsvector",
          udt_name: "tsvector",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "films",
          index_name: "films_fulltext_idx",
          index_type: "gist",
          index_keys: ["fulltext"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "films",
          index_name: "idx_fk_language_id",
          index_type: "btree",
          index_keys: ["language_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "films",
          index_name: "idx_title",
          index_type: "btree",
          index_keys: ["title"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "films",
          index_name: "films_pkey",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "films",
        constraint_name: "films_pkey",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "films",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  genres: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "tracks",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "genre_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "tracks",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "genres",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "genres",
          column_name: "name",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "genres",
          column_name: "id",
          column_default: "nextval('genres_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "genres",
          index_name: "pk_genres",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "genres",
        constraint_name: "pk_genres",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "genres",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  invoice_lines: {
    array_relationships: null,
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: [
      {
        using: {
          foreign_key_constraint_on: "invoice_id",
          manual_configuration: null
        },
        name: "invoice",
        comment: null,
        __typename: "ObjectRelationship"
      },
      {
        using: {
          foreign_key_constraint_on: "track_id",
          manual_configuration: null
        },
        name: "track",
        comment: null,
        __typename: "ObjectRelationship"
      }
    ],
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "invoice_lines",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "invoice_lines",
          column_name: "track_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoice_lines",
          column_name: "unit_price",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "numeric",
          udt_name: "numeric",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoice_lines",
          column_name: "id",
          column_default: "nextval('invoicelines_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoice_lines",
          column_name: "invoice_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoice_lines",
          column_name: "quantity",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [
        {
          table_schema: "public",
          table_name: "invoice_lines",
          constraint_name: "fk_invoice_line_invoice_id",
          ref_table_table_schema: "public",
          ref_table: "invoices",
          column_mapping: {
            invoice_id: "id"
          },
          __typename: "PostgresForeignKey"
        },
        {
          table_schema: "public",
          table_name: "invoice_lines",
          constraint_name: "fk_invoice_line_track_id",
          ref_table_table_schema: "public",
          ref_table: "tracks",
          column_mapping: {
            track_id: "id"
          },
          __typename: "PostgresForeignKey"
        }
      ],
      indexes: [
        {
          table_schema: "public",
          table_name: "invoice_lines",
          index_name: "ok_invoice_lines",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "invoice_lines",
          index_name: "ifk_invoice_line_invoice_id",
          index_type: "btree",
          index_keys: ["invoice_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "invoice_lines",
          index_name: "ifk_invoice_line_track_id",
          index_type: "btree",
          index_keys: ["track_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "invoice_lines",
        constraint_name: "ok_invoice_lines",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "invoice_lines",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  invoices: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "invoice_lines",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "invoice_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "invoice_lines",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: [
      {
        using: {
          foreign_key_constraint_on: "customer_id",
          manual_configuration: null
        },
        name: "customer",
        comment: null,
        __typename: "ObjectRelationship"
      }
    ],
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "invoices",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "customer_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "billing_city",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "billing_state",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "billing_postal_code",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "invoice_date",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "timestamp without time zone",
          udt_name: "timestamp",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "total",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "numeric",
          udt_name: "numeric",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "billing_country",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "billing_address",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          column_name: "id",
          column_default: "nextval('invoices_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [
        {
          table_schema: "public",
          table_name: "invoices",
          constraint_name: "fk_invoice_customer_id",
          ref_table_table_schema: "public",
          ref_table: "customers",
          column_mapping: {
            customer_id: "id"
          },
          __typename: "PostgresForeignKey"
        }
      ],
      indexes: [
        {
          table_schema: "public",
          table_name: "invoices",
          index_name: "pk_invoices",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "invoices",
          index_name: "ifk_invoice_customer_id",
          index_type: "btree",
          index_keys: ["customer_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "invoices",
        constraint_name: "pk_invoices",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "invoices",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  media_types: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "tracks",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "media_type_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "tracks",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "media_types",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "media_types",
          column_name: "id",
          column_default: "nextval('mediatypes_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "media_types",
          column_name: "name",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "media_types",
          index_name: "pk_media_types",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "media_types",
        constraint_name: "pk_media_types",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "media_types",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  playlist_track: {
    array_relationships: null,
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: [
      {
        using: {
          foreign_key_constraint_on: "playlist_id",
          manual_configuration: null
        },
        name: "playlist",
        comment: null,
        __typename: "ObjectRelationship"
      },
      {
        using: {
          foreign_key_constraint_on: "track_id",
          manual_configuration: null
        },
        name: "track",
        comment: null,
        __typename: "ObjectRelationship"
      }
    ],
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "playlist_track",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "playlist_track",
          column_name: "playlist_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "playlist_track",
          column_name: "track_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [
        {
          table_schema: "public",
          table_name: "playlist_track",
          constraint_name: "fk_playlist_track_playlist_id",
          ref_table_table_schema: "public",
          ref_table: "playlists",
          column_mapping: {
            playlist_id: "id"
          },
          __typename: "PostgresForeignKey"
        },
        {
          table_schema: "public",
          table_name: "playlist_track",
          constraint_name: "fk_playlist_track_track_id",
          ref_table_table_schema: "public",
          ref_table: "tracks",
          column_mapping: {
            track_id: "id"
          },
          __typename: "PostgresForeignKey"
        }
      ],
      indexes: [
        {
          table_schema: "public",
          table_name: "playlist_track",
          index_name: "pk_playlist_track",
          index_type: "btree",
          index_keys: ["playlist_id", "track_id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "playlist_track",
          index_name: "ifk_playlist_track_track_id",
          index_type: "btree",
          index_keys: ["track_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "playlist_track",
        constraint_name: "pk_playlist_track",
        columns: ["track_id", "playlist_id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "playlist_track",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  playlists: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "playlist_track",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "playlist_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "playlist_tracks",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: null,
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "playlists",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "playlists",
          column_name: "id",
          column_default: "nextval('playlists_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "playlists",
          column_name: "name",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [],
      indexes: [
        {
          table_schema: "public",
          table_name: "playlists",
          index_name: "pk_playlists",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "playlists",
        constraint_name: "pk_playlists",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "playlists",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  },
  tracks: {
    array_relationships: [
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "invoice_lines",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "track_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "invoice_lines",
        comment: null,
        __typename: "ArrayRelationship"
      },
      {
        using: {
          foreign_key_constraint_on: {
            table: {
              name: "playlist_track",
              schema: "public",
              __typename: "QualifiedTable"
            },
            column: "track_id",
            __typename: "ArrRelUsingFKeyOn"
          }
        },
        name: "playlist_tracks",
        comment: null,
        __typename: "ArrayRelationship"
      }
    ],
    computed_fields: null,
    configuration: null,
    delete_permissions: null,
    event_triggers: null,
    insert_permissions: null,
    object_relationships: [
      {
        using: {
          foreign_key_constraint_on: "album_id",
          manual_configuration: null
        },
        name: "album",
        comment: null,
        __typename: "ObjectRelationship"
      },
      {
        using: {
          foreign_key_constraint_on: "genre_id",
          manual_configuration: null
        },
        name: "genre",
        comment: null,
        __typename: "ObjectRelationship"
      },
      {
        using: {
          foreign_key_constraint_on: "media_type_id",
          manual_configuration: null
        },
        name: "media_type",
        comment: null,
        __typename: "ObjectRelationship"
      }
    ],
    remote_relationships: null,
    select_permissions: null,
    table: {
      name: "tracks",
      schema: "public",
      __typename: "QualifiedTable"
    },
    update_permissions: null,
    is_enum: null,
    __typename: "TableEntry",
    database_table: {
      columns: [
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "composer",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "bytes",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "unit_price",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "numeric",
          udt_name: "numeric",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "milliseconds",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "album_id",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "id",
          column_default: "nextval('tracks_id_seq'::regclass)",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "media_type_id",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "name",
          column_default: "NULL",
          is_nullable: "f",
          data_type: "character varying",
          udt_name: "varchar",
          __typename: "PostgresColumn"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          column_name: "genre_id",
          column_default: "NULL",
          is_nullable: "t",
          data_type: "integer",
          udt_name: "int4",
          __typename: "PostgresColumn"
        }
      ],
      foreign_keys: [
        {
          table_schema: "public",
          table_name: "tracks",
          constraint_name: "fk_track_album_id",
          ref_table_table_schema: "public",
          ref_table: "albums",
          column_mapping: {
            album_id: "id"
          },
          __typename: "PostgresForeignKey"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          constraint_name: "fk_track_genre_id",
          ref_table_table_schema: "public",
          ref_table: "genres",
          column_mapping: {
            genre_id: "id"
          },
          __typename: "PostgresForeignKey"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          constraint_name: "fk_track_media_type_id",
          ref_table_table_schema: "public",
          ref_table: "media_types",
          column_mapping: {
            media_type_id: "id"
          },
          __typename: "PostgresForeignKey"
        }
      ],
      indexes: [
        {
          table_schema: "public",
          table_name: "tracks",
          index_name: "pk_tracks",
          index_type: "btree",
          index_keys: ["id"],
          is_unique: "t",
          is_primary: "t",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          index_name: "ifk_track_album_id",
          index_type: "btree",
          index_keys: ["album_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          index_name: "ifk_track_genre_id",
          index_type: "btree",
          index_keys: ["genre_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        },
        {
          table_schema: "public",
          table_name: "tracks",
          index_name: "ifk_track_media_type_id",
          index_type: "btree",
          index_keys: ["media_type_id"],
          is_unique: "f",
          is_primary: "f",
          is_partial: "f",
          __typename: "PostgresIndex"
        }
      ],
      primary_key: {
        table_schema: "public",
        table_name: "tracks",
        constraint_name: "pk_tracks",
        columns: ["id"],
        __typename: "PostgresPrimaryKey"
      },
      table_schema: "public",
      table_name: "tracks",
      comment: "NULL",
      __typename: "PostgresTable"
    }
  }
} as unknown) as GroupedMetadataAndPostgresTables
