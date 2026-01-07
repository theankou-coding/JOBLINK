"use client";

import { useState } from "react";
import { Eye, EyeOff, Chrome, Github, Loader2 } from "lucide-react";
import { auth } from "@/firebase/clientApp";
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from "firebase/auth";

type CreateAccountFormProps = {
  onSwitch?: () => void;
  onSuccess: () => void; // New prop to trigger navigation
};

export default function CreateAccountForm({ onSwitch, onSuccess }: CreateAccountFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleSocialLogin = async (providerType: "google" | "github") => {
    setLoading(true);
    setError("");
    const provider = providerType === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onSuccess(); // Navigate after social signup
    } catch (err: any) {
      setError("Social signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(res.user, { 
        displayName: `${formData.firstName} ${formData.lastName}` 
      });
      
      // SUCCESS: Trigger parent to show CompleteProfileForm
      onSuccess();
      
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-sans">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Branding */}
        <div className="relative bg-gradient-to-b from-[#4640DE] to-[#1e1b4b] p-6 sm:p-10 lg:p-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute top-0 left-0 text-white/5 text-[10rem] sm:text-[15rem] font-bold leading-none -translate-x-12 -translate-y-12 select-none">
            JobLink
          </div>
          <div className="relative z-10 max-w-md mx-auto">
            <span className="text-white font-black text-2xl sm:text-3xl tracking-tighter italic mb-8 sm:mb-10 block">JobLink</span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">Create your future</h1>
            <p className="text-white/80 text-base sm:text-lg mb-10 sm:mb-16">Join JobLink and connect with opportunities.</p>
            <div className="relative space-y-8 sm:space-y-12">
              <div className="absolute left-[13px] top-2 bottom-2 w-px bg-white/20"></div>
              <StepItem emoji="📝" title="Create an account" desc="Set up your profile in minutes." />
              <StepItem emoji="💼" title="Discover opportunities" desc="Browse jobs tailored to your skills." />
              <StepItem emoji="🎯" title="Get hired" desc="Apply and grow your career." />
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-6 sm:p-10 lg:p-20 flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-black mb-2 sm:mb-3">Create account</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Start your journey with JobLink.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button onClick={() => handleSocialLogin("google")} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-800 bg-[#EEF2FF] text-black hover:bg-[#1c1c1c] transition-all">
                <Chrome size={18} /> <span className="text-xs font-medium">Google</span>
              </button>
              <button onClick={() => handleSocialLogin("github")} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-800 bg-[#EEF2FF] text-black hover:bg-[#1c1c1c] transition-all">
                <Github size={18} /> <span className="text-xs font-medium">GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center mb-8 sm:mb-10">
              <div className="grow border-t border-gray-800"></div>
              <span className="px-4 text-gray-600 text-[10px] uppercase font-bold tracking-widest">Or</span>
              <div className="grow border-t border-gray-800"></div>
            </div>

            {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="First name" className="w-full px-5 py-4 rounded-xl bg-[#EEF2FF] text-black border border-gray-800  focus:border-[#4640DE] outline-none transition-all"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                <input required type="text" placeholder="Last name" className="w-full px-5 py-4 rounded-xl bg-[#EEF2FF] text-black border border-gray-800  focus:border-[#4640DE] outline-none transition-all"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
              </div>
              <input required type="email" placeholder="Email address" className="w-full px-5 py-4 rounded-xl bg-[#EEF2FF] text-black border border-gray-800  focus:border-[#4640DE] outline-none transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} placeholder="Create password" className="w-full px-5 py-4 rounded-xl bg-[#EEF2FF] text-black border border-gray-800 focus:border-[#4640DE] outline-none transition-all"
                  onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button disabled={loading} className="w-full py-4 bg-gradient-to-r from-[#4640DE] to-[#3730a3] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(70,64,222,0.4)] transition-all flex items-center justify-center">
                {loading ? <Loader2 className="animate-spin" /> : "Create account"}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-500 text-sm">
              Already have an account? <button type="button" className="text-[#4640DE] font-bold hover:underline ml-1" onClick={onSwitch}>Sign in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// StepItem component stays the same...
function StepItem({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="group flex items-start gap-4 sm:gap-6 relative">
      <div className="z-10 shrink-0 w-7 h-7 rounded-full border border-white/30 bg-[#1e1b4b] flex items-center justify-center mt-1 group-hover:border-white transition-all">
        <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white transition-all"></div>
      </div>
      <div className="bg-black/20 border border-white/10 p-5 rounded-2xl w-full hover:bg-black/30 transition-all border-l-2 border-l-transparent hover:border-l-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-lg">{emoji}</span>
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        <p className="text-white/50 text-sm">{desc}</p>
      </div>
    </div>
  );
}