import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className=" text-gray-200 mt-12 pt-10 pb-6"
      style={{
        background:
          "linear-gradient(135deg, #1a1410 0%, #3d2b1f 50%, #6b4c36 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🏢 About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("shopName")}</h2>
          <p className="text-gray-400 text-sm">{t("aboutText")}</p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t("quickLinks")}</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">{t("home")}</li>
            <li className="hover:text-white cursor-pointer">{t("products")}</li>
            <li className="hover:text-white cursor-pointer">{t("categories")}</li>
            <li className="hover:text-white cursor-pointer">{t("aboutUs")}</li>
            <li className="hover:text-white cursor-pointer">{t("contact")}</li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t("contactUs")}</h3>
          <p className="text-gray-400 text-sm mb-2 cursor-pointer hover:text-white">{t("address")}</p>
          <p className="text-gray-400 text-sm mb-2 cursor-pointer hover:text-white">{t("email")}</p>
          <p className="text-gray-400 text-sm mb-2 cursor-pointer hover:text-white">{t("phone")}</p>
        </div>

        {/* 🌐 Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t("followUs")}</h3>
          <div className="flex items-center gap-4 text-gray-400">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" size={20} />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" size={20} />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" size={20} />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" size={20} />
          </div>
        </div>
      </div>

      {/* ⚡ Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
         {i18next.language === "ar" ? (
    <>
      {t("copyright")}. ShopEasy&copy; {new Date().getFullYear()} 
    </>
  ) : (
    <>
      &copy; {new Date().getFullYear()} ShopEasy. {t("copyright")}.
    </>
  )}
      
      </div>
    </footer>
  );
};

export default Footer;