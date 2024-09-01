import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import Products from "./Components/Products/Products.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Allorders from "./Components/Allorders/Allorders.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ProductsWithCategory from "./Components/ProductsWithCategory/ProductsWithCategory.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductsWithSameBrand from "./Components/ProductsWithSameBrand/ProductsWithSameBrand.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";

let query=new QueryClient()

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element:<ProtectedRoute><Cart /></ProtectedRoute>  },
      { path: "wishlist", element:<ProtectedRoute><Wishlist /></ProtectedRoute>  },
      { path: "products", element:<ProtectedRoute><Products /></ProtectedRoute>  },
      { path: "categories", element: <ProtectedRoute><Categories /> </ProtectedRoute>},
      { path: "productswithcategory/:categoryName", element: <ProtectedRoute><ProductsWithCategory /> </ProtectedRoute>},
      { path: "productswithsamebrand/:brandName", element: <ProtectedRoute><ProductsWithSameBrand /> </ProtectedRoute>},
      { path: "checkout", element: <ProtectedRoute><Checkout/></ProtectedRoute>},
      { path: "allorders", element: <ProtectedRoute><Allorders/></ProtectedRoute>},
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /> </ProtectedRoute>},
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "verifyresetcode", element: <VerifyResetCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
  <>
    <UserContextProvider>

  <WishlistContextProvider>
  <CartContextProvider>
    <QueryClientProvider client={query}>
  <RouterProvider router={routers}></RouterProvider>
  <Toaster />
  <ReactQueryDevtools/>
  </QueryClientProvider>
  </CartContextProvider>
  </WishlistContextProvider>
  </UserContextProvider>

  </>)
}

export default App;
