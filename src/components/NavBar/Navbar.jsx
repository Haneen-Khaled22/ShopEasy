import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import shopicon from "../../assets/shopeasy.png";
import { useSelector } from "react-redux";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#user-menu")) setDropdownOpen(false);
    };
    if (dropdownOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  return (
    <>
      {/* ── Announcement bar ── */}
      <div
        style={{
          background: "linear-gradient(90deg, #f5f0e8 0%, #ede4d3 50%, #f5f0e8 100%)",
          borderBottom: "1px solid #ddd4c0",
        }}
        className="text-center py-2 px-4"
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a6f4e]">
          ✦ Free shipping on orders over $50 &nbsp;·&nbsp; Use code{" "}
          <span className="text-[#5c3d1e] font-medium">WELCOME20</span> for 20% off ✦
        </p>
      </div>

      {/* ── Main Navbar ── */}
      <nav
        style={{
          background: scrolled
            ? "white"
            : "#fffcf7",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 4px 32px rgba(100,70,40,0.1)" : "none",
          borderBottom: "1px solid #e8dfd0",
          transition: "all 0.35s ease",
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <NavLink to="/" className="flex items-center gap-3 group shrink-0">
              <div
                className="relative w-9 h-9 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 0 1px #ddd4c0, 0 4px 12px rgba(100,70,40,0.12)" }}
              >
                <img src={shopicon} alt="ShopEasy" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[17px] font-normal text-[#1a1410] tracking-wide"
                  style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}
                >
                  Shop<span style={{ color: "#8a5c2e", fontStyle: "italic" }}>Easy</span>
                </span>
                <span className="text-[8px] tracking-[0.35em] uppercase mt-0.5" style={{ color: "#b89870" }}>
                  Premium Store
                </span>
              </div>
            </NavLink>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative px-5 py-2 text-[13px] tracking-[0.08em] uppercase font-semibold transition-all duration-250 group
                    ${isActive ? "text-[#5c3d1e]" : "text-[#776a5d] hover:text-[#1a1410]"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 4,
                          left: "50%",
                          transform: "translateX(-50%)",
                          height: 1,
                          background: "linear-gradient(90deg, transparent, #8a5c2e, transparent)",
                          transition: "width 0.3s ease",
                          width: isActive ? "60%" : "0%",
                        }}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-3">

              {/* Sign In */}
              <button
                style={{
                  border: "1px solid #c8b49a",
                  color: "#776a5d",
                  background: "transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5c3d1e";
                  e.currentTarget.style.color = "#fffcf7";
                  e.currentTarget.style.borderColor = "#5c3d1e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#5c3d1e";
                  e.currentTarget.style.borderColor = "#c8b49a";
                }}
                className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-[12px] tracking-[0.12em] uppercase font-semibold cursor-pointer"
              >
                Sign In
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                style={{
                  background: "rgba(92,61,30,0.07)",
                  border: "1px solid #d4c4b0",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(92,61,30,0.13)";
                  e.currentTarget.style.borderColor = "#b89870";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(92,61,30,0.07)";
                  e.currentTarget.style.borderColor = "#d4c4b0";
                }}
                className="cursor-pointer relative w-10 h-10 rounded-full flex items-center justify-center"
              >
                <HiOutlineShoppingBag className="w-[18px] h-[18px]" style={{ color: "#5c3d1e" }} />
                {cart.length > 0 && (
                  <span
                    style={{
                      background: "#5c3d1e",
                      color: "#fffcf7",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                    className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                  >
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Avatar */}
              <div className="relative" id="user-menu">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    boxShadow: dropdownOpen
                      ? "0 0 0 2px #8a5c2e"
                      : "0 0 0 1px #d4c4b0",
                    transition: "box-shadow 0.25s ease",
                  }}
                  className="w-9 h-9 rounded-full overflow-hidden"
                >
                  <img src="https://i.pravatar.cc/40" alt="User" className="w-full h-full object-cover" />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    style={{
                      background: "#fffcf7",
                      border: "1px solid #e0d4c0",
                      boxShadow: "0 20px 60px rgba(100,70,40,0.15), 0 0 0 1px rgba(200,170,130,0.08)",
                    }}
                    className="absolute right-0 mt-3 w-52 rounded-2xl py-2 z-30 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b" style={{ borderColor: "#ede4d3" }}>
                      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#b89870" }}>My Account</p>
                    </div>

                    {[
                      { icon: "◎", label: "Your Profile" },
                      { icon: "⬡", label: "Settings" },
                    ].map(({ icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        style={{ transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#f5ede0"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#3d2b1a]"
                      >
                        <span className="text-xs" style={{ color: "#b89870" }}>{icon}</span>
                        {label}
                      </a>
                    ))}

                    <div className="border-t mx-4 my-1" style={{ borderColor: "#ede4d3" }} />

                    <a
                      href="#"
                      style={{ transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(200,50,50,0.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-600"
                    >
                      <span className="text-xs opacity-60">↩</span>
                      Sign out
                    </a>
                  </div>
                )}
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  background: "rgba(92,61,30,0.06)",
                  border: "1px solid #d4c4b0",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#b89870"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#d4c4b0"}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
              >
                {mobileOpen ? (
                  <svg className="w-4 h-4" style={{ color: "#5c3d1e" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" style={{ color: "#5c3d1e" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          style={{
            maxHeight: mobileOpen ? "360px" : "0px",
            opacity: mobileOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
            borderTop: mobileOpen ? "1px solid #e8dfd0" : "none",
            background: "#fffcf7",
          }}
        >
          <div className="px-5 pt-4 pb-6 space-y-1">
            {navLinks.map(({ to, label }, i) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-xl text-[13px] uppercase tracking-[0.1em] font-light transition-all duration-200
                  ${isActive
                    ? "bg-[#f0e4d0] text-[#5c3d1e] font-medium"
                    : "text-[#7a6555] hover:bg-[#f5ede0] hover:text-[#3d2b1a]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{label}</span>
                    {isActive && (
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8a5c2e", display: "inline-block" }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <div className="pt-3 mt-2" style={{ borderTop: "1px solid #e8dfd0" }}>
              <button
                style={{
                  border: "1px solid #c8b49a",
                  color: "#5c3d1e",
                  background: "transparent",
                }}
                className="w-full py-3 rounded-full text-[12px] tracking-[0.15em] uppercase font-light"
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
