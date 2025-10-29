'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Coins } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export function DonationBanner() {
  const router = useRouter();
  const { session } = useAuth();

  const handleDonate = () => {
    if (!session) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }
    router.push('/payment');
  };

  return (
    <section className="py-10 lg:py-12 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-8 -left-4 w-48 h-48 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Card */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-200">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-10"></div>
            
            {/* Content */}
            <div className="relative p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Left side - Rupee Symbol and Sparkles */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex-shrink-0 relative"
                >
                  {/* Animated Rupee Circle */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl"
                    >
                      <span className="text-5xl lg:text-6xl font-black text-white">₹</span>
                    </motion.div>
                    
                    {/* Floating Sparkles */}
                    <motion.div
                      animate={{
                        y: [-8, 8, -8],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="w-5 h-5 text-orange-400 fill-orange-400" />
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        y: [8, -8, 8],
                        rotate: [360, 180, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -bottom-1 -left-1"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right side - Message and CTA */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Main Message - Large and Bold */}
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 mb-6 leading-tight pb-1"
                  >
                    INTERESTED CANDIDATES OF WHIZ CLUB PAY 99/- AND WAIT
                  </motion.h2>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <button
                      onClick={handleDonate}
                      className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <span>Pay ₹99 Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Decorative Border */}
            <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;700;900&display=swap');
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .animate-shine {
          animation: shine 0.8s ease-in-out;
        }
      `}</style>
    </section>
  );
}

