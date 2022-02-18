import Image from 'next/image'
import { ProductObject } from '../interfaces/interfaces';



export const CardProduct = ({product}: {product:ProductObject}) => {

  const { screen, storage, system,  processor, title, thumbnail, price } = product;

  return (
    <div>
      <Image  src={ thumbnail.url } width={ thumbnail.width } height={ thumbnail.height } alt={ title }/>
      <h3>{ title }</h3>
      <div className='info'>
        <span className='card_text'>Screen: { screen +'"' }</span>
        <span className='card_text'>Processor: { processor }</span>
        <span className='card_text'>Storage:{ storage +'GB'}</span>
        <span className='card_text'>System:{ system }</span>
        <p className='card_price'>Price: { price +'zł'}</p>
      </div>
      <style jsx>{`
            .info{
              display: flex;
              flex-direction: column;
            }
        `}</style>
    </div>
  )
}
