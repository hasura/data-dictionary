
var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Postgres_possibleTypes = ['Postgres']
export var isPostgres = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgres"')
  return Postgres_possibleTypes.includes(obj.__typename)
}



var Schema_possibleTypes = ['Schema']
export var isSchema = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSchema"')
  return Schema_possibleTypes.includes(obj.__typename)
}



var BelongsToTable_possibleTypes = ['PostgresCheck','PostgresColumn','PostgresIndex','PostgresPrimaryKey','PostgresForeignKey']
export var isBelongsToTable = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBelongsToTable"')
  return BelongsToTable_possibleTypes.includes(obj.__typename)
}



var PostgresView_possibleTypes = ['PostgresView']
export var isPostgresView = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgresView"')
  return PostgresView_possibleTypes.includes(obj.__typename)
}



var PostgresTable_possibleTypes = ['PostgresTable']
export var isPostgresTable = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgresTable"')
  return PostgresTable_possibleTypes.includes(obj.__typename)
}



var PostgresCheck_possibleTypes = ['PostgresCheck']
export var isPostgresCheck = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgresCheck"')
  return PostgresCheck_possibleTypes.includes(obj.__typename)
}



var PostgresColumn_possibleTypes = ['PostgresColumn']
export var isPostgresColumn = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgresColumn"')
  return PostgresColumn_possibleTypes.includes(obj.__typename)
}



var PostgresIndex_possibleTypes = ['PostgresIndex']
export var isPostgresIndex = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgresIndex"')
  return PostgresIndex_possibleTypes.includes(obj.__typename)
}



var PostgresPrimaryKey_possibleTypes = ['PostgresPrimaryKey']
export var isPostgresPrimaryKey = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgresPrimaryKey"')
  return PostgresPrimaryKey_possibleTypes.includes(obj.__typename)
}



var PostgresForeignKey_possibleTypes = ['PostgresForeignKey']
export var isPostgresForeignKey = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostgresForeignKey"')
  return PostgresForeignKey_possibleTypes.includes(obj.__typename)
}



var HasuraMetadata_possibleTypes = ['HasuraMetadata']
export var isHasuraMetadata = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHasuraMetadata"')
  return HasuraMetadata_possibleTypes.includes(obj.__typename)
}



var TableEntry_possibleTypes = ['TableEntry']
export var isTableEntry = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTableEntry"')
  return TableEntry_possibleTypes.includes(obj.__typename)
}



var QualifiedTable_possibleTypes = ['QualifiedTable']
export var isQualifiedTable = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQualifiedTable"')
  return QualifiedTable_possibleTypes.includes(obj.__typename)
}



var Action_possibleTypes = ['Action']
export var isAction = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAction"')
  return Action_possibleTypes.includes(obj.__typename)
}



var ActionPermission_possibleTypes = ['ActionPermission']
export var isActionPermission = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isActionPermission"')
  return ActionPermission_possibleTypes.includes(obj.__typename)
}



var ActionDefinition_possibleTypes = ['ActionDefinition']
export var isActionDefinition = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isActionDefinition"')
  return ActionDefinition_possibleTypes.includes(obj.__typename)
}



var InputArgument_possibleTypes = ['InputArgument']
export var isInputArgument = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isInputArgument"')
  return InputArgument_possibleTypes.includes(obj.__typename)
}



var HeaderFromEnv_possibleTypes = ['HeaderFromEnv']
export var isHeaderFromEnv = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHeaderFromEnv"')
  return HeaderFromEnv_possibleTypes.includes(obj.__typename)
}



var HeaderFromValue_possibleTypes = ['HeaderFromValue']
export var isHeaderFromValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHeaderFromValue"')
  return HeaderFromValue_possibleTypes.includes(obj.__typename)
}



var Header_possibleTypes = ['HeaderFromEnv','HeaderFromValue']
export var isHeader = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHeader"')
  return Header_possibleTypes.includes(obj.__typename)
}



var TableConfig_possibleTypes = ['TableConfig']
export var isTableConfig = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTableConfig"')
  return TableConfig_possibleTypes.includes(obj.__typename)
}



var CustomRootFields_possibleTypes = ['CustomRootFields']
export var isCustomRootFields = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCustomRootFields"')
  return CustomRootFields_possibleTypes.includes(obj.__typename)
}



var EventTrigger_possibleTypes = ['EventTrigger']
export var isEventTrigger = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventTrigger"')
  return EventTrigger_possibleTypes.includes(obj.__typename)
}



var EventTriggerDefinition_possibleTypes = ['EventTriggerDefinition']
export var isEventTriggerDefinition = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventTriggerDefinition"')
  return EventTriggerDefinition_possibleTypes.includes(obj.__typename)
}



