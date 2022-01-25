import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"


const client = new ApolloClient({
  uri:`https://graphql.contentful.com/content/v1/spaces/japo6r7tpqjb/environments/master`,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer qFNl9juyqGBhtAP8pQejNYNi5QfeeC8j8xyJ98Dct-M`,
    'Content-Type': 'application/json',
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return  <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
}




export default MyApp
