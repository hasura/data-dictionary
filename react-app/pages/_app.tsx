import "../styles/globals.css"

import { StoreProvider } from "easy-peasy"
import { store } from "../store"

import Layout from "../components/layout"

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
