import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import image from "../../assets/images/istockphoto-898475764-612x612.jpg";
export default function Cart() {
  let { getCart, cart, updateCart, deleteProduct } = useContext(CartContext);

  useEffect(() => {
    document.title = "Cart";
  }, []);

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <div className="relative w-full flex mx-auto sm:rounded-lg m-10">
        {cart.numOfCartItems > 0 ? (
          <>
            <div className=" lg:w-3/4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th
                      colSpan={5}
                      className="flex items-center justify-between p-3"
                    >
                      <span className="text-2xl">
                        {" "}
                        Cart ({cart.numOfCartItems})
                      </span>
                      <span className="lg:hidden ms-4">
                        Total cart price :{" "}
                        <span className="text-green-600">
                          {" "}
                          {cart?.data?.totalCartPrice} EGP{" "}
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.data?.products?.map((product, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50 "
                    >
                      <td colSpan={5} className="text-black">
                        <div className="lg:flex justify-between items-center px-10">
                          <div className="lg:flex items-center text-xl">
                            <img
                              src={product.product.imageCover}
                              className="w-16 md:w-32 max-w-full max-h-full me-4"
                              alt=""
                            />

                            {product.product.title}
                          </div>

                          <div className="font-bold md:text-xl">
                            EGP {product.price}.00
                          </div>
                        </div>
                        <div className="flex justify-between pe-2">
                          <button
                            onClick={() => {
                              deleteProduct(product.product.id);
                            }}
                            className="lg:ms-10 font-medium text-red-600 hover:bg-red-300 px-2 m-3 rounded-md"
                          >
                            <i className="fa-regular fa-trash-can me-2"></i>
                            REMOVE
                          </button>
                          <div className="flex items-center">
                            <button
                              onClick={() => {
                                updateCart(
                                  product.product.id,
                                  product.count - 1
                                );
                              }}
                              className="px-4 py-1 m-3 bg-green-600 text-sm font-medium text-white rounded-md"
                              type="button"
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <div>
                              <span>{product.count}</span>
                            </div>
                            <button
                              onClick={() => {
                                updateCart(
                                  product.product.id,
                                  product.count + 1
                                );
                              }}
                              className="px-4 py-1 m-3 bg-green-600 text-sm font-medium text-white rounded-md "
                              type="button"
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr className="lg:hidden">
                    <Link to={"/checkout"}>
                      <button
                        type="button"
                        className="w-full btn mt-2 py-2.5 text-center flex items-center justify-center my-4"
                      >
                        <svg
                          className="w-4 h-4 me-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 21"
                        >
                          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        CheckOut Now ({cart?.data?.totalCartPrice} EGP)
                      </button>
                    </Link>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="hidden lg:block w-1/4 h-[200px] mx-10 bg-gray-100 p-5 rounded-lg shadow-lg">
              <table className="w-full text-black">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th colSpan="2" className="text-left py-3">
                      CART SUMMARY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="text-left">
                      <h2 className="py-4">Total Cart Price</h2>
                    </td>
                    <td className="text-right">
                      <h2 className="font-bold">
                        {cart?.data?.totalCartPrice} EGP
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <Link to={"/checkout"}>
                      <button
                        type="button"
                        className="btn py-2 text-center flex items-center justify-center my-4"
                      >
                        <svg
                          className="w-4 h-4 me-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 21"
                        >
                          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        CheckOut Now
                      </button>
                    </Link>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5 m-auto">
            <img src={image} className="w-[150px]" alt="" />
            <h2>Your cart is empty!</h2>
            <p>Browse our categories and discover our best deals!</p>

            <button className="mb-5 bg-[#12a822] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center hover:bg-green-700">
              <Link to={"/"} className="text-white hover:text-white">
                Start Shopping
              </Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
