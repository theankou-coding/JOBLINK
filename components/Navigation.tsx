"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavigationProps {
  isScrolled?: boolean;
}

const JobLinkNavbar = ({ isScrolled = false }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledState, setIsScrolledState] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Jobs", href: "/jobs" },
    { label: "Designers", href: "/designers" },
    { label: "Resources", href: "/resources" },
    { label: "Forums", href: "/forums" },
  ];

  const authItems = [
    { label: "Login", href: "/login", type: "outline" as const },
    { label: "Sign Up", href: "/signup", type: "primary" as const },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledState(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          isScrolledState || isScrolled
            ? "bg-white shadow-lg border-b border-gray-200"
            : "bg-[#000e3d]"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 flex-shrink-0"
            onClick={closeMobileMenu}
          >
            <div className="relative ">
              <Image
                src="/Images/logo.png"
                alt="JobLink Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            {/* <span
              className={`
              text-xl font-bold
              ${isScrolledState || isScrolled ? "text-[#1E40AF]" : "text-white"}
            `}
            >
              JobLink
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    transition-colors duration-200 font-medium
                    ${
                      pathname === item.href
                        ? isScrolledState || isScrolled
                          ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                          : "text-white border-b-2 border-white"
                        : isScrolledState || isScrolled
                        ? "text-gray-700 hover:text-[#2563EB]"
                        : "text-gray-300 hover:text-white"
                    }
                    py-2 px-1
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4">
              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${
                      item.type === "primary"
                        ? isScrolledState || isScrolled
                          ? "bg-[#2563EB] text-white hover:bg-[#1E40AF]"
                          : "bg-white text-[#1E40AF] hover:bg-gray-100"
                        : isScrolledState || isScrolled
                        ? "border border-gray-300 text-gray-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                        : "border border-gray-400 text-white hover:bg-white hover:bg-opacity-10"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              md:hidden inline-flex items-center justify-center p-2 rounded-md
              transition-colors duration-200
              ${
                isScrolledState || isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-gray-800"
              }
            `}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            className={`
            md:hidden absolute top-16 left-0 right-0
            ${
              isScrolledState || isScrolled
                ? "bg-white border-t border-gray-200"
                : "bg-[#000000] border-t border-gray-700"
            }
            shadow-lg
          `}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    ${
                      pathname === item.href
                        ? isScrolledState || isScrolled
                          ? "bg-[#2563EB] text-white"
                          : "bg-[#2563EB] text-white"
                        : isScrolledState || isScrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-300 hover:bg-gray-800"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 pb-3 border-t border-gray-200 border-opacity-50">
                {authItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`
                      block px-3 py-2 rounded-md text-base font-medium mb-2 transition-colors duration-200
                      ${
                        item.type === "primary"
                          ? isScrolledState || isScrolled
                            ? "bg-[#2563EB] text-white hover:bg-[#1E40AF] text-center"
                            : "bg-white text-[#1E40AF] hover:bg-gray-100 text-center"
                          : isScrolledState || isScrolled
                          ? "border border-gray-300 text-gray-700 hover:border-[#2563EB] hover:text-[#2563EB] text-center"
                          : "border border-gray-400 text-white hover:bg-white hover:bg-opacity-10 text-center"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default JobLinkNavbar;