var OperationSpec_possibleTypes = ['OperationSpecAllColumns','OperationSpecIndividualColumns']
export var isOperationSpec = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isOperationSpec"')
  return OperationSpec_possibleTypes.includes(obj.__typename)
}



var OperationSpecAllColumns_possibleTypes = ['OperationSpecAllColumns']
export var isOperationSpecAllColumns = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isOperationSpecAllColumns"')
  return OperationSpecAllColumns_possibleTypes.includes(obj.__typename)
}



var OperationSpecIndividualColumns_possibleTypes = ['OperationSpecIndividualColumns']
export var isOperationSpecIndividualColumns = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isOperationSpecIndividualColumns"')
  return OperationSpecIndividualColumns_possibleTypes.includes(obj.__typename)
}



var RetryConf_possibleTypes = ['RetryConf']
export var isRetryConf = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRetryConf"')
  return RetryConf_possibleTypes.includes(obj.__typename)
}



var ComputedField_possibleTypes = ['ComputedField']
export var isComputedField = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isComputedField"')
  return ComputedField_possibleTypes.includes(obj.__typename)
}



var QualifiedFunction_possibleTypes = ['QualifiedFunction']
export var isQualifiedFunction = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQualifiedFunction"')
  return QualifiedFunction_possibleTypes.includes(obj.__typename)
}



var ComputedFieldDefinition_possibleTypes = ['ComputedFieldDefinition']
export var isComputedFieldDefinition = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isComputedFieldDefinition"')
  return ComputedFieldDefinition_possibleTypes.includes(obj.__typename)
}



var ObjectRelationship_possibleTypes = ['ObjectRelationship']
export var isObjectRelationship = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isObjectRelationship"')
  return ObjectRelationship_possibleTypes.includes(obj.__typename)
}



var ObjRelUsing_possibleTypes = ['ObjRelUsing']
export var isObjRelUsing = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isObjRelUsing"')
  return ObjRelUsing_possibleTypes.includes(obj.__typename)
}



var ObjRelUsingManualMapping_possibleTypes = ['ObjRelUsingManualMapping']
export var isObjRelUsingManualMapping = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isObjRelUsingManualMapping"')
  return ObjRelUsingManualMapping_possibleTypes.includes(obj.__typename)
}



var ArrayRelationship_possibleTypes = ['ArrayRelationship']
export var isArrayRelationship = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isArrayRelationship"')
  return ArrayRelationship_possibleTypes.includes(obj.__typename)
}



var ArrRelUsing_possibleTypes = ['ArrRelUsing']
export var isArrRelUsing = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isArrRelUsing"')
  return ArrRelUsing_possibleTypes.includes(obj.__typename)
}



var ArrRelUsingFKeyOn_possibleTypes = ['ArrRelUsingFKeyOn']
export var isArrRelUsingFKeyOn = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isArrRelUsingFKeyOn"')
  return ArrRelUsingFKeyOn_possibleTypes.includes(obj.__typename)
}



var ArrRelUsingManualMapping_possibleTypes = ['ArrRelUsingManualMapping']
export var isArrRelUsingManualMapping = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isArrRelUsingManualMapping"')
  return ArrRelUsingManualMapping_possibleTypes.includes(obj.__typename)
}



var RemoteRelationship_possibleTypes = ['RemoteRelationship']
export var isRemoteRelationship = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRemoteRelationship"')
  return RemoteRelationship_possibleTypes.includes(obj.__typename)
}



var RemoteRelationshipDef_possibleTypes = ['RemoteRelationshipDef']
export var isRemoteRelationshipDef = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRemoteRelationshipDef"')
  return RemoteRelationshipDef_possibleTypes.includes(obj.__typename)
}



var InsertPermissionEntry_possibleTypes = ['InsertPermissionEntry']
export var isInsertPermissionEntry = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isInsertPermissionEntry"')
  return InsertPermissionEntry_possibleTypes.includes(obj.__typename)
}



var InsertPermission_possibleTypes = ['InsertPermission']
export var isInsertPermission = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isInsertPermission"')
  return InsertPermission_possibleTypes.includes(obj.__typename)
}



var SelectPermissionEntry_possibleTypes = ['SelectPermissionEntry']
export var isSelectPermissionEntry = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSelectPermissionEntry"')
  return SelectPermissionEntry_possibleTypes.includes(obj.__typename)
}



var SelectPermission_possibleTypes = ['SelectPermission']
export var isSelectPermission = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSelectPermission"')
  return SelectPermission_possibleTypes.includes(obj.__typename)
}



