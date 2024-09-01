import React, { useState } from "react";
import style from "./Footer.module.css";
import image1 from "../../assets/images/IMG-20240827-WA0010.jpg";
import image2 from "../../assets/images/IMG-20240827-WA0011.jpg";
import image3 from "../../assets/images/IMG-20240827-WA0013.jpg";
import image4 from "../../assets/images/IMG-20240827-WA0014.jpg";
import image5 from "../../assets/images/IMG-20240827-WA0009.jpg";
import image6 from "../../assets/images/IMG-20240827-WA0012.jpg";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-200 mb-[-25px] capitalize p-10 ">
        <h1 className="mb-2">Get The FreshCart aPP</h1>
        <h3 className="text-gray-600">
          We will send you a link , open it in your phone to download the app.
        </h3>
        <input
          type="text"
          className="w-3/4 me-5 p-1 rounded-md mt-4 lg:ms-2 my-5 lg:my-0"
          placeholder="Email.."
        />
        <button className="bg-green-600 px-10 py-1 text-white rounded-md">
          Share App Link
        </button>
        <div className="md:flex justify-between md:pe-36 items-center mt-5">
          <div className="md:flex items-center">
            <h2 className="me-2 mb-2 md:mb-0">Payment partners</h2>
            <div className="flex gap-x-3 items-center mb-2 md:mb-0">
              <img src={image1} className="w-10 rounded-full" alt="" />
              <img src={image2} className="w-10 rounded-full" alt="" />
              <img src={image3} className="w-10 rounded-full" alt="" />
              <img src={image4} className="w-10 rounded-full" alt="" />
            </div>
          </div>

          <div className="md:flex items-center mb-2 md:mb-0">
            <h2 className="me-2 mb-2 md:mb-0">Get deliveries with fresh cart </h2>
            <div className="flex gap-x-3 items-center">
              <img src={image5} className="w-24" alt="" />
              <img src={image6} className="w-24" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
