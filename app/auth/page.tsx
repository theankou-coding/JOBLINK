"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; 
import LoginForm from '@/components/LoginForm';
import CreateAccountForm from '@/components/CreateAccountForm';
import CompleteProfileForm from '@/components/CompleteProfileForm';

type FormType = 'login' | 'register' | 'complete';

// Created a sub-component to handle SearchParams safely in Next.js
function AuthContent() {
  const searchParams = useSearchParams();
  const urlForm = searchParams?.get('form');
  
  const [currentForm, setCurrentForm] = useState<FormType>('register'); 

  useEffect(() => {
    if (urlForm === 'login') setCurrentForm('login');
    if (urlForm === 'create-account') setCurrentForm('register');
  }, [urlForm]);

  const handleSwitch = () => {
    setCurrentForm(prev => (prev === 'login' ? 'register' : 'login'));
  };

  const handleAccountCreated = () => {
    setCurrentForm('complete');
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0a]">
      <div className="flex w-full flex-col justify-center items-center">
        {currentForm === 'register' && (
          <CreateAccountForm 
            onSwitch={handleSwitch} 
            onSuccess={handleAccountCreated} 
          />
        )}

        {currentForm === 'login' && (
          <div className="w-full max-w-md p-4">
             <LoginForm onSwitch={handleSwitch} />
          </div>
        )}

        {currentForm === 'complete' && (
          <div className="w-full max-w-md p-4 animate-in fade-in zoom-in duration-300">
            <CompleteProfileForm onBack={() => setCurrentForm('register')} />
          </div>
        )}
      </div>
    </div>
  );
}

// Main Page Export
export default function AuthPage() {
  return (
    <Suspense fallback={<div className="bg-[#0a0a0a] min-h-screen" />}>
      <AuthContent />
    </Suspense>
  );
}