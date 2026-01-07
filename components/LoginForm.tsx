"use client";

<<<<<<< HEAD
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Chrome, Github, Loader2 } from "lucide-react";
import { auth } from "@/firebase/clientApp";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from "firebase/auth";
=======
import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import CustomInput from "./CustomInput";
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029

type LoginFormProps = {
  onSwitch?: () => void;
};

<<<<<<< HEAD
export default function LoginForm({ onSwitch }: LoginFormProps) {
  const router = useRouter();
=======
const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

<<<<<<< HEAD
  // Handle social login (Google/GitHub)
  const handleSocialLogin = async (providerType: "google" | "github") => {
    setLoading(true);
    setError("");
    const provider =
      providerType === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      // ✅ Redirect to home after successful login
      router.replace("/home");
    } catch (err: any) {
      setError("Social login failed. Please try again.");
    } finally {
      setLoading(false);
    }
=======
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 1) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
  };

  // Handle email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ✅ Redirect to home after successful login
      router.replace("/home");
    } catch (err: any) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
=======
    if (validate()) {
      console.log("Logging in with:", { email, password });
      // Logic for logging in...
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
    }
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-sans">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT INFO PANEL */}
        <div className="relative bg-gradient-to-b from-[#4640DE] to-[#1e1b4b] p-6 sm:p-10 lg:p-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute top-0 left-0 text-white/5 text-[10rem] sm:text-[15rem] font-bold leading-none -translate-x-12 -translate-y-12 select-none">
            JobLink
          </div>
          <div className="relative z-10 max-w-md mx-auto">
            <span className="text-white font-black text-2xl sm:text-3xl tracking-tighter italic mb-8 sm:mb-10 block">JobLink</span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">Build your career</h1>
            <p className="text-white/80 text-base sm:text-lg mb-10 sm:mb-16">Sign in to discover jobs, track applications, and grow professionally.</p>
            <div className="relative space-y-8 sm:space-y-12">
              <div className="absolute left-[13px] top-2 bottom-2 w-px bg-white/20"></div>
              <StepItem emoji="👤" title="Sign in to JobLink" desc="Access your personalized job dashboard." />
              <StepItem emoji="📄" title="Apply with confidence" desc="Send applications using your saved profile." />
              <StepItem emoji="🚀" title="Advance your career" desc="Get hired and grow with new opportunities." />
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="bg-white p-6 sm:p-10 lg:p-20 flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-black mb-2 sm:mb-3">Sign in to JobLink</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Enter your credentials to continue.</p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button onClick={() => handleSocialLogin("google")} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-800 bg-[#EEF2FF] text-black hover:bg-[#1c1c1c] transition-all">
                <Chrome size={18} />
                <span className="text-xs font-medium">Google</span>
              </button>
              <button onClick={() => handleSocialLogin("github")} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-800 bg-[#EEF2FF] text-black hover:bg-[#1c1c1c] transition-all">
                <Github size={18} />
                <span className="text-xs font-medium">GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center mb-8 sm:mb-10">
              <div className="grow border-t border-gray-800"></div>
              <span className="px-3 sm:px-4 text-gray-600 text-[10px] uppercase font-bold tracking-widest">Or</span>
              <div className="grow border-t border-gray-800"></div>
            </div>

            {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

            <form onSubmit={handleEmailLogin} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-[#EEF2FF] text-black border border-gray-800 focus:outline-none focus:border-[#4640DE] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-[#EEF2FF] text-black border border-gray-800 focus:outline-none focus:border-[#4640DE] transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button disabled={loading} className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#4640DE] to-[#3730a3] text-white font-bold text-base sm:text-lg rounded-xl hover:shadow-[0_0_20px_rgba(70,64,222,0.4)] transition-all flex items-center justify-center">
                {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
              </button>
            </form>

            <p className="mt-6 sm:mt-8 text-center text-gray-500 text-xs sm:text-sm">
              New to JobLink? <button type="button" className="text-[#4640DE] font-bold hover:underline ml-1" onClick={() => onSwitch?.()}>Sign up</button>
            </p>
          </div>
        </div>
      </div>
=======
    <div className="grow flex flex-col justify-center">
      <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">
        Welcome back
      </p>
      {/* Main header text is now dark */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Log into your account<span className="text-blue-600">.</span>
      </h1>
      <p className="text-sm font-light text-gray-600 mb-12">
        Need an account?{" "}
        <button
          onClick={onSwitch}
          type="button"
          // Link color changed to blue and dark
          className="text-blue-600 font-medium hover:underline focus:outline-none"
        >
          Create new account
        </button>
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* CustomInput colors need to be handled inside CustomInput.tsx to work well with light theme. 
            Assuming CustomInput handles light theme styles (dark text on light background). */}

        <CustomInput
          label="Email"
          id="loginEmail"
          type="email"
          icon={Mail}
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <CustomInput
          label="Password"
          id="loginPassword"
          type="password"
          icon={Lock}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex justify-between items-center text-sm">
          {/* Text is dark/gray */}
          <label className="flex items-center text-gray-600 space-x-2">
            {/* Checkbox styling may need adjustments in a global CSS or Tailwind config */}
            <input
              type="checkbox"
              className="form-checkbox text-blue-600 bg-white border-gray-400 rounded focus:ring-0"
            />
            <span>Remember me</span>
          </label>
          {/* Link is blue */}
          <a
            href="#"
            className="text-blue-600 hover:underline text-sm font-light"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          // Primary button color changed to blue-600
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/50 flex items-center justify-center space-x-2"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      </form>
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
    </div>
  );
}

<<<<<<< HEAD
function StepItem({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="group flex items-start gap-4 sm:gap-6 relative">
      <div className="z-10 shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/30 bg-[#1e1b4b] flex items-center justify-center mt-1 group-hover:border-white">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 group-hover:bg-white"></div>
      </div>
      <div className="bg-black/20 border border-white/10 p-4 sm:p-5 rounded-2xl w-full hover:bg-black/30 transition-all border-l-2 border-l-transparent hover:border-l-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-base sm:text-lg">{emoji}</span>
          <h3 className="text-white font-bold text-base sm:text-lg">{title}</h3>
        </div>
        <p className="text-white/50 text-xs sm:text-sm">{desc}</p>
      </div>
    </div>
  );
}
=======
export default LoginForm;
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
