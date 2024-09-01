import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorieaSlider from '../CategorieaSlider/CategorieaSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {

  useEffect(() => {
    document.title = "Home";
  }, []);


    
  return <>
    <MainSlider/>
    <CategorieaSlider/>
    <RecentProducts/>
  </>
}
