import React, { useState } from "react";
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div className="h-screen flex justify-center items-center w-full">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    </>
  );
}
