"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Smartphone,
  User,
  Building,
  ArrowRight,
  CheckCircle,
  Facebook,
  Chrome,
  Apple,
  Shield,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  // const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    accountType: "job-seeker",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Simple validation
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
    }

    if (!isLogin && !formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  const benefits = [
    "Connect with local employers in Cambodia",
    "Apply to verified jobs instantly",
    "Track your applications in real-time",
    "Get personalized job recommendations",
    "Secure messaging with employers",
  ];

  return (
    <div className="relative mt-50 py-10 min-h-screen  flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-blue-50 px-4">
      <div className=" max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Left Column - Welcome & Benefits */}
        <div className=" lg:pr-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {isLogin ? "Welcome Back!" : "Join JobLink Cambodia"}
              <span className="block text-blue-600 text-3xl md:text-4xl mt-2">
                {isLogin
                  ? "Continue your journey"
                  : "Start your career journey"}
              </span>
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              {isLogin
                ? "Sign in to access your account and discover new opportunities in Cambodia's job market."
                : "Create your free account and connect with thousands of job opportunities across Cambodia."}
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">5K+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:pl-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
            {/* Toggle Login/Signup */}
            <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Social Login */}
            <div className="mb-8">
              <p className="text-center text-gray-600 mb-4">Continue with</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <Chrome className="w-5 h-5" />
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("apple")}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <Apple className="w-5 h-5" />
                  <span className="text-sm font-medium">Apple</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-gray-500">or continue with email</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  {/* Account Type */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            accountType: "job-seeker",
                          }))
                        }
                        className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          formData.accountType === "job-seeker"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span>Job Seeker</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            accountType: "employer",
                          }))
                        }
                        className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          formData.accountType === "employer"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Building className="w-5 h-5" />
                        <span>Employer</span>
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Smartphone className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="+855 12 345 678"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Remember me
                  </span>
                </label>
                {isLogin && (
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              {/* Terms */}
              {!isLogin && (
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to JobLink&apos;s{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </>
                ) : (
                  <>
                    {isLogin
                      ? "Sign In to Your Account"
                      : "Create Free Account"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Your data is secured with 256-bit encryption</span>
              </div>
            </form>

            {/* Switch Mode */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  {isLogin ? "Sign up for free" : "Sign in here"}
                </button>
              </p>
            </div>

            {/* Quick Links */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Link
                href="/jobs"
                className="text-center py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Browse Jobs
              </Link>
              <Link
                href="/contact"
                className="text-center py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Need Help?
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span>Verified Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
