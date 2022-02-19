import React from 'react'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import { Slugs, Describe } from '../interfaces/interfaces';
import Image from 'next/image';
import { Header , Footer } from '../components';


export const Product: NextPage<{currentProduct:Describe}> = ({ currentProduct }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const { title, screen, processor, storage, system, price, image, info } = currentProduct.data.product;

  return (
    <div>
      <Header/>
      { currentProduct &&  <div>
                            <div className='container'>
                              <Image src={image.url} height={image.height} width={image.width} alt={title}/>
                              <div>
                                <h1>{title}</h1>
                                <p>Screen: {screen}</p>
                                <p>Processor: {processor}</p>
                                <p>Storage: {storage}</p>
                                <p>System: {system}</p>
                                <h4>Price: {price} zl</h4>
                              </div>
                            </div>
                            <div className='info'>
                              <h2 className='info_title'>{info.json.content[0]?.content[0].value}</h2>
                              <p className='info_text'>{info.json.content[1]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[2]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[3]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[4]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[5]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[6]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[7]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[8]?.content[0].value}</p>
                              <p className='info_text'>{info.json.content[9]?.content[0].value}</p>
                            </div>
                          </div>
      }
      <Footer/>
      <style jsx>
        {`
          .container {
            display: flex;
          }
          .info{
            margin: 50px auto;
            max-width: 1650px
          }

        `}
      </style>
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
          image{
						url
            width
            height
          }
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