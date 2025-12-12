"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        !(event.target as Element).closest(".nav-item-dropdown")
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdown when navigating
  const handleNavigation = (path: string) => {
    setDropdownOpen(null);
    setIsMobileMenuOpen(false);
    router.push(`/admin/${path}`);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated");
    router.push("/admin/login");
  };

  // Global styles for hiding scrollbars
  const globalStyles = `
    /* Hide scrollbar for Chrome, Safari and Opera */
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    .hide-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `;

  // Check if the current route is login or an authentication page
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password";

  // For auth pages, don't show the admin layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Add global styles for hiding scrollbars */}
      <style jsx global>
        {globalStyles}
      </style>

      <div className="flex h-screen bg-linear-to-br from-blue-50 to-white text-gray-900">
        {/* Left Side Navigation */}
        <aside
          className={`bg-white border-r border-blue-100 ${
            isNavCollapsed ? "w-20" : "w-64"
          } shrink-0 transition-all duration-300 shadow-lg ${
            isMobileMenuOpen ? "fixed inset-y-0 left-0 z-50" : "hidden md:block"
          }`}
        >
          {/* Logo and Toggle */}
          <div className="h-16 flex items-center justify-between p-4 border-b border-blue-100">
            <div className="flex items-center">
              <div className="relative h-8 w-8 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              {!isNavCollapsed && (
                <h1 className="text-lg font-bold ml-3 text-blue-700 whitespace-nowrap">
                  JobLink Admin
                </h1>
              )}
            </div>
            <button
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              className="p-1 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 hidden md:block transition-colors"
            >
              {isNavCollapsed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              )}
            </button>

            {/* Close button for mobile */}
            {isMobileMenuOpen && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div
            className={`h-[calc(100vh-4rem)] overflow-y-auto hide-scrollbar ${
              isNavCollapsed ? "py-4 px-2" : "py-4 px-3"
            }`}
          >
            <nav>
              <ul className="space-y-1">
                {[
                  {
                    name: "Dashboard",
                    path: "dashboard",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    ),
                    active: pathname === "/admin/dashboard",
                  },
                  {
                    name: "Job Listings",
                    path: "jobs",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    ),
                    active: pathname?.includes("/admin/jobs"),
                    dropdown: true,
                    dropdownItems: [
                      { name: "All Jobs", path: "jobs" },
                      { name: "Add New Job", path: "jobs/new" },
                      { name: "Job Categories", path: "jobs/categories" },
                      { name: "Featured Jobs", path: "jobs/featured" },
                    ],
                  },
                  {
                    name: "Candidates",
                    path: "candidates",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    ),
                    active: pathname?.includes("/admin/candidates"),
                  },
                  {
                    name: "Employers",
                    path: "employers",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    ),
                    active: pathname?.includes("/admin/employers"),
                  },
                  {
                    name: "Applications",
                    path: "applications",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    active: pathname?.includes("/admin/applications"),
                  },
                  {
                    name: "Analytics",
                    path: "analytics",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    ),
                    active: pathname?.includes("/admin/analytics"),
                  },
                  {
                    name: "Settings",
                    path: "settings",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    active: pathname?.includes("/admin/settings"),
                    dropdown: true,
                    dropdownItems: [
                      { name: "General", path: "settings/general" },
                      { name: "Users", path: "settings/users" },
                      { name: "Email Templates", path: "settings/email" },
                      { name: "Payment", path: "settings/payment" },
                    ],
                  },
                ].map((item, index) => (
                  <li key={index} className="relative nav-item-dropdown">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setDropdownOpen((prevState) =>
                              prevState === item.name ? null : item.name
                            )
                          }
                          className={`flex items-center justify-between w-full ${
                            isNavCollapsed ? "p-3 justify-center" : "px-4 py-3"
                          } rounded-lg transition-colors text-left ${
                            item.active
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className={`${isNavCollapsed ? "" : "mr-3"}`}>
                              <div
                                className={
                                  item.active ? "text-white" : "text-blue-500"
                                }
                              >
                                {item.icon}
                              </div>
                            </span>
                            {!isNavCollapsed && (
                              <span className="font-medium">{item.name}</span>
                            )}
                          </div>
                          {!isNavCollapsed && (
                            <FaChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                dropdownOpen === item.name ? "rotate-180" : ""
                              } ${
                                item.active ? "text-white" : "text-gray-400"
                              }`}
                            />
                          )}
                        </button>

                        {/* Dropdown Menu - Standard View */}
                        {!isNavCollapsed && dropdownOpen === item.name && (
                          <div className="mt-1 ml-7 pl-4 border-l border-blue-200 space-y-1">
                            {item.dropdownItems.map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={() => handleNavigation(subItem.path)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                  pathname === `/admin/${subItem.path}`
                                    ? "bg-blue-100 text-blue-600 font-medium"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                              >
                                {subItem.name}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Dropdown Menu - Collapsed View */}
                        {isNavCollapsed && dropdownOpen === item.name && (
                          <div className="absolute left-full ml-2 top-0 bg-white border border-blue-100 rounded-lg shadow-lg overflow-hidden w-48 z-10">
                            <div className="py-2">
                              {item.dropdownItems.map((subItem, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={() => handleNavigation(subItem.path)}
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                    pathname === `/admin/${subItem.path}`
                                      ? "bg-blue-100 text-blue-600 font-medium"
                                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                  }`}
                                >
                                  {subItem.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`flex items-center ${
                          isNavCollapsed ? "p-3 justify-center" : "px-4 py-3"
                        } rounded-lg transition-colors w-full text-left ${
                          item.active
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        <span className={`${isNavCollapsed ? "" : "mr-3"}`}>
                          <div
                            className={
                              item.active ? "text-white" : "text-blue-500"
                            }
                          >
                            {item.icon}
                          </div>
                        </span>
                        {!isNavCollapsed && (
                          <span className="font-medium">{item.name}</span>
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <div
                className={`mt-8 pt-6 border-t border-blue-100 ${
                  isNavCollapsed ? "text-center" : ""
                }`}
              >
                {!isNavCollapsed && (
                  <div className="px-4 mb-2">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Account
                    </h5>
                  </div>
                )}
                <ul className="space-y-1">
                  {[
                    {
                      name: "Profile",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ),
                      active: false,
                    },
                    {
                      name: "Logout",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ),
                      active: false,
                    },
                  ].map((item, index) => (
                    <li key={index}>
                      <button
                        className={`flex ${
                          isNavCollapsed
                            ? "justify-center p-3"
                            : "items-center px-4 py-3"
                        } rounded-lg transition-colors w-full text-left ${
                          item.name === "Logout"
                            ? "text-red-500 hover:bg-red-50 hover:text-red-600"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                        onClick={
                          item.name === "Logout" ? handleLogout : undefined
                        }
                      >
                        <span className={`${isNavCollapsed ? "" : "mr-3"}`}>
                          <div
                            className={
                              item.name === "Logout"
                                ? "text-red-500"
                                : "text-blue-500"
                            }
                          >
                            {item.icon}
                          </div>
                        </span>
                        {!isNavCollapsed && (
                          <span className="font-medium">{item.name}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-white border-b border-blue-100 h-16 flex items-center justify-between px-6 shadow-sm">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>

            {/* Page title based on pathname */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {pathname
                  ?.split("/")
                  .pop()
                  ?.replace(/^\w/, (c) => c.toUpperCase()) || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Site */}
              <a
                href="/"
                target="_blank"
                className="hidden md:flex items-center text-sm px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Site
              </a>

              <div className="relative">
                <button className="p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-blue-100">
                    <Image
                      src="/images/boy.png"
                      alt="Admin"
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto hide-scrollbar bg-linear-to-br from-blue-50/30 to-white">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
