import React, { useState } from "react";
import style from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  let [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  async function forgotPassword(values) {
    setLoading(true)
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((resp) => {
        console.log(resp);
        navigate('/VerifyResetCode')
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: localStorage.getItem("userEmail"),
    },
    onSubmit: forgotPassword,
    validationSchema,
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:w-1/3 m-auto gap-y-3 mt-10">
        <div className="h-24 w-24 rounded-full bg-green-600 flex justify-center items-center">
          <i className="fa-solid fa-lock text-white text-5xl"></i>
        </div>
        <h2 className="font-semibold text-xl">Recover your password</h2>
        <p className="text-center">
          You can request a password reset below. We will send a security code
          to the email address, please make sure it is correct.
        </p>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer rounded-lg"
              placeholder=" Enter Your Email "
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}
          <button
            type="submit"
            className="btn focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
          >
             {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Send Code"
              )} 
          </button>
        </form>
      </div>
    </>
  );
}
