import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"


const client = new ApolloClient({
  uri:`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master`,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
})

function MyApp({ Component, pageProps }: AppProps) {

  return  <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
}




export default MyApp
