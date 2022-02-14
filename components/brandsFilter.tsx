import { Dispatch, SetStateAction, useState } from "react";
import React from "react";

export const BrandsFilter  = (props: {brands: string[], setBrands: Dispatch<SetStateAction<string[]>>}) => {

  const [firstCheck, setFirstCheck] = useState(false);

  const brandHandler = (e: {target: HTMLInputElement}) => {

      if(e.target.checked && firstCheck === true){
        let name: string = e.target.name;
        let newArray: string[] = [...props.brands, name];
        props.setBrands(newArray);
      }

      if(!e.target.checked){
        let name: string = e.target.name;
        let newArray: string[] = [];
        props.brands.forEach((brand) => {
          if( brand !== name){
            newArray.push(brand)
          }
        })

        props.setBrands(newArray);
      }

      if(firstCheck === false && e.target.checked){
        let newArray = [e.target.name];
        props.setBrands(arr => [...newArray]);
        setFirstCheck(true);
      }

      if(!e.target.checked && props.brands.length === 1){
        props.setBrands(["Apple", "Xiaomi", "Samsung"]);
        setFirstCheck(false);
      }

  }

  return (
    <div className="container">
      <div className="brand-container">
        <p>Choose brand your</p>
        <div className="brand-filter">
          <div>
            <input id="apple" name="Apple" type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ brandHandler(e)}}/>
            <label htmlFor="apple">Apple</label>
          </div>
          <div>
            <input id="xiaomi" name="Xiaomi" type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ brandHandler(e)}}/>
            <label htmlFor="xiaomi">Xiaomi</label>
          </div>
          <div>
            <input id="samsung" name="Samsung" type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ brandHandler(e)}}/>
            <label htmlFor="samsung">Samsung</label>
          </div>
        </div>
      </div>
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