import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiGlobe, FiPhone, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalidEmail"))
      .required(t("emailRequired")),
    password: Yup.string()
      .min(6, t("passwordMin"))
      .required(t("passwordRequired")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      country: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser(values)).unwrap();
        localStorage.setItem("token", "dummy-token");
        navigate("/");
        enqueueSnackbar(t("loginSuccess"), { variant: "success" });
      } catch (error) {
        console.log("Sign in failed:", error);
      }
    },
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error]);

  const inputBase =
    "w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 " +
    "bg-[#ede3da] dark:bg-[#1e1612] text-[#3d332b] dark:text-[#e0cfc0] " +
    "border border-[#cfc0b2] dark:border-[#3d3028] " +
    "focus:border-[#776a5d] dark:focus:border-[#a89080] placeholder:text-[#b0a090] dark:placeholder:text-[#5a4f45]";

  const labelBase =
    "block text-xs font-semibold uppercase tracking-widest mb-2 text-[#776a5d] dark:text-[#a89080]";

  const iconBase =
    "absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9e8e81] dark:text-[#6a5e55]";

  const fields = [
    { name: "name",     label: t("fullName"),     type: "text",     placeholder: t("fullNamePlaceholder"),   icon: <FiUser /> },
    { name: "email",    label: t("email"), type: "email",    placeholder: t("emailPlaceholder"),  icon: <FaEnvelope /> },
    { name: "phone",    label: t("phone"),  type: "text",     placeholder: t("phonePlaceholder"),      icon: <FiPhone /> },
    { name: "country",  label: t("country"),       type: "text",     placeholder: t("countryPlaceholder"),     icon: <FiGlobe /> },
    { name: "password", label: t("password"),      type: "password", placeholder: t("passwordPlaceholder"),         icon: <FaLock /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12
      bg-[#f0ebe5] dark:bg-[#0d0a08] transition-colors duration-300">

      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl
        bg-[#fff8f3] dark:bg-[#141008] border border-[#e8ddd4] dark:border-[#2a201a]
        transition-colors duration-300">

        {/* Top accent bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: "linear-gradient(to right, #776a5d, #a89080, #c4a882)" }}
        />

        <div className="px-8 sm:px-10 py-10">

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4
              bg-[#ede3da] dark:bg-[#1e1612] text-[#776a5d] dark:text-[#a89080]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#776a5d] dark:bg-[#a89080]" />
              {t("badge")}
            </div>

            <h2 className="text-3xl font-bold leading-tight text-[#3d332b] dark:text-[#e0cfc0]">
              {t("title")}
            </h2>
            <p className="mt-2 text-sm text-[#9e8e81] dark:text-[#6a5e55]">
              {t("subtitle")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {fields.map(({ name, label, type, placeholder, icon }) => (
              <div key={name}>
                <label className={labelBase}>{label}</label>
                <div className="relative">
                  <span className={iconBase}>{icon}</span>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputBase}
                  />
                </div>

                {/* Error */}
                {formik.touched[name] && formik.errors[name] && (
                  <div className="flex items-center gap-2 mt-1.5 px-4 py-2.5 rounded-xl text-xs
                    bg-[#fde8e8] dark:bg-[#2a1010] text-[#b04040] dark:text-[#e08080]
                    border border-[#f5c0c0] dark:border-[#4a1a1a]">
                    <span>⚠</span>
                    {formik.errors[name]}
                  </div>
                )}
              </div>
            ))}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-3 mt-2 rounded-xl font-bold text-sm tracking-wide
                transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60
                bg-[#776a5d] hover:bg-[#5c3d1e] dark:bg-[#5c3d1e] dark:hover:bg-[#3d2b1a]
                text-[#fffcf7]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {t("submitting")}
                </span>
              ) : (
                t("submit")
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;
