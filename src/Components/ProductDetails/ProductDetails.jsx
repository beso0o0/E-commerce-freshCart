import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  let [product, setProduct] = useState(null);
  let [relatedProduct, setRelatedProduct] = useState([]);
  let { id, category } = useParams();
  let { addProductToCart } = useContext(CartContext);
  let { removeFromWishlist, addToWishlist, getWishlist, wishlist } = useContext(WishlistContext);
  let [loading, setLoading] = useState(true);
  let [isInWishlist, setIsInWishlist] = useState(false);
  let [loadingProductId, setLoadingProductId] = useState(null); // Track loading state for each product

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  function getProductDetails(id) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((resp) => {
        setProduct(resp.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function allProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((resp) => {
        let relatedProducts = resp.data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProduct(relatedProducts);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId); // Set the loading state for the specific product
    try {
      await addProductToCart(productId);
    } finally {
      setLoadingProductId(null); // Reset the loading state after the operation
    }
  };

  useEffect(() => {
    getProductDetails(id);
    allProducts();
    getWishlist(); // Fetch wishlist data
  }, [id, category]);

  useEffect(() => {
    if (product && wishlist) {
      const inWishlist = wishlist.data?.some((item) => item.id === product.id);
      setIsInWishlist(inWishlist);
    }
  }, [product, wishlist]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="row items-center lg:p-10">
            <div className="w-full lg:w-1/4">
              {product?.images?.length > 1 ? (
                <Slider {...settings}>
                  {product?.images.map((src, index) => (
                    <img key={index} src={src} />
                  ))}
                </Slider>
              ) : (
                <img src={product?.imageCover} />
              )}
            </div>
            <div className="lg:w-3/4 p-4">
              <h3 className="text-2xl">{product?.title}</h3>
              <h4 className="text-gray-600 my-4">{product?.description}</h4>
              <div className="flex justify-between items-center">
                <h4 className="mb-2">{product?.category.name}</h4>
                <i
                  className={`cursor-pointer text-red-600 text-xl ${
                    isInWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"
                  }`}
                  onClick={toggleWishlist}
                ></i>
              </div>
              <div className="flex justify-between my-5">
                <span>{product?.price} EGP</span>
                <span>
                  <i className="fas fa-star text-yellow-400"></i>{" "}
                  {product?.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="btn py-1"
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

          <div className="row">
            {relatedProduct.map((relatedProduct) => (
              <div className="w-1/2 lg:w-1/6" key={relatedProduct.id}>
                <div className="product my-2 me-3">
                  <Link
                    to={`/productdetails/${relatedProduct.id}/${relatedProduct.category.name}`}
                  >
                    <img src={relatedProduct.imageCover} alt="" className="w-full" />
                    <h3 className=" text-green-600">{relatedProduct.category.name}</h3>
                    <h3 className="mb-3 font-medium">
                      {relatedProduct.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="row justify-between px-3">
                      <span>{relatedProduct.price}EGP</span>
                      <span>
                        <i className="fas fa-star text-yellow-400"></i>{" "}
                        {relatedProduct.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(relatedProduct.id)}
                    className="btn"
                    disabled={loadingProductId === relatedProduct.id} // Disable button when loading
                  >
                    {loadingProductId === relatedProduct.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

