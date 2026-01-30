'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTokens } from '@/lib';
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const token = getTokens()
  const router = useRouter();
  const pathname = usePathname(); 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if(token.accessToken){
    return <></>
  }

  const isHomePage = pathname === '/';
  const buttonText = isHomePage ? 'Sign In' : 'Go to Home';
  const buttonAction = () => {
    if (isHomePage) {
      router.push("/signin");
    } else {
      router.push("/");
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-lg border-b border-slate-200/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-xl shadow-lg shadow-slate-900/20 text-white font-bold text-lg">
            SD
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            SaaSDeals
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button 
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:text-blue-300 transition-all active:scale-95 cursor-pointer"
            onClick={buttonAction}
          >
            {buttonText}
          </button>
        </motion.div>

      </div>
    </nav>
  );
};

export default Navbar;