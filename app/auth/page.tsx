"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; 
import { auth, rtdb } from '@/firebase/clientApp';
import { ref, get } from 'firebase/database';
import LoginForm from '@/components/LoginForm';
import CreateAccountForm from '@/components/CreateAccountForm';
import CompleteProfileForm from '@/components/CompleteProfileForm';

type FormType = 'login' | 'register' | 'complete';

function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlForm = searchParams?.get('form');
  
  const [currentForm, setCurrentForm] = useState<FormType>('register'); 

  useEffect(() => {
    if (urlForm === 'login') setCurrentForm('login');
    if (urlForm === 'create-account') setCurrentForm('register');
  }, [urlForm]);

  // Logic to verify if the user has finished their profile setup
  const checkUserStatus = async (uid: string) => {
    try {
      const userRef = ref(rtdb, `users/${uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists() && snapshot.val().setupComplete === true) {
        // Profile is done, send them to home
        router.replace('/home');
      } else {
        // Profile incomplete, show the completion form
        setCurrentForm('complete');
      }
    } catch (error) {
      console.error("Error checking profile status:", error);
      // Fallback to complete profile if there's an error
      setCurrentForm('complete');
    }
  };

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
            <LoginForm 
              onSwitch={handleSwitch} 
              onSuccess={checkUserStatus} // Now passes UID to our check function
            />
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

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="bg-[#0a0a0a] min-h-screen" />}>
      <AuthContent />
    </Suspense>
  );
}