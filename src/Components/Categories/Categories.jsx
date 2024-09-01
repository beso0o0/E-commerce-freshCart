import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from "../Loading/Loading";

export default function Categories() {
  let [categories,setCategories]=useState([])
  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((resp)=>{setCategories(resp.data.data)
    })
    .catch(()=>{})
  }

  useEffect(() => {
    document.title = "Categories";
  }, []);

  useEffect(()=>{
    getCategories()
  },[])
    
  return <>
    
    <div className="container text-gray-600 mb-14">
  <div className="row gap-10 justify-center">
    {categories.length>0? categories.map((category,index)=>(
          <div key={index} className="m-4 p-5 item lg:w-1/4 h-[350px]">
              <Link to={`/ProductsWithCategory/${category.name}`}>
              <div className= 'shadow-xl p-5 transform transition-transform duration-300 hover:scale-105'>
              <img src={category?.image}  className='w-[250px] h-[300px] m-auto' alt="" />
              <h1 className='text-center text-xl font-medium mt-6 font-sans'>{category?.name}</h1>
              </div>
              </Link>
        </div>
    
    )):<Loading/>}
  </div>
</div>

  
  </>
}
