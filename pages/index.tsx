import { ApolloError } from '@apollo/client';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { useState } from 'react';

import { CardProduct , Header, Footer, Filters, Pagination} from '../components/index';

import { useGetProducts } from '../hooks/useGetProducts';

import { ProductObject } from '../interfaces/interfaces';

import  Style  from '../styles/Home.module.css';


const Home: NextPage<{products:ProductObject[]}> = ({ products, total } : InferGetStaticPropsType<typeof getStaticProps>) => {

  const [pages, setPages] = useState(Math.ceil(total/12));
  const [currentPage, setCurrentPage] = useState(1);

  const { error, loading, newData } : { error: ApolloError | undefined; loading: boolean; newData: ProductObject[]; } = useGetProducts(currentPage);



  return (
    <main>
      <Header/>
      <div className={Style.container}>
        <Filters/>
        <div className={Style.card_container}>
          {currentPage === 1 &&  products.map((product:ProductObject) => {
            return <CardProduct key={product.sys.id} product={product} />
          })}

          {currentPage > 1 && error && <div className='error'>Something went wrong..</div> }
          { currentPage > 1 && loading &&  <div className='loading'>Its loading...</div> }
          { currentPage > 1 && newData && newData.map((product:ProductObject) => {
            return <CardProduct key={product.sys.id} product={product} />
          })}
          <Pagination pages={pages} setPage={setCurrentPage} page={currentPage}/>
        </div>



      </div>

      <Footer/>
             {/* <pre>{  JSON.stringify(data, null, 2)}</pre> */}
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
         productCollection(limit:12){
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