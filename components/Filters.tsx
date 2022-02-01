import { Dispatch, SetStateAction } from "react";
import React from "react";

import { Brands } from '../interfaces/interfaces';

export const Filters  = (props: {brands: Brands, setBrands: Dispatch<SetStateAction<Brands>>}) => {

  const brandHandler = (e: EventTarget, brands: Brands, setBrands: Dispatch<SetStateAction<Brands>>) => {

  }

  return (
    <div className="container">
      <div className="brand-container">
        <p>Choose brand your</p>
        <div className="brand-filter">
          <div>
            <input id="apple" type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ console.log(e.target)}}/>
            <label htmlFor="apple">Apple</label>
          </div>
          <div>
            <input id="xiaomi"  type="checkbox" />
            <label htmlFor="xiaomi">Xiaomi</label>
          </div>
          <div>
            



        <style jsx>{`
        .container {
          width: 350px;
        }
        .brand-container {
          margin-left: 15px;
        }
        .brand-filter{
          display: flex;
          flex-direction: column;
        }
    `}</style>
    </div>

  )
}