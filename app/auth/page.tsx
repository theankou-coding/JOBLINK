"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import LoginForm from '@/components/LoginForm';
import CreateAccountForm from '@/components/CreateAccountForm';
import CompleteProfileForm from '@/components/CompleteProfileForm';

type FormType = 'login' | 'register' | 'profile';

export default function AuthPage() {
  const searchParams = useSearchParams();
  
  const urlForm = searchParams?.get('form');
  const initialForm: FormType = urlForm === 'login' ? 'login' : 'register';

  const [currentForm, setCurrentForm] = useState<FormType>(initialForm); 
  
  // Handlers
  const handleSwitchAuth = () => {
      setCurrentForm(prev => (prev === 'login' ? 'register' : 'login'));
  };

  const handleContinueToProfile = () => {
      setCurrentForm('profile');
  };

  const handleBackToRegister = () => {
      setCurrentForm('register');
  };

  // --- Reusable Components for Layout ---

  const Header = (
      // Changed text from white to dark gray/black
      <header className="flex items-center justify-between text-gray-800 mb-10 shrink-0">
          <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span className="text-xl text-blue-600 font-bold">JobLink.</span>
          </div>
          <nav className="flex space-x-6 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-blue-600 transition duration-150">Home</a>
              <a href="/home" className="hover:text-blue-600 transition duration-150">Skip</a>
          </nav>
      </header>
  );

  const BackgroundPanelContent = (
      <>
          {/* Background Image Placeholder */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'url("https://i.pinimg.com/1200x/83/f6/63/83f663e1e70ff9495e316763bfd0e7fc.jpg")',
              filter: ' brightness(100%)', // grayscale(50%)
              opacity: 0.9 
            }}
          >
          </div>
          
          {/* Abstract Wave/Line Element */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Changed fill to a transparent blue shade for light background */}
            <svg viewBox="0 0 100 100" className="absolute top-0 right-0 h-full w-full opacity-10">
              <path fill="#e0f2fe" d="M0,0 L0,100 L30,100 C60,80 60,20 30,0 Z" />
            </svg>
          </div>

          {/* Logo/Icon on the bottom right (Kept dark for contrast against light image) */}
          <div className="absolute bottom-10 right-10 z-20 text-gray-900 text-5xl font-bold opacity-80">
            <span className="w-10 h-10 block relative">
                <div className="absolute bottom-0 left-0 w-3 h-8 bg-gray-900 transform skew-x-[-15deg]"></div>
                <div className="absolute bottom-0 left-3 w-3 h-10 bg-gray-900 transform skew-x-[-15deg]"></div>
                <div className="absolute bottom-0 right-0 w-3 h-8 bg-blue-600 transform skew-x-[-15deg] opacity-70"></div>
            </span>
          </div>
      </>
  );
  
  const FormPanelContent = (
      <>
          {Header}
          <div className="flex-grow flex items-center justify-center"> 
             <div className="w-full max-w-lg">
                {currentForm === 'register' && (
                    <CreateAccountForm onSwitch={handleSwitchAuth} onContinue={handleContinueToProfile} />
                )}
                {currentForm === 'login' && (
                    <LoginForm onSwitch={handleSwitchAuth} />
                )}
                {currentForm === 'profile' && (
                    <CompleteProfileForm onBack={handleBackToRegister} />
                )}
             </div>
          </div>
          {/* Abstract Wave/Line Element (for the form side) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Changed stroke to light blue/gray */}
            <svg viewBox="0 0 100 100" className="absolute top-0 left-0 h-full w-full opacity-20">
                <path fill="none" stroke="#93c5fd" strokeWidth="0.5" d="M0,50 C15,20 40,80 65,40 80,20 100,50 100,50" />
            </svg>
          </div>
      </>
  );

  return (
    // Outer container: Now uses a light background color
    <div className="min-h-screen w-full bg-gray-50 font-sans"> 
      
      {/* Main container: Light background color */}
      <div className="w-full h-screen bg-white overflow-hidden flex relative">
        
        {/* --- LEFT PANEL: Form Content (Always Left) --- */}
        <div className={`
          w-full lg:w-1/2 
          p-8 md:p-16 flex flex-col justify-start overflow-y-auto
          relative
          bg-white // Form background is white
        `}>
          {FormPanelContent}
        </div>

        {/* --- RIGHT PANEL: Background Image --- */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0">
            {BackgroundPanelContent}
          </div>
        </div>
        
      </div>
    </div>
  );
}