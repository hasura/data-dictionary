import { GraphQLSchema, getNamedType, isObjectType } from "graphql"

interface GetGraphQLOperationFieldsParams {
  graphqlSchema: GraphQLSchema
  operationName: string
}

/**
 * Returns the GraphQLFieldMap (fields) for an operation (query/mutation/subscription)
 * given a GraphQL schema and an operation name
 */
export function getGraphQLOperationFields(
  params: GetGraphQLOperationFieldsParams
) {
  const queryRoot = params.graphqlSchema.getQueryType()
  const mutationRoot = params.graphqlSchema.getMutationType()
  const subscriptionRoot = params.graphqlSchema.getSubscriptionType()

  const queries = queryRoot?.getFields()
  if (queries) {
    const query = queries[params.operationName]

    if (query) {
      const queryType = getNamedType(query.type)
      if (isObjectType(queryType)) return queryType.getFields()
    }
  }

  const mutations = mutationRoot?.getFields()
  if (mutations) {
    const mutation = mutations[params.operationName]

    if (mutation) {
      const mutationType = getNamedType(mutation.type)
      if (isObjectType(mutationType)) return mutationType.getFields()
    }
  }

  const subscriptions = subscriptionRoot?.getFields()
  if (subscriptions) {
    const subscription = subscriptions[params.operationName]

    if (subscription) {
      const subscriptionType = getNamedType(subscription.type)
      if (isObjectType(subscriptionType)) return subscriptionType.getFields()
    }
  }

  return null
}
