import * as fs from "fs"
import * as path from "path"

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()

const pathToThisFolder = path.join(
  serverRuntimeConfig.PROJECT_ROOT,
  "./graphql-server-utils/sql"
)

// prettier-ignore
export default {
  columns: fs.readFileSync(path.join(pathToThisFolder, '/columns.sql')).toString(),
  config: fs.readFileSync(path.join(pathToThisFolder, '/config.sql')).toString(),
  constraints: fs.readFileSync(path.join(pathToThisFolder, '/constraints.sql')).toString(),
  extensions: fs.readFileSync(path.join(pathToThisFolder, '/extensions.sql')).toString(),
  functions: fs.readFileSync(path.join(pathToThisFolder, '/functions.sql')).toString(),
  grants: fs.readFileSync(path.join(pathToThisFolder, '/grants.sql')).toString(),
  indexes: fs.readFileSync(path.join(pathToThisFolder, '/indexes.sql')).toString(),
  joins: fs.readFileSync(path.join(pathToThisFolder, '/joins.sql')).toString(),
  foreign_keys: fs.readFileSync(path.join(pathToThisFolder, '/foreign_keys.sql')).toString(),
  primary_keys: fs.readFileSync(path.join(pathToThisFolder, '/primary_keys.sql')).toString(),
  policies: fs.readFileSync(path.join(pathToThisFolder, '/policies.sql')).toString(),
  relationships: fs.readFileSync(path.join(pathToThisFolder, '/relationships.sql')).toString(),
  roles: fs.readFileSync(path.join(pathToThisFolder, '/roles.sql')).toString(),
  schemas: fs.readFileSync(path.join(pathToThisFolder, '/schemas.sql')).toString(),
  sequences: fs.readFileSync(path.join(pathToThisFolder, '/sequences.sql')).toString(),
  tableSize: fs.readFileSync(path.join(pathToThisFolder, '/table_size.sql')).toString(),
  tables: fs.readFileSync(path.join(pathToThisFolder, '/tables.sql')).toString(),
  types: fs.readFileSync(path.join(pathToThisFolder, '/types.sql')).toString(),
  version: fs.readFileSync(path.join(pathToThisFolder, '/version.sql')).toString(),
  views: fs.readFileSync(path.join(pathToThisFolder, '/views.sql')).toString(),
}
