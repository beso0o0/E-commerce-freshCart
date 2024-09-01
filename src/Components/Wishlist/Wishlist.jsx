import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist() {
  const { getWishlist, wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  
  const [loadingProductId, setLoadingProductId] = useState(null);

  useEffect(() => {
    document.title = "Wishlist";
  }, []);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId);
    try {
      await addProductToCart(productId);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <>
      <div className="relative lg:w-3/4 mx-auto shadow-md sm:rounded-lg m-10">
        <div className="m-5 p-5 flex items-center">
          <h1 className="text-2xl font-semibold text-gray-600">My Wishlist </h1>
          <i className="fa-solid fa-star text-main ms-2"></i>
        </div>
        {wishlist.count > 0 ? (
          <div className="px-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <tbody>
                {wishlist?.data?.map((product, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <div className="lg:flex items-center justify-between py-5 lg:py-0">
                      <div className="flex items-center">
                        <i
                          onClick={() => {
                            removeFromWishlist(product.id);
                          }}
                          className="me-4 cursor-pointer fa-solid fa-x"
                        ></i>
                        <img
                          src={product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.title}
                        />
                      </div>

                      <div className="my-5 text-xl">{product.title}</div>

                      <div className="my-5 font-semibold text-black">
                        {product.price} EGP
                      </div>

                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="my-5 lg:my-0 w-full lg:w-1/6 btn py-2 text-center flex items-center justify-center"
                        disabled={loadingProductId === product.id}
                      >
                        {loadingProductId === product.id ? (
                           <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <>
                            Add To Cart
                            <i className="ms-2 fa-solid fa-cart-shopping text-white text-xl"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <i className="fa-solid fa-heart-circle-exclamation text-green-600 text-8xl"></i>
            <h2 className="m-10 text-center text-2xl font-semibold text-main p-10">
              No Products In Your Wishlist
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
