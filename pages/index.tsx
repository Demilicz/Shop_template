import {  GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { CardProduct } from '../components/CardProduct';
import { ProductObject } from '../interfaces/interfaces';


const Home: NextPage<{products:ProductObject[]}> = ({ products, total } : InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <main>
      <pre>{  JSON.stringify(products, null, 2)}</pre>

      {products.map((product:ProductObject) => {
        <CardProduct key={product.sys.id} product={product} />
      })}


    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {

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
         productCollection(limit:10){
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

  const products:ProductObject[] = data.productCollection.items;

  const total: number = data.productCollection.total;

  return {
    props: {
     products,
     total
    }
  }
 }

export default Home;