var UpdatePermissionEntry_possibleTypes = ['UpdatePermissionEntry']
export var isUpdatePermissionEntry = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUpdatePermissionEntry"')
  return UpdatePermissionEntry_possibleTypes.includes(obj.__typename)
}



var UpdatePermission_possibleTypes = ['UpdatePermission']
export var isUpdatePermission = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUpdatePermission"')
  return UpdatePermission_possibleTypes.includes(obj.__typename)
}



var DeletePermissionEntry_possibleTypes = ['DeletePermissionEntry']
export var isDeletePermissionEntry = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDeletePermissionEntry"')
  return DeletePermissionEntry_possibleTypes.includes(obj.__typename)
}



var DeletePermission_possibleTypes = ['DeletePermission']
export var isDeletePermission = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDeletePermission"')
  return DeletePermission_possibleTypes.includes(obj.__typename)
}



var CustomTypes_possibleTypes = ['CustomTypes']
export var isCustomTypes = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCustomTypes"')
  return CustomTypes_possibleTypes.includes(obj.__typename)
}



var InputObjectType_possibleTypes = ['InputObjectType']
export var isInputObjectType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isInputObjectType"')
  return InputObjectType_possibleTypes.includes(obj.__typename)
}



var InputObjectField_possibleTypes = ['InputObjectField']
export var isInputObjectField = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isInputObjectField"')
  return InputObjectField_possibleTypes.includes(obj.__typename)
}



var ObjectType_possibleTypes = ['ObjectType']
export var isObjectType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isObjectType"')
  return ObjectType_possibleTypes.includes(obj.__typename)
}



var ObjectField_possibleTypes = ['ObjectField']
export var isObjectField = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isObjectField"')
  return ObjectField_possibleTypes.includes(obj.__typename)
}



var CustomTypeObjectRelationship_possibleTypes = ['CustomTypeObjectRelationship']
export var isCustomTypeObjectRelationship = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCustomTypeObjectRelationship"')
  return CustomTypeObjectRelationship_possibleTypes.includes(obj.__typename)
}



var ScalarType_possibleTypes = ['ScalarType']
export var isScalarType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isScalarType"')
  return ScalarType_possibleTypes.includes(obj.__typename)
}



var EnumType_possibleTypes = ['EnumType']
export var isEnumType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEnumType"')
  return EnumType_possibleTypes.includes(obj.__typename)
}



var EnumValue_possibleTypes = ['EnumValue']
export var isEnumValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEnumValue"')
  return EnumValue_possibleTypes.includes(obj.__typename)
}



var CustomFunction_possibleTypes = ['CustomFunction']
export var isCustomFunction = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCustomFunction"')
  return CustomFunction_possibleTypes.includes(obj.__typename)
}



var FunctionConfiguration_possibleTypes = ['FunctionConfiguration']
export var isFunctionConfiguration = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isFunctionConfiguration"')
  return FunctionConfiguration_possibleTypes.includes(obj.__typename)
}



var RemoteSchema_possibleTypes = ['RemoteSchema']
export var isRemoteSchema = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRemoteSchema"')
  return RemoteSchema_possibleTypes.includes(obj.__typename)
}



var RemoteSchemaDef_possibleTypes = ['RemoteSchemaDef']
export var isRemoteSchemaDef = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRemoteSchemaDef"')
  return RemoteSchemaDef_possibleTypes.includes(obj.__typename)
}



var QueryCollectionEntry_possibleTypes = ['QueryCollectionEntry']
export var isQueryCollectionEntry = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQueryCollectionEntry"')
  return QueryCollectionEntry_possibleTypes.includes(obj.__typename)
}



var QueryCollectionDefinition_possibleTypes = ['QueryCollectionDefinition']
export var isQueryCollectionDefinition = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQueryCollectionDefinition"')
  return QueryCollectionDefinition_possibleTypes.includes(obj.__typename)
}



var QueryCollection_possibleTypes = ['QueryCollection']
export var isQueryCollection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQueryCollection"')
  return QueryCollection_possibleTypes.includes(obj.__typename)
}



var AllowList_possibleTypes = ['AllowList']
export var isAllowList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAllowList"')
  return AllowList_possibleTypes.includes(obj.__typename)
}



var CronTrigger_possibleTypes = ['CronTrigger']
export var isCronTrigger = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCronTrigger"')
  return CronTrigger_possibleTypes.includes(obj.__typename)
}



var RetryConfST_possibleTypes = ['RetryConfST']
export var isRetryConfST = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRetryConfST"')
  return RetryConfST_possibleTypes.includes(obj.__typename)
}
