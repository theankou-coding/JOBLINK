"use client";
import { useState, useEffect, Fragment, useRef, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/home/navigation";
import IconRenderer from "@/components/ui/IconRenderer";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only apply on desktop
      if (
        window.innerWidth >= 768 &&
        dropdownOpen &&
        !(event.target as Element).closest(".nav-dropdown")
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    // Defer state updates to avoid synchronous renders inside the effect
    startTransition(() => {
      setIsMobileMenuOpen(false);
      setDropdownOpen(null);
    });
  }, [pathname]);

  // Handle mouse enter for dropdowns (desktop only)
  const handleMouseEnter = (itemId: string) => {
    if (window.innerWidth >= 768) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setDropdownOpen(itemId);
    }
  };

  // Handle mouse leave for dropdowns (desktop only)
  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      timeoutRef.current = setTimeout(() => {
        setDropdownOpen(null);
      }, 150);
    }
  };

  // Handle mobile dropdown toggle
  const handleMobileDropdownToggle = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === itemId ? null : itemId);
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset dropdown when toggling menu
    setDropdownOpen(null);
  };

  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* White Navbar */}
      <nav
        className={` fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-gray-900 backdrop-blur-sm"
        }`}
      >
        {/* top */}
        <div className=" flex text-center mt-4 items-center justify-center space-x-2 text-white text-sm font-bold">
          Get started for free • No credit card required • See pricing
          <svg
            className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>

        {/*  Navigation*/}
        <div className=" sticky top-0 max-w-full mt-4 w-full bg-white rounded-tl-3xl rounded-tr-3xl mx-auto flex items-center justify-between md:px-15">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 z-10">
            <Image
              src="/Images/logo.png"
              alt="Logo"
              width={50}
              height={20}
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.id}
                className="relative nav-dropdown"
                onMouseEnter={() =>
                  (item.megaMenu || item.children) && handleMouseEnter(item.id)
                }
                onMouseLeave={handleMouseLeave}
              >
                {item.megaMenu || item.children ? (
                  <Fragment>
                    <button
                      className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        pathname === item.path ||
                        pathname?.startsWith(`${item.path}/`)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.name}</span>
                    </button>
                  </Fragment>
                ) : (
                  <Link
                    href={item.path!}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      pathname === item.path
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          {/* Get start */}
          <div className="hidden lg:flex items-center space-x-3 ">
            <a className="group inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors duration-300 hover:bg-gray-800">
              Get Start
              <svg
                className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>

            {/* Log in */}

            <a className="group inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors duration-300 hover:bg-gray-800">
              Log in
              <svg
                className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 p-3 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
            type="button"
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
                  strokeWidth="2"
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{
            top: isScrolled ? "73px" : "88px",
            pointerEvents: "auto",
          }}
        >
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          />

          {/* Menu content */}
          <div
            className="relative bg-white border-b border-gray-200 shadow-lg"
            style={{ pointerEvents: "auto" }}
          >
            <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.id} className="relative">
                  {item.megaMenu || item.children ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full px-4 py-4 text-left text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={(e) => handleMobileDropdownToggle(e, item.id)}
                        type="button"
                        style={{
                          minHeight: "48px",
                          pointerEvents: "auto",
                          touchAction: "manipulation",
                        }}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`h-5 w-5 transition-transform duration-200 ${
                            dropdownOpen === item.id ? "rotate-180" : ""
                          }`}
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
                        </svg>
                      </button>

                      {dropdownOpen === item.id && (
                        <div
                          className="mt-2 ml-4 space-y-1 bg-gray-50 rounded-lg p-2"
                          style={{ pointerEvents: "auto" }}
                        >
                          {item.megaMenu
                            ? item.megaMenu.map((category) => (
                                <div
                                  key={category.id}
                                  className="mb-4 last:mb-0"
                                >
                                  <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 px-3 py-1">
                                    {category.title}
                                  </h4>
                                  <div className="space-y-1">
                                    {category.products.map((product) => (
                                      <Link
                                        key={product.id}
                                        href={product.path}
                                        onClick={handleMobileLinkClick}
                                        className="flex items-center space-x-3 px-3 py-4 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                        style={{
                                          minHeight: "48px",
                                          pointerEvents: "auto",
                                          touchAction: "manipulation",
                                        }}
                                      >
                                        <span className="text-lg shrink-0 text-red-500">
                                          <IconRenderer
                                            iconName={product.icon}
                                          />
                                        </span>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-medium truncate">
                                            {product.name}
                                          </div>
                                          <div className="text-xs text-gray-500 truncate">
                                            {product.description}
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))
                            : item.children?.map((childItem) => (
                                <Link
                                  key={childItem.id}
                                  href={childItem.path}
                                  onClick={handleMobileLinkClick}
                                  className="block px-4 py-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                  style={{
                                    minHeight: "48px",
                                    pointerEvents: "auto",
                                    touchAction: "manipulation",
                                  }}
                                >
                                  {childItem.name}
                                </Link>
                              ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path!}
                      onClick={handleMobileLinkClick}
                      className="block px-4 py-4 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      style={{
                        minHeight: "48px",
                        pointerEvents: "auto",
                        touchAction: "manipulation",
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  onClick={handleMobileLinkClick}
                  className="block w-full px-4 py-4 text-center bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  style={{
                    minHeight: "48px",
                    pointerEvents: "auto",
                    touchAction: "manipulation",
                  }}
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
