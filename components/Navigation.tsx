"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/home/navigation"; // Import from your data file

interface NavItem {
  id: string;
  name: string;
  path?: string;
  children?: NavItem[];
}

const Navbar = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const pathname = usePathname();

  // SCROLL LISTENER (Hide top bar)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CLICK OUTSIDE (Desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth >= 768 &&
        dropdownOpen &&
        !(event.target as Element).closest(".nav-dropdown")
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleMouseEnter = (itemId: string) => {
    if (window.innerWidth >= 768) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setDropdownOpen(itemId);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      timeoutRef.current = setTimeout(() => {
        setDropdownOpen(null);
      }, 150);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  // Type guard to check if item has children
  const hasChildren = (
    item: NavItem
  ): item is NavItem & { children: NavItem[] } => {
    return !!item.children && Array.isArray(item.children);
  };

  return (
    <>
      {/* OUTER NAV WRAPPER */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? "bg-gray-900 shadow-xl" : "bg-gray-900"}`}
      >
        {/* TOP BAR (auto hide on scroll) */}
        <div
          className={`flex items-center justify-center space-x-2 text-white text-sm font-semibold py-2 px-4
          transition-all duration-500
          ${
            isScrolled
              ? "opacity-0 -translate-y-5 pointer-events-none h-0"
              : "opacity-100 translate-y-0 h-auto"
          }`}
        >
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Get started for free • No credit card required
          </span>
        </div>

        {/* MAIN NAVBAR */}
        <div
          className={`sticky top-0 max-w-full w-full bg-white rounded-tl-3xl rounded-tr-3xl mx-auto flex items-center justify-between md:px-16 px-5 py-3 shadow-sm ${
            isScrolled ? "rounded-tl-3xl rounded-tr-3xl" : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 z-10">
            <Image
              src="/Images/logo.png"
              alt="JobLink Logo"
              width={60}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <div
                key={item.id}
                className="relative nav-dropdown"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {hasChildren(item) ? (
                  <>
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          pathname === item.path ||
                          pathname?.startsWith(`${item.path}/`)
                            ? "bg-linear-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                    >
                      {item.name}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === item.id && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => setDropdownOpen(null)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path || "#"}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        pathname === item.path ||
                        pathname?.startsWith(`${item.path}/`)
                          ? "bg-linear-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/auth?form=login"
              className="px-4 py-2 bg-transparent border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Log in
            </Link>
            <Link
              href="/auth?form=login"
              className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden relative z-10 p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU (Drawer) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ top: isScrolled ? "73px" : "88px" }}
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          />

          <div className="relative bg-white border-b shadow-lg">
            <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.id}>
                  {hasChildren(item) ? (
                    <>
                      <button
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === item.id ? null : item.id
                          )
                        }
                        className="flex items-center justify-between w-full px-4 py-4 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transform transition-transform ${
                            dropdownOpen === item.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {dropdownOpen === item.id && (
                        <div className="ml-4 mt-1 space-y-1 bg-gray-50 p-2 rounded-lg">
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.path}
                              onClick={handleMobileLinkClick}
                              className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-md"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.path || "#"}
                      onClick={handleMobileLinkClick}
                      className={`block px-4 py-4 text-base font-medium rounded-lg transition-colors
                        ${
                          pathname === item.path
                            ? "bg-linear-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-6 border-t border-gray-200 space-y-3">
                <Link
                  href="/auth?form=login"
                  onClick={handleMobileLinkClick}
                  className="block w-full px-4 py-3 text-center bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 border border-gray-200"
                >
                  Log in
                </Link>
                <Link
                  href="/auth?form=login"
                  onClick={handleMobileLinkClick}
                  className="block w-full px-4 py-3 text-center bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
