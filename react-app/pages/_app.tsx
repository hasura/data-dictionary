import "../styles/globals.css"

import { StoreProvider } from "easy-peasy"
import { store } from "../store"

import Layout from "../components/layout"

// TODO: Is this the proper way to bootstrap initial data fetching?
const actions = store.getActions()
actions.loadMetadataAndDatabaseInfo()
actions.loadGraphQLSchemaByIntrospection()

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
