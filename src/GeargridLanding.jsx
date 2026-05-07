import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GearGridLanding = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  // Reusable animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-amber-500 selection:text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="text-white font-bold text-xl tracking-tighter">
                  GG
                </span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                GearGrid
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <motion.a
                whileHover={{ y: -2 }}
                href="#features"
                className="text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"
              >
                Features
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="#about"
                className="text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"
              >
                About Us
              </motion.a>

              {/* Animated Product Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => setIsProductMenuOpen(false)}
              >
                <button className="text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors flex items-center gap-1 py-2">
                  Products
                  <motion.svg
                    animate={{ rotate: isProductMenuOpen ? 180 : 0 }}
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isProductMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transform origin-top-right"
                    >
                      <a
                        href="/login"
                        className="block p-4 hover:bg-slate-50 transition-colors group border-b border-slate-50 last:border-0"
                      >
                        <p className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          Rental Management System
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Enterprise machinery tracking and fleet logistics
                          portal.
                        </p>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/login"
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 shadow-lg shadow-slate-900/20"
              >
                Client Login
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-50 opacity-90"></div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-200/40 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4 mix-blend-multiply"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4 mix-blend-multiply"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 text-amber-800 font-semibold text-sm mb-8 border border-amber-200"
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-2 w-2 rounded-full bg-amber-500"
            />
            Machinery Logistics Reimagined
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight"
          >
            Next-Level{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Equipment
            </span>{" "}
            <br />
            Rental Management
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Deploy an enterprise-grade ecosystem to track, maintain, and lease
            your heavy machinery fleet seamlessly.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/login"
              className="px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 group"
            >
              Access System
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Value Proposition Cards - Scroll Triggered */}
      <section
        id="features"
        className="py-20 bg-white relative z-10 border-t border-slate-100"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-colors group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Live Fleet Analytics
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Real-time telemetrics and utilization tracking for heavy
                machinery across all active construction sites.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-colors group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Automated Billing
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Frictionless invoicing cycles based on dynamic rental durations
                and contractual service agreements.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-colors group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Client Portal
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                A dedicated interface for external stakeholders to request
                service, extend leases, and view compliance documents.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default GearGridLanding;
