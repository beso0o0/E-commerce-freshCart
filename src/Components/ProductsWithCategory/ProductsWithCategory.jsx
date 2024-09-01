import React, { useContext, useEffect, useState } from "react";
import style from "./ProductsWithCategory.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import image from '../../assets/images/no_result.gif'
import { CartContext } from "../../Context/CartContext";

export default function ProductsWithCategory() {
  let { categoryName } = useParams();
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true); // Loading state
  const [loadingProductId, setLoadingProductId] = useState(null); // Track loading state for each product
  let { addProductToCart } = useContext(CartContext);


  async function allProducts() {
    try {
      const resp = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      let productsWithTheSameCategory = resp.data.data.filter(
        (product) => product.category.name === categoryName
      );
      setProducts(productsWithTheSameCategory);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }
  useEffect(() => {
    allProducts();
  }, [categoryName]);

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId); // Set the loading state for the specific product
    try {
      await addProductToCart(productId);
    } finally {
      setLoadingProductId(null); // Reset the loading state after the operation
    }
  };

  return (
    <div className="row">
      {loading ? (
        <Loading />
      ) : products.length > 0 ? (
        products.map((product) => (
          <div className=" w-1/2 lg:w-1/6" key={product.id}>
            <div className="product my-2 me-3">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} alt="" className="w-full" />
                <h3 className=" text-green-600">{product.category.name}</h3>
                <h3 className="mb-3 font-medium	">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="row justify-between px-3">
                  <span>{product.price}EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button onClick={() => handleAddToCart(product.id)}
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
        <div className="w-full p-11">
        <img src={image} className="w-[600px] m-auto" alt="" />

        </div>
      )}
    </div>
  );
}
