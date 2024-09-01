import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export let CartContext =createContext()

export default function CartContextProvider ({children}){

    let {userLogin}=useContext(UserContext)
    
    let [cart,setCart]=useState([])
    let [isLoading,setIsLoading]=useState(false)

    let headers={
        token:localStorage.getItem("userToken"),
    }

    
    async function addProductToCart(productId){
        const token = localStorage.getItem("userToken");
        if (!token) {
          toast.error("You need to be logged in to add products to the cart.");
          return;
        }
    
        setIsLoading(true)
       await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
            "productId": productId
            }
            ,
            {headers:headers},
    )
    .then((resp)=>{
        toast.success(resp.data.message ,{duration:2000});
        getCart(); // Refresh cart after adding a product

        setCart(resp.data)
        setIsLoading(false)  
    })
    .catch(()=>{})
    }
    function getCart(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {headers:headers},
    )
    .then((resp)=>{
        setCart(resp.data)
    })
    .catch((resp)=>{console.log(resp);
    })
    }

    function updateCart(productId, count) {
        if(count>0){
            axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
        .then((resp) => {
            setCart(resp.data); // Update the state with the new cart data
            toast.success('Product quantity updated!', { duration: 1000 });
        })
        .catch((error) => {
            console.error('Error updating the cart:', error);
            toast.error('Failed to update product quantity.');
        });
        }
    }
    function deleteProduct(productId) {
            axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
        .then((resp) => {
            setCart(resp.data); // Update the state with the new cart data
            toast.success('Product deleted successfully!', { duration: 2000 });
        })
        .catch((error) => {
            console.error('Error deleting this product', error);
            toast.error('Error deleting the product.');
        });
    }

    function checkout(shippingAddress){
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`, {shippingAddress}, {headers})
        .then((resp)=>{
            console.log(resp.data);
            // Remove any trailing slash from session URL before navigating
            window.location.href = resp.data.session.url.replace(/\/$/, "");
        })
        .catch((resp)=>{
            console.log(resp);
        })
    }
    
    function clearCart(){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then(()=>{})
        .catch((resp)=>{
            console.log(resp);
        })
    }
    
    useEffect(() => {
        if (headers.token) {
            getCart();
        }
    }, [headers.token , userLogin]);
    
    return <CartContext.Provider value={{addProductToCart,getCart ,cart,setCart , updateCart,deleteProduct,checkout,clearCart , isLoading}}>
        {children}
    </CartContext.Provider>
}