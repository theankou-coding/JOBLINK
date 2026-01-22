/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { FaChevronDown, FaComment, FaEye, FaTrash } from "react-icons/fa";

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

  // Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [conversations, setConversations] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportedChats, setReportedChats] = useState<string[]>([]);

  // Static conversation data
  // const staticConversations = [
  //   {
  //     id: "1",
  //     jobId: "job001",
  //     jobTitle: "Frontend Developer",
  //     jobSeekerId: "user101",
  //     jobSeekerName: "John Doe",
  //     companyId: "company201",
  //     companyName: "Tech Corp",
  //     lastMessage: "When can I schedule an interview?",
  //     updatedAt: "2024-01-15",
  //     unreadCount: 3,
  //   },
  //   {
  //     id: "2",
  //     jobId: "job002",
  //     jobTitle: "Backend Engineer",
  //     jobSeekerId: "user102",
  //     jobSeekerName: "Sarah Smith",
  //     companyId: "company202",
  //     companyName: "Dev Solutions",
  //     lastMessage: "I've sent you my portfolio",
  //     updatedAt: "2024-01-14",
  //     unreadCount: 0,
  //   },
  //   {
  //     id: "3",
  //     jobId: "job003",
  //     jobTitle: "UI/UX Designer",
  //     jobSeekerId: "user103",
  //     jobSeekerName: "Mike Johnson",
  //     companyId: "company203",
  //     companyName: "Creative Studio",
  //     lastMessage: "Looking forward to the design challenge",
  //     updatedAt: "2024-01-13",
  //     unreadCount: 1,
  //   },
  //   {
  //     id: "4",
  //     jobId: "job004",
  //     jobTitle: "Project Manager",
  //     jobSeekerId: "user104",
  //     jobSeekerName: "Emma Wilson",
  //     companyId: "company204",
  //     companyName: "Management Pro",
  //     lastMessage: "Thanks for the opportunity",
  //     updatedAt: "2024-01-12",
  //     unreadCount: 0,
  //   },
  // ];

  // // Static messages data
  // const staticMessages = [
  //   {
  //     id: "msg1",
  //     senderId: "user101",
  //     senderName: "John Doe",
  //     senderRole: "job_seeker",
  //     text: "Hello, I'm interested in the Frontend Developer position",
  //     type: "text",
  //     createdAt: "2024-01-15T10:30:00",
  //     seen: true,
  //   },
  //   {
  //     id: "msg2",
  //     senderId: "company201",
  //     senderName: "Tech Corp",
  //     senderRole: "company",
  //     text: "Hi John! Thanks for your application. Can you share your portfolio?",
  //     type: "text",
  //     createdAt: "2024-01-15T11:45:00",
  //     seen: true,
  //   },
  //   {
  //     id: "msg3",
  //     senderId: "user101",
  //     senderName: "John Doe",
  //     senderRole: "job_seeker",
  //     text: "Sure! Here's my portfolio link: portfolio.johndoe.com",
  //     type: "text",
  //     createdAt: "2024-01-15T12:15:00",
  //     seen: true,
  //   },
  //   {
  //     id: "msg4",
  //     senderId: "user101",
  //     senderName: "John Doe",
  //     senderRole: "job_seeker",
  //     text: "When can I schedule an interview?",
  //     type: "text",
  //     createdAt: "2024-01-15T14:20:00",
  //     seen: false,
  //   },
  // ];

  // Initialize conversations
  // useEffect(() => {
  //   setConversations(staticConversations);
  // }, []);

  // // Load messages when conversation is selected
  // useEffect(() => {
  //   if (selectedConversation) {
  //     setMessages(staticMessages);
  //   }
  // }, [selectedConversation]);

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

  // Navigation handler
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

  // Chat functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenChat = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  const handleCloseChat = () => {
    setSelectedConversation(null);
    setIsChatOpen(false);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (selectedConversation && window.confirm("Delete this message?")) {
      setMessages(messages.filter((msg) => msg.id !== messageId));
    }
  };

  const handleBlockUser = (userId: string, userRole: string) => {
    if (window.confirm(`Block this ${userRole}?`)) {
      alert(`${userRole} has been blocked`);
    }
  };

  const handleReportChat = (conversationId: string) => {
    if (!reportedChats.includes(conversationId)) {
      setReportedChats([...reportedChats, conversationId]);
      alert("Chat reported for review");
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.jobSeekerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate unread count
  const totalUnreadCount = conversations.reduce(
    (acc, conv) => acc + (conv.unreadCount || 0),
    0,
  );

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

      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white text-gray-900">
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
                <h1 className="text-lg font-bold ml-3 text-blue-400 whitespace-nowrap">
                  JobLink
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
                  // {
                  //   name: "Job Listings",
                  //   path: "jobs",
                  //   icon: (
                  //     <svg
                  //       xmlns="http://www.w3.org/2000/svg"
                  //       className="h-5 w-5"
                  //       viewBox="0 0 20 20"
                  //       fill="currentColor"
                  //     >
                  //       <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  //     </svg>
                  //   ),
                  //   active: pathname?.includes("/admin/jobs"),
                  //   dropdown: true,
                  //   dropdownItems: [
                  //     // { name: "Add New Job", path: "jobs/new" },
                  //     { name: "Job Categories", path: "jobs/categories" },
                  //     { name: "Featured Jobs", path: "jobs/featured" },
                  //   ],
                  // },
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
                  // {
                  //   name: "Messages",
                  //   path: "messages",
                  //   icon: <FaComment className="h-5 w-5" />,
                  //   active: isChatOpen,
                  //   badge: totalUnreadCount > 0,
                  //   badgeCount: totalUnreadCount,
                  // },
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
                    ],
                  },
                ].map((item, index) => (
                  <li key={index} className="relative nav-item-dropdown">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setDropdownOpen((prevState) =>
                              prevState === item.name ? null : item.name,
                            )
                          }
                          className={`flex items-center justify-between w-full ${
                            isNavCollapsed ? "p-3 justify-center" : "px-4 py-3"
                          } rounded-lg transition-colors text-left relative ${
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
                            {/* {item.badge && !isNavCollapsed && (
                              <span className="absolute right-3 top-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {item.badgeCount}
                              </span>
                            )} */}
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
                        onClick={() => {
                          if (item.name === "Messages") {
                            setIsChatOpen(!isChatOpen);
                            setDropdownOpen(null);
                          } else {
                            handleNavigation(item.path);
                          }
                        }}
                        className={`flex items-center ${
                          isNavCollapsed ? "p-3 justify-center" : "px-4 py-3"
                        } rounded-lg transition-colors w-full text-left relative ${
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
                        {/* {item.badge && !isNavCollapsed && (
                          <span className="absolute right-3 top-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {item.badgeCount}
                          </span>
                        )} */}
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
              {/* Chat toggle button */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
              >
                <FaComment className="h-5 w-5" />
                {totalUnreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalUnreadCount}
                  </span>
                )}
              </button>

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
          <main className="flex-1 overflow-y-auto hide-scrollbar bg-gradient-to-br from-blue-50/30 to-white">
            <div className="p-6">{children}</div>
          </main>
        </div>

        {/* Chat Panel - Fixed the overlay issue */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Left overlay - click to close */}
            <div
              className="flex-1 bg-black bg-opacity-50"
              onClick={handleCloseChat}
            />

            {/* Chat Panel */}
            <div className="bg-white w-full max-w-4xl h-full shadow-2xl flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-blue-100 p-4 flex items-center justify-between bg-white">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Chat Moderation
                  </h2>
                  <p className="text-sm text-gray-600">
                    Monitor conversations between users
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {selectedConversation && (
                    <button
                      onClick={() => handleReportChat(selectedConversation.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        reportedChats.includes(selectedConversation.id)
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {reportedChats.includes(selectedConversation.id)
                        ? "Reported"
                        : "Report Chat"}
                    </button>
                  )}
                  <button
                    onClick={handleCloseChat}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
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
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-blue-100 bg-blue-50/30 flex flex-col">
                  <div className="p-4 border-b border-blue-100 bg-white">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {filteredConversations.length} conversations
                      </span>
                      <span className="text-blue-600 font-medium">
                        {
                          conversations.filter(
                            (c) => c.unreadCount && c.unreadCount > 0,
                          ).length
                        }{" "}
                        unread
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {filteredConversations.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <FaComment className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No conversations found</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-blue-100">
                        {filteredConversations.map((conversation) => (
                          <div
                            key={conversation.id}
                            onClick={() => handleOpenChat(conversation)}
                            className={`p-4 cursor-pointer transition-colors hover:bg-white ${
                              selectedConversation?.id === conversation.id
                                ? "bg-white border-l-4 border-blue-600"
                                : "bg-transparent"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 line-clamp-1">
                                  {conversation.jobTitle}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">
                                    {conversation.jobSeekerName}
                                  </span>
                                  <span className="mx-1">↔</span>
                                  <span className="font-medium">
                                    {conversation.companyName}
                                  </span>
                                </p>
                                {conversation.lastMessage && (
                                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                    {conversation.lastMessage}
                                  </p>
                                )}
                                <p className="text-xs text-gray-400 mt-2">
                                  {conversation.updatedAt}
                                </p>
                              </div>
                              {conversation.unreadCount &&
                                conversation.unreadCount > 0 && (
                                  <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center ml-2">
                                    {conversation.unreadCount}
                                  </span>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 flex flex-col">
                  {selectedConversation ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-blue-100 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {selectedConversation.jobTitle}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                                Job Seeker
                              </span>
                              <span className="font-medium">
                                {selectedConversation.jobSeekerName}
                              </span>
                              <span className="mx-2">↔</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                                Company
                              </span>
                              <span className="font-medium">
                                {selectedConversation.companyName}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleBlockUser(
                                  selectedConversation.jobSeekerId,
                                  "job seeker",
                                )
                              }
                              className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Block Job Seeker
                            </button>
                            <button
                              onClick={() =>
                                handleBlockUser(
                                  selectedConversation.companyId,
                                  "company",
                                )
                              }
                              className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Block Company
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-blue-50/20 to-white">
                        {messages.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <FaComment className="h-16 w-16 mb-4 text-gray-300" />
                            <p>No messages yet</p>
                            <p className="text-sm mt-2">
                              Start of conversation
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${message.senderRole === "job_seeker" ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[70%] rounded-2xl p-4 ${
                                    message.senderRole === "job_seeker"
                                      ? "bg-white border border-blue-200 rounded-tl-none"
                                      : "bg-blue-600 text-white rounded-tr-none"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span
                                      className={`text-xs font-medium ${message.senderRole === "job_seeker" ? "text-blue-700" : "text-blue-100"}`}
                                    >
                                      {message.senderName} ({message.senderRole}
                                      )
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() =>
                                          handleDeleteMessage(message.id)
                                        }
                                        className={`p-1 rounded ${
                                          message.senderRole === "job_seeker"
                                            ? "text-gray-400 hover:text-red-500 hover:bg-red-50"
                                            : "text-blue-200 hover:text-red-200 hover:bg-red-900/20"
                                        } transition-colors`}
                                        title="Delete message"
                                      >
                                        <FaTrash className="h-3 w-3" />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-sm">{message.text}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span
                                      className={`text-xs ${message.senderRole === "job_seeker" ? "text-gray-500" : "text-blue-200"}`}
                                    >
                                      {new Date(
                                        message.createdAt,
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                    {message.seen && (
                                      <span className="text-xs text-green-500 flex items-center">
                                        <FaEye className="h-3 w-3 mr-1" />
                                        Seen
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Admin Notice */}
                      <div className="p-4 border-t border-blue-100 bg-yellow-50">
                        <div className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div className="text-sm text-yellow-800">
                            <p className="font-medium">Admin View Only</p>
                            <p className="mt-1">
                              You can monitor and moderate this conversation.
                              You cannot send messages. Use the buttons above to
                              block users if necessary.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                      <FaComment className="h-24 w-24 mb-6 text-gray-300" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">
                        Select a Conversation
                      </h3>
                      <p className="text-center max-w-md">
                        Choose a conversation from the list to view messages
                        between job seekers and companies.
                      </p>
                      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                          <div className="text-blue-600 font-bold text-2xl mb-2">
                            {conversations.length}
                          </div>
                          <div className="text-sm text-blue-800">
                            Total Conversations
                          </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                          <div className="text-green-600 font-bold text-2xl mb-2">
                            {
                              conversations.filter(
                                (c) => c.unreadCount && c.unreadCount > 0,
                              ).length
                            }
                          </div>
                          <div className="text-sm text-green-800">
                            Active Chats
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
