import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    email:Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    ,
    
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  })

  const formik = useFormik({
    initialValues:{
        email:"",
        password:""
    },
    validationSchema,
     onSubmit: async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap();
        localStorage.setItem("token", "dummy-token");

      // 3️⃣ navigate للصفحة الرئيسية
      navigate("/");
      
      enqueueSnackbar("Registered successfully!", { variant: "success" });
    } catch (error) {
      // لو فيه error → هيتم إظهاره من slice + useSnackbar
      console.log("Registration failed:", error);
    }
  },
  })

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error]);

  
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      //   style={{ backgroundColor: "#f0ebe5" }}
    >
      <div
        className="w-full max-w-md rounded-3xl  overflow-hidden"
        style={{ backgroundColor: "#fff8f3" }}
      >
        {/* Top accent bar */}
        <div
          className="h-2 w-full"
          style={{
            background: "linear-gradient(to right, #776a5d, #a89080, #c4a882)",
          }}
        />

        <div className="px-10 py-10">
          {/* Header */}
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ backgroundColor: "#ede3da", color: "#776a5d" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#776a5d" }}
              />
              Welcome Back
            </div>
            <h2
              className="text-3xl font-bold leading-tight"
              style={{ color: "#3d332b" }}
            >
              Sign up 
              <br />
              {/* <span style={{ color: "#776a5d" }}>account</span> */}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#9e8e81" }}>
              Enter your credentials below to sign up
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#776a5d" }}
              >
                Email Address
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: "#9e8e81" }}
                >
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "#ede3da",
                    color: "#3d332b",
                    border: "1.5px solid #cfc0b2",
                  }}
                  onFocus={(e) =>
                    (e.target.style.border = "1.5px solid #776a5d")
                  }
                
                />
              </div>
              {formik.touched.email && formik.errors.email && (
  <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{
                  backgroundColor: "#fde8e8",
                  color: "#b04040",
                  border: "1px solid #f5c0c0",
                }}
              >
                <span>⚠</span> {formik.errors.email}
              </div>
)}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#776a5d" }}
              >
                Password
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: "#9e8e81" }}
                >
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                 value={formik.values.password}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "#ede3da",
                    color: "#3d332b",
                    border: "1.5px solid #cfc0b2",
                  }}
                  onFocus={(e) =>
                    (e.target.style.border = "1.5px solid #776a5d")
                  }
                 
                />
              </div>
              {formik.touched.password && formik.errors.password && (
  <p className="text-red-500 text-xs mt-1">
    {formik.errors.password}
  </p>
)}
            </div>

           

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className=" cursor-pointer w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{ background: "#776a5d", color: "#fffcf7" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#5c3d1e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#3d2b1a")
              }
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#cfc0b2" }}
            />
            <span className="text-xs" style={{ color: "#9e8e81" }}>
              New here?
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#cfc0b2" }}
            />
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Register;
