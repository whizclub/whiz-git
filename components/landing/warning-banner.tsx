'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield } from 'lucide-react';

export function WarningBanner() {
  const [badgeError, setBadgeError] = useState(false);
  return (
    <section className="relative py-6 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* AP Police Badge */}
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
              {!badgeError ? (
                <Image
                  src="/police-badge.png"
                  alt="AP Police Badge"
                  fill
                  className="object-contain"
                  priority
                  onError={() => setBadgeError(true)}
                  onLoadingComplete={() => setBadgeError(false)}
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-3">
            <h2 className="text-sm sm:text-base md:text-lg font-black text-white mb-1 tracking-tight">
              ATTENTION
            </h2>
            <h3 className="text-xs sm:text-sm md:text-base font-black text-white tracking-tight">
              ANDHRA PRADESH POLICE ASPIRANTS!
            </h3>
          </div>

          {/* Warning Text */}
          <div className="mb-3">
            <p className="text-base sm:text-lg md:text-xl font-black text-red-500 tracking-wide">
              "BEWARE OF SCAM INSTITUTES"
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 bg-white"></div>
        </motion.div>
      </div>
    </section>
  );
}

