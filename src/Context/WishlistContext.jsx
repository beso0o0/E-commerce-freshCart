import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";


export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

  let {userLogin}=useContext(UserContext)

    let [wishlist,setWishlist]=useState([])
    let headers={
        token:localStorage.getItem("userToken"),
    }

//fuction to ADD product to wishlist
 async function addToWishlist(productId) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    toast.error("You need to be logged in to add products to the cart.");
    return;
  }
    await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,         
        {"productId": productId},
        {headers:headers},
    )
    .then((resp)=>{
        toast.success(resp.data.message ,{duration:2000});
        getWishlist(); // Refresh wishlist after adding a product
        setWishlist(resp.data)        
    })  
    .catch(()=>{})      
  }
  async function removeFromWishlist(productId){
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,         
        {headers:headers},
    )
    .then((resp)=>{
      getWishlist()
        toast.success(resp.data.message ,{duration:2000});
    })  
    .catch(()=>{})      
  }

  async function getWishlist(){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then((resp)=>{setWishlist(resp.data)
      setWishlist(resp.data)
    })
    .catch(()=>{})
  }

  useEffect(() => {
    if (headers.token) {
        getWishlist();
    }
}, [headers.token ,userLogin]);
  return (
    <WishlistContext.Provider value={{ addToWishlist , removeFromWishlist , getWishlist , wishlist , setWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
}
