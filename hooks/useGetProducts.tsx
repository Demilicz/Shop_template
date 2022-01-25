import { useQuery, gql } from "@apollo/client";
import { ProductObject } from '../interfaces/interfaces';

const GET_PRODUCTS = gql`
query GET_Products($skip: Int!){
  productCollection(limit:12, skip: $skip){
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


export const useGetProducts = (currentPage: number) => {

    const skip = (currentPage - 1) * 12;

    const { data, error, loading } = useQuery(GET_PRODUCTS , {
      variables: {
        skip,
      }
    })

    const newData: ProductObject[] = data?.productCollection.items;


    return {
      error,
      loading,
      newData
    }

};
