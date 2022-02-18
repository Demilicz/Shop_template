import { useQuery, gql } from "@apollo/client";
import { ProductObject } from '../interfaces/interfaces';

const GET_PRODUCTS = gql`
query GET_Products($skip: Int!, $brands: [String]!, $productPerPage: Int!, $price_gt: Float!, $price_lt: Float! ){
  productCollection(limit: $productPerPage, skip: $skip, where:{ brand_in: $brands, price_gt: $price_gt , price_lt: $price_lt}){
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
        sys{
          id
        }
      }
  }
}`;

export const useGetProducts = (currentPage: number, arrayOfBrands: string[], productPerPage: number, priceRange:number[]) => {

    const skip = (currentPage - 1) * productPerPage;
    const brands: string[] = arrayOfBrands;
    const price_gt: number = priceRange[0];
    const price_lt: number = priceRange[1];

    const { data, error, loading } = useQuery(GET_PRODUCTS , {
      variables: {
        skip,
        brands,
        productPerPage,
        price_gt,
        price_lt
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
