import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Redux/Slices/CartSlice";

const steps = ["Shipping", "Payment", "Review"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" } }),
};

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0=Shipping, 1=Payment, 2=Review
  const [placed, setPlaced] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "", country: "",
  });

  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const [method, setMethod] = useState("card"); // card | cod

  const subtotal = cart.reduce((sum, p) => sum + (p.price - (p.price * p.discountPercentage) / 100), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleShippingChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => {
    let val = e.target.value;
    if (e.target.name === "cardNumber") val = val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
    if (e.target.name === "expiry") val = val.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2").slice(0, 5);
    if (e.target.name === "cvv") val = val.replace(/\D/g, "").slice(0, 4);
    setPayment({ ...payment, [e.target.name]: val });
  };

  const handlePlaceOrder = () => {
    setPlaced(true);
    dispatch(clearCart());
    setTimeout(() => navigate("/"), 3500);
  };

  // ── Shared input style
  const inputCls = `w-full px-4 py-3 rounded-xl text-sm font-light outline-none transition-all duration-200 bg-[#fdf9f4] border border-[#ddd0be] focus:border-[#8a5c2e] focus:ring-2 focus:ring-[#8a5c2e]/10 placeholder:text-[#b8a898] text-[#3d2b1a]`;

  return (
    <div className="min-h-screen bg-[#faf8f4]">

      {/* ── TOP BAR ── */}
      <div
        style={{ background: "#ede4d3", borderBottom: "1px solid #ddd0be" }}
        className="px-6 py-4 flex items-center justify-between"
      >
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-sm font-light text-[#776a5d] hover:text-[#3d2b1a] transition-colors"
        >
          ← Back to Cart
        </button>
        <span
          className="text-lg font-light text-[#1a1410]"
          style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
        >
          Shop<span style={{ color: "#8a5c2e", fontStyle: "italic" }}>Easy</span>
        </span>
        <span className="text-xs text-[#9a8878] tracking-widest uppercase">Secure Checkout 🔒</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── STEP INDICATOR ── */}
        <motion.div
          className="flex items-center justify-center gap-0 mb-12"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-light transition-all duration-400 relative"
                  style={{
                    background: i < step ? "#5c3d1e" : i === step ? "#8a5c2e" : "#e8dfd0",
                    color: i <= step ? "#fffcf7" : "#9a8878",
                    boxShadow: i === step ? "0 0 0 4px rgba(138,92,46,0.18)" : "none",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className="text-[11px] uppercase tracking-widest"
                  style={{ color: i === step ? "#5c3d1e" : "#9a8878" }}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-24 h-px mx-2 mb-6 transition-all duration-500"
                  style={{ background: i < step ? "#8a5c2e" : "#ddd0be" }}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT: FORM STEPS ── */}
          <div className="flex-1">
            <AnimatePresence mode="wait">

              {/* STEP 0 — SHIPPING */}
              {step === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-3xl p-8"
                  style={{ border: "1px solid #e8dfd0", boxShadow: "0 4px 24px rgba(100,70,40,0.06)" }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-6 rounded-full" style={{ background: "#8a5c2e" }} />
                    <h2
                      className="text-xl font-light text-[#1a1410]"
                      style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
                    >
                      Shipping <span className="italic text-[#8a5c2e]">Details</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "First Name", name: "firstName", placeholder: "John" },
                      { label: "Last Name", name: "lastName", placeholder: "Doe" },
                      { label: "Email Address", name: "email", placeholder: "john@example.com", full: true },
                      { label: "Phone Number", name: "phone", placeholder: "+1 234 567 8900" },
                      { label: "Country", name: "country", placeholder: "United States" },
                      { label: "Street Address", name: "address", placeholder: "123 Main St", full: true },
                      { label: "City", name: "city", placeholder: "New York" },
                      { label: "ZIP Code", name: "zip", placeholder: "10001" },
                    ].map((field, i) => (
                      <motion.div
                        key={field.name}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className={field.full ? "sm:col-span-2" : ""}
                      >
                        <label className="block text-[11px] uppercase tracking-widest text-[#9a8878] mb-1.5">
                          {field.label}
                        </label>
                        <input
                          name={field.name}
                          value={shipping[field.name]}
                          onChange={handleShippingChange}
                          placeholder={field.placeholder}
                          className={inputCls}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="mt-8 w-full py-4 rounded-xl text-sm tracking-widest uppercase font-light text-[#fffcf7] transition-all duration-300"
                    style={{ background: "#3d2b1a" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#5c3d1e"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#3d2b1a"}
                  >
                    Continue to Payment →
                  </motion.button>
                </motion.div>
              )}

              {/* STEP 1 — PAYMENT */}
              {step === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-3xl p-8"
                  style={{ border: "1px solid #e8dfd0", boxShadow: "0 4px 24px rgba(100,70,40,0.06)" }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-6 rounded-full" style={{ background: "#8a5c2e" }} />
                    <h2
                      className="text-xl font-light text-[#1a1410]"
                      style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
                    >
                      Payment <span className="italic text-[#8a5c2e]">Method</span>
                    </h2>
                  </div>

                  {/* Method toggle */}
                  <div className="flex gap-3 mb-7">
                    {[
                      { id: "card", label: "💳 Credit Card" },
                      { id: "cod", label: "🏠 Cash on Delivery" },
                    ].map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => setMethod(id)}
                        className="flex-1 py-3 rounded-xl text-sm font-light transition-all duration-250"
                        style={{
                          border: method === id ? "2px solid #8a5c2e" : "1px solid #ddd0be",
                          background: method === id ? "#fdf4ec" : "transparent",
                          color: method === id ? "#5c3d1e" : "#9a8878",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {method === "card" ? (
                      <motion.div
                        key="card-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Card preview */}
                        <div
                          className="rounded-2xl p-6 mb-6 relative overflow-hidden"
                          style={{ background: "linear-gradient(135deg, #3d2b1a 0%, #6b4c36 60%, #8a5c2e 100%)", minHeight: 130 }}
                        >
                          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
                          <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
                          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Card Number</p>
                          <p className="text-white text-lg font-light tracking-[0.2em] mb-4">
                            {payment.cardNumber || "•••• •••• •••• ••••"}
                          </p>
                          <div className="flex justify-between">
                            <div>
                              <p className="text-white/40 text-[9px] uppercase tracking-widest">Card Holder</p>
                              <p className="text-white text-sm font-light">{payment.cardName || "YOUR NAME"}</p>
                            </div>
                            <div>
                              <p className="text-white/40 text-[9px] uppercase tracking-widest">Expires</p>
                              <p className="text-white text-sm font-light">{payment.expiry || "MM/YY"}</p>
                            </div>
                          </div>
                        </div>

                        {[
                          { label: "Cardholder Name", name: "cardName", placeholder: "John Doe", full: true },
                          { label: "Card Number", name: "cardNumber", placeholder: "1234 5678 9012 3456", full: true },
                          { label: "Expiry Date", name: "expiry", placeholder: "MM/YY" },
                          { label: "CVV", name: "cvv", placeholder: "•••" },
                        ].map((f, i) => (
                          <motion.div key={f.name} custom={i} variants={fadeUp} initial="hidden" animate="show"
                            className={f.full ? "" : "inline-block w-[calc(50%-8px)]"}
                            style={!f.full && i === 3 ? { marginLeft: 16 } : {}}
                          >
                            <label className="block text-[11px] uppercase tracking-widest text-[#9a8878] mb-1.5">
                              {f.label}
                            </label>
                            <input
                              name={f.name}
                              value={payment[f.name]}
                              onChange={handlePaymentChange}
                              placeholder={f.placeholder}
                              className={inputCls}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cod"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl p-6 text-center"
                        style={{ background: "#fdf9f4", border: "1px dashed #c8b49a" }}
                      >
                        <div className="text-4xl mb-3">🏡</div>
                        <p className="text-sm font-light text-[#5c3d1e] mb-1">Pay when your order arrives</p>
                        <p className="text-xs text-[#9a8878]">No card needed. Our delivery team will collect payment at your door.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep(0)}
                      className="px-6 py-3.5 rounded-xl text-sm font-light transition-all duration-200"
                      style={{ border: "1px solid #ddd0be", color: "#776a5d" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#f5ede0"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      className="flex-1 py-3.5 rounded-xl text-sm tracking-widest uppercase font-light text-[#fffcf7] transition-all duration-300"
                      style={{ background: "#3d2b1a" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#5c3d1e"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#3d2b1a"}
                    >
                      Review Order →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — REVIEW */}
              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  {/* Shipping summary */}
                  {[
                    {
                      title: "Shipping Details",
                      edit: () => setStep(0),
                      content: (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                          {[
                            ["Name", `${shipping.firstName} ${shipping.lastName}`],
                            ["Email", shipping.email],
                            ["Phone", shipping.phone],
                            ["Address", shipping.address],
                            ["City", `${shipping.city}, ${shipping.zip}`],
                            ["Country", shipping.country],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <p className="text-[10px] uppercase tracking-widest text-[#9a8878]">{k}</p>
                              <p className="text-sm text-[#3d2b1a] font-light">{v || "—"}</p>
                            </div>
                          ))}
                        </div>
                      ),
                    },
                    {
                      title: "Payment Method",
                      edit: () => setStep(1),
                      content: method === "cod" ? (
                        <p className="text-sm text-[#3d2b1a] font-light">🏡 Cash on Delivery</p>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-7 rounded bg-[#3d2b1a] flex items-center justify-center">
                            <span className="text-white text-[9px]">CARD</span>
                          </div>
                          <div>
                            <p className="text-sm text-[#3d2b1a] font-light">{payment.cardName || "—"}</p>
                            <p className="text-xs text-[#9a8878]">
                              •••• •••• •••• {payment.cardNumber.slice(-4) || "••••"}
                            </p>
                          </div>
                        </div>
                      ),
                    },
                  ].map(({ title, edit, content }) => (
                    <div
                      key={title}
                      className="bg-white rounded-2xl p-6"
                      style={{ border: "1px solid #e8dfd0", boxShadow: "0 2px 12px rgba(100,70,40,0.05)" }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm uppercase tracking-widest text-[#776a5d]">{title}</h3>
                        <button
                          onClick={edit}
                          className="text-xs text-[#8a5c2e] hover:underline transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                      {content}
                    </div>
                  ))}

                  {/* Items review */}
                  <div
                    className="bg-white rounded-2xl p-6"
                    style={{ border: "1px solid #e8dfd0" }}
                  >
                    <h3 className="text-sm uppercase tracking-widest text-[#776a5d] mb-4">Items ({cart.length})</h3>
                    <div className="space-y-3 max-h-52 overflow-y-auto pr-2">
                      {cart.map((p) => (
                        <div key={p.id} className="flex items-center gap-3">
                          <img
                            src={p.images?.[0]}
                            alt={p.title}
                            className="w-12 h-12 object-contain rounded-xl bg-[#faf8f4]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#3d2b1a] truncate">{p.title}</p>
                            <p className="text-xs text-[#9a8878]">{p.discountPercentage}% off</p>
                          </div>
                          <span className="text-sm font-medium" style={{ color: "#5c3d1e" }}>
                            ${(p.price - (p.price * p.discountPercentage) / 100).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3.5 rounded-xl text-sm font-light transition-all duration-200"
                      style={{ border: "1px solid #ddd0be", color: "#776a5d" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#f5ede0"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePlaceOrder}
                      className="flex-1 py-3.5 rounded-xl text-sm tracking-widest uppercase font-light text-[#fffcf7] transition-all duration-300"
                      style={{ background: "#3d2b1a" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#5c3d1e"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#3d2b1a"}
                    >
                      ✦ Place Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <motion.div
            className="lg:w-80 w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              className="rounded-3xl p-6 sticky top-6"
              style={{ background: "#fff", border: "1px solid #e8dfd0", boxShadow: "0 4px 24px rgba(100,70,40,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid #f0e8da" }}>
                <div className="w-1 h-5 rounded-full" style={{ background: "#8a5c2e" }} />
                <h3
                  className="text-base font-light text-[#1a1410]"
                  style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
                >
                  Order Summary
                </h3>
              </div>

              {/* Items list */}
              <div className="space-y-3 mb-5 max-h-48 overflow-y-auto pr-1">
                {cart.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#faf8f4] shrink-0">
                      <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-xs text-[#776a5d] flex-1 truncate">{p.title}</p>
                    <span className="text-xs font-medium text-[#5c3d1e]">
                      ${(p.price - (p.price * p.discountPercentage) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 pt-4" style={{ borderTop: "1px solid #f0e8da" }}>
                {[
                  ["Subtotal", `$${subtotal.toFixed(2)}`],
                  ["Shipping", "Free"],
                  ["Tax (10%)", `$${tax.toFixed(2)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-xs font-light text-[#9a8878]">{k}</span>
                    <span className={`text-xs font-medium ${v === "Free" ? "text-green-600" : "text-[#3d2b1a]"}`}>{v}</span>
                  </div>
                ))}
                <div
                  className="flex justify-between pt-3 mt-1"
                  style={{ borderTop: "1px solid #f0e8da" }}
                >
                  <span className="text-sm font-medium text-[#1a1410]">Total</span>
                  <span
                    className="text-xl font-light"
                    style={{ color: "#5c3d1e", fontFamily: "'Palatino Linotype', Palatino, serif" }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Step progress */}
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid #f0e8da" }}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#9a8878]">Progress</span>
                  <span className="text-[10px] text-[#8a5c2e]">{step + 1}/3</span>
                </div>
                <div className="h-1 rounded-full bg-[#f0e8da] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #5c3d1e, #8a5c2e)" }}
                    animate={{ width: `${((step + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Trust */}
              <div className="mt-5 flex justify-around">
                {["🔒 Secure", "🔄 Returns", "🚚 Fast Ship"].map((b) => (
                  <span key={b} className="text-[10px] text-[#9a8878]">{b}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SUCCESS OVERLAY ── */}
      <AnimatePresence>
        {placed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(26,20,16,0.65)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-white rounded-3xl p-12 text-center max-w-sm mx-4"
              style={{ border: "1px solid #e8dfd0", boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, duration: 0.5, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg, #f0e4d0, #e8d4b8)" }}
              >
                ✓
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-light text-[#1a1410] mb-2"
                style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}
              >
                Order <span className="italic text-[#8a5c2e]">Placed!</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-sm text-[#776a5d] font-light mb-2"
              >
                Thank you for your purchase. You'll receive a confirmation email shortly.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs text-[#9a8878]"
              >
                Redirecting you home...
              </motion.p>
              <motion.div
                className="mt-5 h-1 rounded-full bg-[#f0e8da] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #5c3d1e, #8a5c2e)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 2.5, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
