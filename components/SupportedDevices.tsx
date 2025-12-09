"use client";

export default function DeviceSupport() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
        Supported on All Devices
      </h1>
      <p className="text-gray-600 mb-12 text-center">
        Access JobLink seamlessly on any platform
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl w-full">
        {/* Desktop Device */}
        <div className="relative">
          <div className="relative bg-gray-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            {/* Desktop Screen */}
            <div className="bg-linear-to-br from-blue-100 to-gray-100 rounded-xl overflow-hidden border-4 border-gray-800">
              <div className="h-48 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Desktop
                  </h3>
                  <p className="text-gray-600 mt-2">Fully responsive design</p>
                </div>
              </div>
            </div>

            {/* Desktop Stand */}
            <div className="mt-4 flex justify-center">
              <div className="w-32 h-3 bg-gray-800 rounded-b-lg"></div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="w-48 h-2 bg-gray-700 rounded-lg"></div>
            </div>
          </div>

          {/* Desktop Label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg">
              Desktop
            </span>
          </div>
        </div>

        {/* Laptop Device */}
        <div className="relative">
          <div className="relative bg-gray-800 rounded-2xl p-4 shadow-2xl">
            {/* Laptop Screen */}
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden border-4 border-gray-800">
              <div className="h-48 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-linear-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Laptop
                  </h3>
                  <p className="text-gray-600 mt-2">Portable productivity</p>
                </div>
              </div>
            </div>

            {/* Laptop Base */}
            <div className="mt-4 flex justify-center">
              <div className="w-40 h-4 bg-gray-800 rounded-lg"></div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="w-48 h-1 bg-gray-600 rounded-lg"></div>
            </div>
          </div>

          {/* Laptop Label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg">
              Laptop
            </span>
          </div>
        </div>

        {/* iOS Device */}
        <div className="relative">
          <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl border-8 border-gray-900">
            {/* Phone Screen */}
            <div className="bg-linear-to-b from-white to-gray-100 rounded-4xl overflow-hidden">
              <div className="h-48 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                  <div className="w-14 h-14 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-1.012 1.298-2.429 1.142-3.83-1.207.052-2.649.805-3.497 1.752-.784.896-1.48 2.337-1.285 3.714 1.338.104 2.715-.688 3.64-1.636z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">iOS</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Native app experience
                  </p>
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* iOS Label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg">
              iOS
            </span>
          </div>
        </div>

        {/* Android Device */}
        <div className="relative">
          <div className="relative bg-black rounded-3xl p-4 shadow-2xl border-8 border-gray-900">
            {/* Phone Screen */}
            <div className="bg-linear-to-b from-emerald-50 to-blue-50 rounded-2xl overflow-hidden">
              <div className="h-48 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                  <div className="w-14 h-14 bg-linear-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.523 15.3414C17.4112 15.7915 17.2796 16.3919 17.2796 16.9579C17.2796 19.1632 18.9266 20.945 20.8515 20.945C21.5176 20.945 22.2375 20.6135 22.7109 20.1806C23.2119 19.7233 23.5424 19.0589 23.5424 18.2845C23.5424 16.1648 21.8263 15.0545 19.6513 15.0545C19.0337 15.0545 17.523 15.1506 17.523 15.3414ZM10.8884 15.3414C10.7767 15.7915 10.645 16.3919 10.645 16.9579C10.645 19.1632 12.292 20.945 14.2169 20.945C14.883 20.945 15.6029 20.6135 16.0763 20.1806C16.5773 19.7233 16.9078 19.0589 16.9078 18.2845C16.9078 16.1648 15.1917 15.0545 13.0167 15.0545C12.3991 15.0545 10.8884 15.1506 10.8884 15.3414Z" />
                      <path d="M11.0317 1.91699C11.0317 1.91699 8.25742 2.83826 6.3899 5.38062C4.29277 8.222 4.29277 12.7181 6.3899 15.5595C8.25742 18.1018 11.0317 19.0231 11.0317 19.0231C11.0317 19.0231 13.806 18.1018 15.6735 15.5595C17.7706 12.7181 17.7706 8.222 15.6735 5.38062C13.806 2.83826 11.0317 1.91699 11.0317 1.91699Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Android
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">Mobile optimized</p>
                </div>
              </div>
            </div>

            {/* Home Button */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-2 bg-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Android Label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg">
              Android
            </span>
          </div>
        </div>
      </div>

      {/* Compatibility Badges */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl w-full">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Desktop</h4>
              <p className="text-sm text-gray-600">Full screen experience</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Laptop</h4>
              <p className="text-sm text-gray-600">Work anywhere</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-1.012 1.298-2.429 1.142-3.83-1.207.052-2.649.805-3.497 1.752-.784.896-1.48 2.337-1.285 3.714 1.338.104 2.715-.688 3.64-1.636z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">iOS</h4>
              <p className="text-sm text-gray-600">Apple App Store</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.523 15.3414C17.4112 15.7915 17.2796 16.3919 17.2796 16.9579C17.2796 19.1632 18.9266 20.945 20.8515 20.945C21.5176 20.945 22.2375 20.6135 22.7109 20.1806C23.2119 19.7233 23.5424 19.0589 23.5424 18.2845C23.5424 16.1648 21.8263 15.0545 19.6513 15.0545C19.0337 15.0545 17.523 15.1506 17.523 15.3414ZM10.8884 15.3414C10.7767 15.7915 10.645 16.3919 10.645 16.9579C10.645 19.1632 12.292 20.945 14.2169 20.945C14.883 20.945 15.6029 20.6135 16.0763 20.1806C16.5773 19.7233 16.9078 19.0589 16.9078 18.2845C16.9078 16.1648 15.1917 15.0545 13.0167 15.0545C12.3991 15.0545 10.8884 15.1506 10.8884 15.3414Z" />
                <path d="M11.0317 1.91699C11.0317 1.91699 8.25742 2.83826 6.3899 5.38062C4.29277 8.222 4.29277 12.7181 6.3899 15.5595C8.25742 18.1018 11.0317 19.0231 11.0317 19.0231C11.0317 19.0231 13.806 18.1018 15.6735 15.5595C17.7706 12.7181 17.7706 8.222 15.6735 5.38062C13.806 2.83826 11.0317 1.91699 11.0317 1.91699Z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Android</h4>
              <p className="text-sm text-gray-600">Google Play Store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
