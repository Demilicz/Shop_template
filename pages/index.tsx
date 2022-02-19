import { ApolloError } from '@apollo/client';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import  Link  from 'next/link'

import { useState, useEffect} from 'react';

import { CardProduct , Header, Footer, BrandsFilter, Pagination, PriceFilter } from '../components/index';

import { useGetProducts } from '../hooks/useGetProducts';

import { ProductObject } from '../interfaces/interfaces';

import  Style  from '../styles/Home.module.css';


const Home: NextPage<{products:ProductObject[]}> = ({ products, total } : InferGetStaticPropsType<typeof getStaticProps>) => {

  const [ productPerPage, setProductPerPage ] = useState(12);

  const [ currentPage, setCurrentPage ] = useState(1);

  const [ priceRange, setPriceRange ] = useState([0, 100000]);

  const [ arrayOfBrands, setArrayOfBrands ] = useState(["Apple", "Xiaomi", "Samsung"] as Array<string>);

  const { error, loading, newData, newTotal } : { error: ApolloError | undefined; loading: boolean; newData: ProductObject[]; newTotal:number} = useGetProducts(currentPage, arrayOfBrands, productPerPage, priceRange );

  const [ pages, setPages ] = useState(Math.ceil(total/productPerPage));

  useEffect(()=> {

    if(newTotal ){

      let newPages = Math.ceil(newTotal/productPerPage);

      setPages(newPages);

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newTotal])

  return (
    <main>
      <Header/>
      <div className={Style.container}>
        <div className={Style.brand_container}>
          <BrandsFilter brands={arrayOfBrands} setBrands={setArrayOfBrands} />
          <PriceFilter prices={priceRange} setPrices={setPriceRange}/>
        </div>
        <div className={Style.card_container}>

          <div className={Style.card_container_flex}>

            { priceRange[0] === 0 && priceRange[1] === 100000 && arrayOfBrands.length === 3 && currentPage === 1 && products?.map((product:ProductObject) => {
              return  <Link href={`/${product.slug}&${product.sys.id}`} key={product.sys.id +"link"}>
                        <a className={Style.card_product}>
                          <CardProduct key={product.sys.id +"card"} product={product} />
                        </a>
                      </Link>
            })}

            { error && <div className='error'>Something went wrong..</div> }

            { loading &&  <div className='loading'>Its loading...</div> }

            { priceRange[0] === 0 && priceRange[1] === 100000 &&  arrayOfBrands.length === 3 && currentPage > 1 && newData && newData.map((product:ProductObject) => {
              return  <Link href={`/${product.slug}&${product.sys.id}`} key={product.sys.id +"link"}>
                        <a className={Style.card_product}>
                          <CardProduct key={product.sys.id} product={product} />
                        </a>
                      </Link>
            })}

            { priceRange[0] === 0 && priceRange[1] === 100000 && arrayOfBrands.length < 3  && newData && newData.map((product:ProductObject) => {
              return  <Link href={`/${product.slug}&${product.sys.id}`} key={product.sys.id +"link"}>
                        <a className={Style.card_product}>
                          <CardProduct key={product.sys.id} product={product} />
                        </a>
                      </Link>
            })}

            { (priceRange[0] > 0 || priceRange[1] < 100000 ) && newData && newData.map((product:ProductObject) => {
              return  <Link href={`/${product.slug}&${product.sys.id}`} key={product.sys.id +"link"}>
                        <a className={Style.card_product}>
                          <CardProduct key={product.sys.id} product={product} />
                        </a>
                      </Link>
            })}

          </div>

          <Pagination pages={pages} setPage={setCurrentPage} page={currentPage}/>
        </div>

      </div>
      <Footer/>

    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const id = context.params;

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
               slug
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