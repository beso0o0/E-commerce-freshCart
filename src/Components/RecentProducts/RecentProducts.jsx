import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts() {
  let { addProductToCart } = useContext(CartContext);
  let { removeFromWishlist, addToWishlist, getWishlist, wishlist } =
    useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [loadingProductId, setLoadingProductId] = useState(null); // Track loading state for each product

  // Fetch products and wishlist data
  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  // Update wishlistStatus based on fetched wishlist data
  useEffect(() => {
    const initialStatus = {};
    products.forEach((product) => {
      initialStatus[product.id] = wishlist?.data?.some(
        (item) => item.id === product.id
      );
    });
    setWishlistStatus(initialStatus);
  }, [products, wishlist]);

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((resp) => {
        setProducts(resp.data.data);
      })
      .catch(() => {});
  }

  const toggleWishlist = (productId) => {
    if (wishlistStatus[productId]) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setWishlistStatus({
      ...wishlistStatus,
      [productId]: !wishlistStatus[productId],
    });
  };

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId); // Set the loading state for the specific product
    try {
      await addProductToCart(productId);
    } finally {
      setLoadingProductId(null); // Reset the loading state after the operation
    }
  };

  return (
    <div className="row lg:py-8 shadow-lg lg:gap-6 justify-center">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            className="w-1/2 lg:w-1/6 lg:border border-green-400 shadow-lg  transform transition-transform duration-300 lg:hover:scale-105"
            key={product.id}
          >
            <div className="product my-2 mx-5 me-3 relative group">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} alt="" className="w-full" />
              </Link>
              <div className="flex justify-between py-3">
                <h3 className="text-green-600">{product.category.name}</h3>
                <i
                  onClick={() => toggleWishlist(product.id)}
                  className={`cursor-pointer text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-0 right-0 ${
                    wishlistStatus[product.id]
                      ? "fa-solid fa-heart"
                      : "fa-regular fa-heart"
                  }`}
                ></i>
              </div>
              <h3 className="mb-3 font-medium">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="row justify-between">
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star text-yellow-400"></i>{" "}
                  {product.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="btn"
                disabled={loadingProductId === product.id} // Disable button when loading
              >
                {loadingProductId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

/* 
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts() {
  let { addProductToCart } = useContext(CartContext);
  let { removeFromWishlist, addToWishlist, getWishlist, wishlist } =
    useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [loadingProductId, setLoadingProductId] = useState(null); // Track loading state for each product

  // Fetch products and wishlist data
  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  // Update wishlistStatus based on fetched wishlist data
  useEffect(() => {
    const initialStatus = {};
    products.forEach((product) => {
      initialStatus[product.id] = wishlist?.data?.some(
        (item) => item.id === product.id
      );
    });
    setWishlistStatus(initialStatus);
  }, [products, wishlist]);

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((resp) => {
        setProducts(resp.data.data);
      })
      .catch(() => {});
  }

  const toggleWishlist = (productId) => {
    if (wishlistStatus[productId]) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setWishlistStatus({
      ...wishlistStatus,
      [productId]: !wishlistStatus[productId],
    });
  };

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId); // Set the loading state for the specific product
    try {
      await addProductToCart(productId);
    } finally {
      setLoadingProductId(null); // Reset the loading state after the operation
    }
  };

  return (
    <div className="row p-8">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="w-1/2 lg:w-1/6" key={product.id}>
            <div className="product my-2 mx-5 me-3">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt="" className="w-full" />
              </Link>
              <div className="flex justify-between py-3">
                <h3 className=" text-green-600">{product.category.name}</h3>
                <i
                  onClick={() => toggleWishlist(product.id)}
                  className={`cursor-pointer text-red-500 ${
                    wishlistStatus[product.id]
                      ? "fa-solid fa-heart"
                      : "fa-regular fa-heart"
                  }`}
                ></i>
              </div>
              <h3 className="mb-3 font-medium">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="row justify-between px-3">
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star text-yellow-400"></i>{" "}
                  {product.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="btn"
                disabled={loadingProductId === product.id} // Disable button when loading
              >
                {loadingProductId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}
 */
