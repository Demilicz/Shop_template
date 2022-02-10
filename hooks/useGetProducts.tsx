import { useQuery, gql } from "@apollo/client";
import { ProductObject } from '../interfaces/interfaces';
import { Dispatch, SetStateAction } from "react";

const GET_PRODUCTS = gql`
query GET_Products($skip: Int!, $brands: [String], $productPerPage: Int!){
  productCollection(limit: $productPerPage, skip: $skip, where:{ brand_in: $brands }){
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
}`;

export const useGetProducts = (currentPage: number, arrayOfBrands: string[], productPerPage: number) => {

    const skip = (currentPage - 1) * productPerPage;
    const brands: string[] = arrayOfBrands;

    const { data, error, loading } = useQuery(GET_PRODUCTS , {
      variables: {
        skip,
        brands,
        productPerPage,

      }
    })

    const newData: ProductObject[] = data?.productCollection.items;

    const newTotal: number =  data?.productCollection.total;

    


    return {
      error,
      loading,
      newData,
      newTotal
    }

};
