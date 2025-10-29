'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, BookOpen, GraduationCap, Award, Sparkles } from 'lucide-react';

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 pt-6 pb-8 sm:pt-8 sm:pb-12 lg:pt-12 lg:pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
      
      {/* Floating Educational Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 sm:left-20 text-green-400 opacity-30 sm:opacity-20"
        >
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 right-10 sm:right-20 text-blue-400 opacity-30 sm:opacity-20"
        >
          <GraduationCap className="w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-32 left-16 sm:left-32 text-purple-400 opacity-30 sm:opacity-20"
        >
          <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity }}
          className="absolute bottom-20 right-16 sm:right-28 text-orange-400 opacity-30 sm:opacity-20"
        >
          <Brain className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
        </motion.div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center max-w-5xl w-full"
          >
            {/* Decorative Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs sm:text-sm font-medium mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Welcome to WhizClub</span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </motion.div>

            {/* Main Heading with Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 leading-tight px-4">
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Unlocking Brilliance
                </span>
                <br />
                <span className="text-gray-800">Together</span>
              </h1>
            </motion.div>

            {/* Educational Icons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 sm:p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-lg"
              >
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="p-3 sm:p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg"
              >
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg"
              >
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="p-3 sm:p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg"
              >
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4"
            >
              Empowering students to achieve excellence in competitive exams through innovative learning and dedicated support
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
