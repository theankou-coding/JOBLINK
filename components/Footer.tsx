// components/Footer.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center shrink-0 z-10 mb-6">
              <Image
                src="/Images/logo.png"
                alt="JobLink Logo"
                width={60}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Your community&#39;s job board.
              <br />
              Connecting local talent with local opportunity across Cambodia.
            </p>

            {/* Newsletter Signup - Fixed */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
              <h4 className="font-semibold mb-3 text-gray-200">Stay Updated</h4>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  required
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-r-xl hover:opacity-90 transition-opacity duration-300"
                  suppressHydrationWarning
                >
                  Subscribe
                </button>
              </form>
              <p className="text-gray-400 text-sm mt-3">
                Get the latest job opportunities delivered to your inbox
              </p>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-200 border-l-4 border-blue-500 pl-3">
              Product
            </h3>
            <ul className="space-y-3">
              {["Features", "How It Works", "Pricing", "Testimonials"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <svg
                        className="w-3 h-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-200 border-l-4 border-green-500 pl-3">
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                  >
                    <svg
                      className="w-3 h-3 mr-2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-200 border-l-4 border-purple-500 pl-3">
              Support
            </h3>
            <ul className="space-y-3">
              {["FAQ", "Help Center", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <svg
                        className="w-3 h-3 mr-2 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-6 md:mb-0">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear}, JobLink. All Rights Reserved.
              <br className="md:hidden" />
              <span className="ml-0 md:ml-2 block md:inline mt-1 md:mt-0">
                Proudly built for Cambodia&#39;s communities.
              </span>
            </p>
          </div>

          {/* Social Links & App Store */}
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-linear-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group"
                suppressHydrationWarning
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-linear-to-r hover:from-green-400 hover:to-blue-500 transition-all duration-300 group"
                suppressHydrationWarning
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-linear-to-r hover:from-pink-500 hover:to-red-500 transition-all duration-300 group"
                suppressHydrationWarning
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-linear-to-r hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group"
                suppressHydrationWarning
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            {/* App Store Badges */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-2 flex items-center transition-colors duration-300 group"
                suppressHydrationWarning
              >
                <div className="mr-3">
                  <svg
                    className="w-6 h-6 text-gray-300 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-1.012 1.298-2.429 1.142-3.83-1.207.052-2.649.805-3.497 1.752-.784.896-1.48 2.337-1.285 3.714 1.338.104 2.715-.688 3.64-1.636z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="font-semibold text-gray-200 group-hover:text-white">
                    App Store
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-2 flex items-center transition-colors duration-300 group"
                suppressHydrationWarning
              >
                <div className="mr-3">
                  <svg
                    className="w-6 h-6 text-gray-300 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.523 15.3414C17.4112 15.7915 17.2796 16.3919 17.2796 16.9579C17.2796 19.1632 18.9266 20.945 20.8515 20.945C21.5176 20.945 22.2375 20.6135 22.7109 20.1806C23.2119 19.7233 23.5424 19.0589 23.5424 18.2845C23.5424 16.1648 21.8263 15.0545 19.6513 15.0545C19.0337 15.0545 17.523 15.1506 17.523 15.3414ZM10.8884 15.3414C10.7767 15.7915 10.645 16.3919 10.645 16.9579C10.645 19.1632 12.292 20.945 14.2169 20.945C14.883 20.945 15.6029 20.6135 16.0763 20.1806C16.5773 19.7233 16.9078 19.0589 16.9078 18.2845C16.9078 16.1648 15.1917 15.0545 13.0167 15.0545C12.3991 15.0545 10.8884 15.1506 10.8884 15.3414Z" />
                    <path d="M11.0317 1.91699C11.0317 1.91699 8.25742 2.83826 6.3899 5.38062C4.29277 8.222 4.29277 12.7181 6.3899 15.5595C8.25742 18.1018 11.0317 19.0231 11.0317 19.0231C11.0317 19.0231 13.806 18.1018 15.6735 15.5595C17.7706 12.7181 17.7706 8.222 15.6735 5.38062C13.806 2.83826 11.0317 1.91699 11.0317 1.91699Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="font-semibold text-gray-200 group-hover:text-white">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="flex items-center mb-4 md:mb-0">
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Verified businesses • Secure payments • 24/7 support</span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Cambodia 🇰🇭
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                English | ភាសាខ្មែរ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
