import Image from 'next/image'
import { ProductObject } from '../interfaces/interfaces';


export const CardProduct = ({product}: {product:ProductObject}) => {

  console.log(product);

  const { screen, storage, system,  processor, title } = product;

  return (
    <div>
      {/* <Image/> */}
    </div>
  )
}
