import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import shopicon from "../../assets/shopeasy.png";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiLock, FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "../../Context/ThemeContext";
import { logout } from "../../Redux/Slices/AuthSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";



const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const {t} = useTranslation();

 const navLinks = [
  { to: "/", label: t("home") },
  { to: "/products", label: t("products") },
  { to: "/categories", label: t("categories") },
  { to: "/about", label: t("about") },
  { to: "/contact", label: t("contact") },
];

  const { toggleTheme, theme } = useContext(ThemeContext);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishList);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const IconButton = ({ onClick, children, badge }) => (
    <button
      onClick={onClick}
      className="cursor-pointer relative w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
        bg-[rgba(92,61,30,0.07)] border border-[#d4c4b0] dark:border-gray-600
        transition-all duration-300 hover:bg-[rgba(92,61,30,0.13)] hover:border-[#b89870]
        shrink-0"
    >
      {children}
      {badge > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center"
          style={{ background: "#5c3d1e", color: "#fffcf7", fontSize: 10, fontWeight: 700 }}
        >
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* ── Announcement bar ── */}
     <div
  className="
    flex flex-col sm:flex-row
    justify-center items-center
    py-2 px-3
    bg-gradient-to-r from-[#f5f0e8] via-[#ede4d3] to-[#f5f0e8]
    border-b border-[#ddd4c0]
    gap-0.5 xs:gap-2 sm:gap-4
  "
>
        <p className="text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8a6f4e] text-center leading-relaxed">
          ✦ Free shipping on orders over $50
        </p>
        <p className="text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8a6f4e] text-center leading-relaxed">
          Use code <span className="text-[#5c3d1e] font-medium">SHOPEASY20</span> for 20% off ✦
        </p>
      </div>

      {/* ── Main Navbar ── */}
      <nav className={`sticky top-0 z-50 border-b border-[#e8dfd0] dark:border-gray-700
        transition-all duration-300 ease-in-out w-full
        ${scrolled
          ? "bg-white dark:bg-black backdrop-blur-lg shadow-[0_4px_32px_rgba(100,70,40,0.1)]"
          : "bg-[#fffcf7] dark:bg-black"
        }`}
      >
        <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex items-center justify-between h-[56px] xs:h-[60px] sm:h-[68px]">

            {/* ── Logo ── */}
            <NavLink to="/" className="flex items-center gap-2 xs:gap-2.5 group shrink-0">
              <div className="relative w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 0 1px #ddd4c0, 0 4px 12px rgba(100,70,40,0.12)" }}>
                <img src={shopicon} alt="ShopEasy" className="w-full h-full object-cover dark:invert" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[14px] xs:text-[15px] sm:text-[17px] font-normal text-[#1a1410] dark:text-gray-300 tracking-wide"
                  style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}>
                  Shop<span className="dark:text-[#bd9e7d]">Easy</span>
                </span>
                <span className="hidden xs:block text-[7px] sm:text-[8px] tracking-[0.3em] sm:tracking-[0.35em] uppercase mt-0.5"
                  style={{ color: "#b89870" }}>
                  Premium Store
                </span>
              </div>
            </NavLink>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-0 lg:gap-0.5 xl:gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative px-2.5 lg:px-4 xl:px-5 py-2 text-[11px] lg:text-[12px] xl:text-[13px] tracking-[0.05em] lg:tracking-[0.07em] xl:tracking-[0.08em] uppercase font-semibold transition-all duration-250
                    ${isActive ? "text-[#5c3d1e] dark:text-[#ba8c5b]" : "text-[#776a5d] dark:text-[#bd9e7d] hover:text-[#1a1410] dark:hover:text-[#e0c9a8]"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span style={{
                        position: "absolute", bottom: 4, left: "50%",
                        transform: "translateX(-50%)", height: 1,
                        background: "linear-gradient(90deg, transparent, #8a5c2e, transparent)",
                        transition: "width 0.3s ease",
                        width: isActive ? "60%" : "0%",
                      }} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5">

              {/* Sign In — desktop only */}
              <button
                onClick={() => navigate("/login")}
                className="hidden lg:flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-full
                  text-[11px] xl:text-[12px] tracking-[0.1em] xl:tracking-[0.12em] uppercase font-semibold
                  border border-[#c8b49a] dark:border-gray-500
                  text-[#776a5d] dark:text-gray-300 bg-transparent
                  transition-all duration-300 ease-in-out cursor-pointer
                  hover:bg-[#5c3d1e] hover:text-[#fffcf7] hover:border-[#5c3d1e]"
              >
                {t("sign in")}
              </button>

              {/* Cart */}
              <IconButton onClick={() => navigate("/cart")} badge={cart.length}>
                <HiOutlineShoppingBag className="w-[16px] h-[16px] xs:w-[17px] xs:h-[17px] sm:w-[18px] sm:h-[18px] text-[#5c3d1e] dark:text-gray-300" />
              </IconButton>

              {/* Wishlist */}
              <IconButton onClick={() => navigate("/wishlist")} badge={wishlist.length}>
                <FiHeart className="w-[16px] h-[16px] xs:w-[17px] xs:h-[17px] sm:w-[18px] sm:h-[18px] text-[#5c3d1e] dark:text-gray-300" />
              </IconButton>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="cursor-pointer w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0
                  bg-[rgba(92,61,30,0.07)] border border-[#d4c4b0] dark:border-gray-600
                  transition-all duration-300 hover:bg-[rgba(92,61,30,0.13)] hover:border-[#b89870]"
              >
                {theme === "dark"
                  ? <FiSun className="w-[15px] h-[15px] xs:w-[16px] xs:h-[16px] text-[#5c3d1e] dark:text-yellow-500" />
                  : <FiMoon className="w-[15px] h-[15px] xs:w-[16px] xs:h-[16px] text-[#5c3d1e]" />
                }
              </button>

              {/* Sign Out — desktop only */}
              {token && (
                <button
                  onClick={() => setShowLogoutPopup(true)}
                  className="hidden md:flex items-center gap-1.5 cursor-pointer
                    px-3 xl:px-4 py-2 rounded-full
                    text-[10px] xl:text-[12px] tracking-[0.08em] xl:tracking-[0.1em] uppercase font-semibold
                    border border-red-200 dark:border-gray-300
                    text-red-700 dark:text-gray-300 bg-transparent
                    transition-all duration-300
                    hover:bg-red-600 hover:text-white hover:border-red-700"
                >
                  <FiLock className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                  <span className="hidden lg:inline">{t("sign out")}</span>
                </button>
              )}

              {/* ── Language Switcher — styled wrapper ── */}
              <div className="shrink-0
               
              ">
                <LanguageSwitcher/>
              </div>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 xs:w-9 xs:h-9 rounded-full flex items-center justify-center shrink-0
                  bg-[rgba(92,61,30,0.06)] border border-[#d4c4b0] dark:border-gray-600
                  transition-all duration-200 hover:border-[#b89870] cursor-pointer"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={mobileOpen ? "open" : "closed"}
                  className="flex flex-col justify-center items-center w-4 h-4 gap-[4px]"
                >
                  <motion.span
                    variants={{ open: { rotate: 45, y: 6 }, closed: { rotate: 0, y: 0 } }}
                    transition={{ duration: 0.25 }}
                    className="block h-[1.5px] w-4 bg-[#5c3d1e] dark:bg-gray-300 rounded-full origin-center"
                  />
                  <motion.span
                    variants={{ open: { opacity: 0, scaleX: 0 }, closed: { opacity: 1, scaleX: 1 } }}
                    transition={{ duration: 0.2 }}
                    className="block h-[1.5px] w-4 bg-[#5c3d1e] dark:bg-gray-300 rounded-full"
                  />
                  <motion.span
                    variants={{ open: { rotate: -45, y: -6 }, closed: { rotate: 0, y: 0 } }}
                    transition={{ duration: 0.25 }}
                    className="block h-[1.5px] w-4 bg-[#5c3d1e] dark:bg-gray-300 rounded-full origin-center"
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-[#e8dfd0] dark:border-gray-700
                bg-[#fffcf7] dark:bg-black"
            >
              <div className="px-3 xs:px-4 sm:px-6 pt-3 pb-5 space-y-1">
                {navLinks.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <NavLink
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl
                        text-[12px] uppercase tracking-[0.1em] font-light transition-all duration-200
                        ${isActive
                          ? "bg-[#f0e4d0] text-[#5c3d1e] dark:bg-[#2a1f12] dark:text-[#d4a574] font-medium"
                          : "text-[#7a6555] dark:text-gray-400 hover:bg-[#f5ede0] dark:hover:bg-[#1a1208] hover:text-[#3d2b1a]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{label}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8a5c2e]" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Mobile bottom actions */}
                <div className="pt-3 mt-1 space-y-2 border-t border-[#e8dfd0] dark:border-gray-700">

                  {/* Sign In */}
                  <button
                    onClick={() => { navigate("/login"); setMobileOpen(false); }}
                    className="cursor-pointer w-full py-3 rounded-full
                      text-[12px] tracking-[0.15em] uppercase font-light
                      border border-[#c8b49a] dark:border-gray-500
                      text-[#5c3d1e] dark:text-gray-300 bg-transparent
                      hover:bg-[#5c3d1e] hover:text-[#fffcf7] hover:border-[#5c3d1e]
                      transition-colors duration-200"
                  >
                    {t("sign in")} / {t("sign up")}
                  </button>

                  {token && (
                    <button
                      onClick={() => { setShowLogoutPopup(true); setMobileOpen(false); }}
                      className="cursor-pointer w-full py-3 rounded-full
                        text-[12px] tracking-[0.15em] uppercase font-light
                        border border-red-200 dark:border-red-900
                        text-red-500 dark:text-red-400 bg-transparent
                        hover:bg-red-500 hover:text-white hover:border-red-500
                        transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FiLock className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Logout Popup ── */}
      <AnimatePresence>
        {showLogoutPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={(e) => e.target === e.currentTarget && setShowLogoutPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white dark:bg-[#0f0a06] p-6 xs:p-7 rounded-3xl shadow-2xl w-full max-w-[300px] xs:max-w-[320px] text-center"
              style={{ border: "1px solid #e8dfd0" }}
            >
              <div className="text-4xl mb-3">🔒</div>
              <h3
                className="text-lg font-light mb-2 text-[#1a1410] dark:text-gray-200"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
              >
                Are you sure?
              </h3>
              <p className="text-xs text-[#776a5d] dark:text-gray-400 mb-6">
                You will be logged out of your account.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowLogoutPopup(false)}
                  className="cursor-pointer px-4 xs:px-5 py-2.5 rounded-full text-sm font-light
                    border border-[#d4c4b0] dark:border-gray-600
                    text-[#776a5d] dark:text-gray-400 bg-transparent
                    hover:bg-[#f5ede0] dark:hover:bg-[#1a1208] transition-colors duration-200"
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setLogoutLoading(true);
                    setTimeout(() => {
                      handleSignOut();
                      setLogoutLoading(false);
                      setShowLogoutPopup(false);
                    }, 500);
                  }}
                  className="cursor-pointer px-4 xs:px-5 py-2.5 rounded-full text-sm font-light text-white
                    transition-all duration-200 min-w-[90px] xs:min-w-[100px]"
                  style={{ background: "#5c3d1e" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#3d2b1a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#5c3d1e")}
                >
                  {logoutLoading ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Signing out…
                    </span>
                  ) : "Sign Out"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
