import React from 'react'
import { Dispatch, SetStateAction, useState } from "react";



export const PriceFilter = (props: {prices: number[], setPrices: Dispatch<SetStateAction<number[]>>}) => {

  const [timer, setTimer] = useState(Number);

  const priceHandler = (e: {target: HTMLInputElement}) => {

    if(e.target.name === "From"){

      clearTimeout(timer)

      const newTimer: number = window.setTimeout(() => {

        let from: number = Number(e.target.value);

        let newArray: number[] = [];

        newArray.push(from);

        newArray.push(props.prices[1])

        props.setPrices(newArray)

      }, 1200)

      setTimer(newTimer)

    }
    if(e.target.name === "To"){
      clearTimeout(timer)

      const newTimer: number = window.setTimeout(() => {

        let from: number = Number(e.target.value);

        let newArray: number[] = [];

        newArray.push(props.prices[0])

        newArray.push(from);

        props.setPrices(newArray)

      }, 1200)

      setTimer(newTimer)
    }
  }

  return (
    <div className='main_container'>
      <p>Price</p>
      <input type="number" placeholder='from' name='From' className='input' onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ priceHandler(e)}}/>
      <input type="number" placeholder='to' name='To' className='input' onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ priceHandler(e)}}/>
      <style jsx>{`
      .main_container {
        margin-left: 15px;
      }
      .input {
        width: 80px;
        margin-right: 10px;
        border-radius: 4px;
        padding:5px
      }


    `}</style>
    </div>
  )
}
