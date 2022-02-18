import React from 'react'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import { Slugs, Describe } from '../interfaces/interfaces';

export const Product: NextPage<{currentProduct:Describe}> = ({ currentProduct }: InferGetStaticPropsType<typeof getStaticProps>) => {



  return (
    <div>
      {currentProduct && <div>{currentProduct?.data?.product?.title}</div>}
    </div>
  )
}

export  const getStaticProps: GetStaticProps = async({params}) => {

  const contextHandler = (con: string) => {
    let sym = con.indexOf('&');
    let id  = con.slice(sym + 1);
    return id
  }

  const id = contextHandler(String(params?.product));

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
          product( id:"${id}"){
          title
          screen
          processor
          storage
          system
          price
          info { json }
        }
      }
      `
    })

    })

  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      currentProduct: data,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

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
      productCollection {
       items{
        slug
        sys { id }
       }
     }
   }
    `
  })

  })
  const parsed: Slugs = await res.json();

  const paths = parsed.data.productCollection.items.map( item => {

    return { params: { product:`${item.slug}&${item.sys.id}` } }

  })

  return {
    paths,
    fallback: false
  }
}

export default Product;