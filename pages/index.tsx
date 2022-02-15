import { ApolloError } from '@apollo/client';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { useState, useEffect} from 'react';

import { CardProduct , Header, Footer, BrandsFilter, Pagination} from '../components/index';

import { useGetProducts } from '../hooks/useGetProducts';

import { ProductObject } from '../interfaces/interfaces';

import  Style  from '../styles/Home.module.css';


const Home: NextPage<{products:ProductObject[]}> = ({ products, total } : InferGetStaticPropsType<typeof getStaticProps>) => {

  const [ productPerPage, setProductPerPage] = useState(12);

  const [currentPage, setCurrentPage] = useState(1);

  const [arrayOfBrands, setArrayOfBrands] = useState(["Apple", "Xiaomi", "Samsung"] as Array<string>);

  const { error, loading, newData, newTotal } : { error: ApolloError | undefined; loading: boolean; newData: ProductObject[]; newTotal:number} = useGetProducts(currentPage, arrayOfBrands, productPerPage);

  const [pages, setPages] = useState(Math.ceil(total/productPerPage));

  useEffect(()=> {

    if(newTotal ){

      let newPages = Math.ceil(newTotal/productPerPage);

      setPages(newPages);

    }
    console.log(pages);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newTotal])



  return (
    <main>
      <Header/>
      <div className={Style.container}>
        <BrandsFilter brands={arrayOfBrands} setBrands={setArrayOfBrands} />
        <div className={Style.card_container}>

          <div className={Style.card_container_flex}>

            { error && <div className='error'>Something went wrong..</div> }
            { loading &&  <div className='loading'>Its loading...</div> }

            { arrayOfBrands.length === 3 && currentPage === 1 && products?.map((product:ProductObject) => {
              return <CardProduct key={product.sys.id} product={product} />
            })}

            { arrayOfBrands.length === 3 && currentPage > 1 && newData && newData.map((product:ProductObject) => {
              return <CardProduct key={product.sys.id} product={product} />
            })}

            { arrayOfBrands.length < 3  && newData && newData.map((product:ProductObject) => {
              return <CardProduct key={product.sys.id} product={product} />
            })}

          </div>

          <Pagination pages={pages} setPage={setCurrentPage} page={currentPage}/>
        </div>

      </div>
      <Footer/>

    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master`,
  {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
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
               brand
               sys {
                 id
               }
             }
         }
       }
     `
   })

  })

  const {data} = await res?.json();

  const products:ProductObject[] = data?.productCollection?.items;

  const total: number = data?.productCollection?.total;

  return {
    props: {
      products: products || null,
      total: total || null
    }
  }
}

export default Home;