import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from "../Loading/Loading";

export default function Brands() {

  let[brands,setBrands]= useState([])
  async function getBrands(){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((resp)=>{
      setBrands(resp.data.data)      
    })
    .catch(()=>{})
  }

  useEffect(() => {
    document.title = "Brands";
  }, []);

useEffect(()=>{
  getBrands()
},[])
    
  return <>
    <div className="container text-gray-600 mt-14">
  <div className="row gap-x-10 justify-center">
    {brands.length>0? brands.map((brand,index)=>(
          <div key={index} className="item lg:w-1/4 h-[350px]">
              <Link to={`/ProductsWithSameBrand/${brand.name}`}>
          <img src={brand?.image}  className='shadow-lg w-96 transform transition-transform duration-300 hover:scale-105' alt="" />
          </Link>
        </div>
    )):<Loading/>}
  </div>
</div>

  </>
}
