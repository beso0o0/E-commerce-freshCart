import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let {userLogin,setUserLogin}=useContext(UserContext)
  const navigate = useNavigate();
  let [apiError, setApiError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  async function register(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (resp) {
        setIsLoading(false);
        if (resp.data.message == "success") {
          localStorage.setItem("userToken", resp.data.token);
          localStorage.setItem("userEmail", values.email);
          setUserLogin(resp.data.token)
          navigate("/");
        }
      })
      .catch(function (resp) {
        setApiError(resp.response.data.message);
        setIsLoading(false);
      });
  }
  let validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email is required"),
    password: yup
      .string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "password should be between 6 and 10 char"
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: register,
    validationSchema,
  });



  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <div className=" lg:w-1/2 mx-auto my-10 mb-14 mt-24 shadow-lg px-8 py-3">
        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {apiError}
          </div>
        )}
        <div className="flex text-3xl justify-center gap-x-2 text-green-700 font-bold mb-10">
        <i className="fa-solid fa-user"></i>
        <h1>
          Login Now
        </h1>
        </div>
        
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.password}
            </div>
          )}

          <div className="lg:flex gap-3 items-center text-blue-500">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <Link to={"/register"}><span>don't Have an account ? <span className="text-green-700">Register Now</span> </span></Link>
            
          </div>
          <Link to={"/forgotpassword"}><span className="text-green-600 my-3"> Forgot Your Password ?</span></Link>
        </form>
      </div>
    </>
  );
}
