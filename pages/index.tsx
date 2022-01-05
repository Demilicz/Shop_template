import { createClient } from 'contentful';
import {  GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { json } from 'stream/consumers';

import { cardProduct as CardComponent } from '../components/cardProduct';

export const getStaticProps: GetStaticProps = async (n) => {

 const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}/environments/master`,
 {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    query: `
      query {
        productCollection{
          total
          items{
              thumbnail{
                width
                height
                url
              }
              title
              screen
              processor
              storage
              system
              price
              sys{
                id
              }
            }
        }
      }
    `
  })


 })

 const {data} = await res.json();



 const products = data.productCollection.items;

 const total = data.productCollection.total;

 return {
   props: {
    products,
    total
   }
 }
}

const Home: NextPage = ({products, total} : InferGetStaticPropsType<typeof getStaticProps>) => {


  return (
    <main>
      <pre>{  JSON.stringify(products, null, 2)}</pre>
    </main>
  )
}

export default Home
