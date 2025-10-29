'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Bell, TrendingUp, Users, MapPin, ArrowRight, Sparkles, AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export function TrainingNewsBanner() {
  const [showDetails, setShowDetails] = useState(false);
  const [showCautionModal, setShowCautionModal] = useState(false);

  return (
    <section className="py-4 sm:py-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Hot Badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-red-600 text-xs sm:text-sm font-bold mb-3 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <Bell className="w-4 h-4 animate-pulse" />
            HOT UPDATE!
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </motion.div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            🎉 AP Constable 2022 Training Allotment Announced! 🎉
          </h2>
          
          <p className="text-white/90 text-sm sm:text-base mb-4">
            Training center allotment details for selected Civil Constable candidates released
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30"
            >
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">2,444</div>
                  <div className="text-xs">Men Candidates</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30"
            >
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">1,063</div>
                  <div className="text-xs">Women Candidates</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30"
            >
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">9+</div>
                  <div className="text-xs">Training Centers</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* View Details Button */}
          <motion.button
            onClick={() => {
              if (!showDetails) {
                setShowCautionModal(true);
              } else {
                setShowDetails(false);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <TrendingUp className="w-5 h-5" />
            {showDetails ? 'Hide Details' : 'View Training Centers'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Caution Modal */}
        <AnimatePresence>
          {showCautionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setShowCautionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowCautionModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-3">
                  ⚠️ Important Notice
                </h3>

                {/* Message */}
                <div className="space-y-3 mb-6">
                  <p className="text-gray-700 text-center text-sm sm:text-base">
                    <strong className="text-yellow-600">These are NOT official training center allotments.</strong>
                  </p>
                  <p className="text-gray-600 text-center text-sm">
                    The information displayed is based on preliminary data and may not be accurate. 
                    Please wait for the official announcement from APSLPRB for confirmed training center allotments.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <p className="text-xs text-gray-700">
                      <strong>📢 Note:</strong> Always verify with official sources before making any decisions or travel arrangements.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowCautionModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowCautionModal(false);
                      setShowDetails(true);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg"
                  >
                    I Understand, Continue
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable Details Section */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 sm:mt-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* Men Training Centers */}
              <div className="bg-white/95 backdrop-blur rounded-xl p-3 sm:p-4 lg:p-6 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span className="text-sm sm:text-base">Men Candidates (2,444 Total)</span>
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {/* PTC Tirupati */}
                  <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">PTC, Tirupati</span>
                        <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">595</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Ananthapuramu</span>
                        <span className="font-semibold text-blue-700">208</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Guntur Rural</span>
                        <span className="font-semibold text-blue-700">211</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Krishna</span>
                        <span className="font-semibold text-blue-700">176</span>
                      </div>
                    </div>
                  </div>

                  {/* PTC Ananthapuramu */}
                  <div className="border-2 border-green-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">PTC, Ananthapuramu</span>
                        <span className="bg-white text-green-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">580</span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• East Godavari</span>
                        <span className="font-semibold text-green-700">207</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Chittoor</span>
                        <span className="font-semibold text-green-700">159</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• West Godavari</span>
                        <span className="font-semibold text-green-700">138</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Tirupati Urban</span>
                        <span className="font-semibold text-green-700">76</span>
                      </div>
                    </div>
                  </div>

                  {/* DTC Srikakulam */}
                  <div className="border-2 border-purple-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">DTC, Srikakulam</span>
                        <span className="bg-white text-purple-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">221</span>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Kadapa</span>
                        <span className="font-semibold text-purple-700">221</span>
                      </div>
                    </div>
                  </div>

                  {/* DTC Vizianagaram */}
                  <div className="border-2 border-orange-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">DTC, Vizianagaram</span>
                        <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">196</span>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Kurnool</span>
                        <span className="font-semibold text-orange-700">196</span>
                      </div>
                    </div>
                  </div>

                  {/* DTC Pedavegi */}
                  <div className="border-2 border-pink-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">DTC, Pedavegi (Eluru)</span>
                        <span className="bg-white text-pink-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">196</span>
                      </div>
                    </div>
                    <div className="bg-pink-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Nellore</span>
                        <span className="font-semibold text-pink-700">108</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Vizianagaram</span>
                        <span className="font-semibold text-pink-700">88</span>
                      </div>
                    </div>
                  </div>

                  {/* DTC Prakasam (Ongole) */}
                  <div className="border-2 border-red-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">DTC, Prakasam (Ongole)</span>
                        <span className="bg-white text-red-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">153</span>
                      </div>
                    </div>
                    <div className="bg-red-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Vijayawada City</span>
                        <span className="font-semibold text-red-700">100</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Rajamahendravaram (U)</span>
                        <span className="font-semibold text-red-700">53</span>
                      </div>
                    </div>
                  </div>

                  {/* DTC Nellore */}
                  <div className="border-2 border-indigo-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">DTC, Nellore</span>
                        <span className="bg-white text-indigo-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">189</span>
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Visakhapatnam City</span>
                        <span className="font-semibold text-indigo-700">122</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Srikakulam</span>
                        <span className="font-semibold text-indigo-700">67</span>
                      </div>
                    </div>
                  </div>

                  {/* DTC Chittoor */}
                  <div className="border-2 border-yellow-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">DTC, Chittoor</span>
                        <span className="bg-white text-yellow-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">191</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Prakasam</span>
                        <span className="font-semibold text-yellow-700">137</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Guntur Urban</span>
                        <span className="font-semibold text-yellow-700">54</span>
                      </div>
                    </div>
                  </div>

                  {/* DTC Ananthapuramu */}
                  <div className="border-2 border-teal-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">DTC, Ananthapuramu</span>
                        <span className="bg-white text-teal-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">123</span>
                      </div>
                    </div>
                    <div className="bg-teal-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Visakhapatnam Rural</span>
                        <span className="font-semibold text-teal-700">123</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Women Training Centers */}
              <div className="bg-white/95 backdrop-blur rounded-xl p-3 sm:p-4 lg:p-6 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                  <span className="text-sm sm:text-base">Women Candidates (1,063 Total)</span>
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {/* PTC Vizianagaram */}
                  <div className="border-2 border-purple-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">PTC, Vizianagaram</span>
                        <span className="bg-white text-purple-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">531</span>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Guntur Rural</span>
                        <span className="font-semibold text-purple-700">89</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• East Godavari</span>
                        <span className="font-semibold text-purple-700">89</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Krishna</span>
                        <span className="font-semibold text-purple-700">74</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Prakasam</span>
                        <span className="font-semibold text-purple-700">67</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• West Godavari</span>
                        <span className="font-semibold text-purple-700">65</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Nellore</span>
                        <span className="font-semibold text-purple-700">50</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Vijayawada City</span>
                        <span className="font-semibold text-purple-700">49</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Guntur Urban</span>
                        <span className="font-semibold text-purple-700">25</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Rajamahendravaram Urban</span>
                        <span className="font-semibold text-purple-700">23</span>
                      </div>
                    </div>
                  </div>

                  {/* PTC Ongole */}
                  <div className="border-2 border-pink-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 sm:p-3">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm sm:text-base">PTC, Ongole (FOR WOMEN)</span>
                        <span className="bg-white text-pink-600 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">532</span>
                      </div>
                    </div>
                    <div className="bg-pink-50 p-2 sm:p-3 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Kadapa</span>
                        <span className="font-semibold text-pink-700">102</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Ananthapuramu</span>
                        <span className="font-semibold text-pink-700">99</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Kurnool</span>
                        <span className="font-semibold text-pink-700">88</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Chittoor</span>
                        <span className="font-semibold text-pink-700">64</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Visakhapatnam City</span>
                        <span className="font-semibold text-pink-700">59</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Vizianagaram</span>
                        <span className="font-semibold text-pink-700">45</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Tirupati Urban</span>
                        <span className="font-semibold text-pink-700">29</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Srikakulam</span>
                        <span className="font-semibold text-pink-700">23</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700">• Visakhapatnam Rural</span>
                        <span className="font-semibold text-pink-700">23</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-800">
                <strong className="text-yellow-800">📢 Important Note:</strong> Proposals for reallotment of SCT PCs (Men) from 
                Srikakulam and Visakhapatnam Rural Districts to DTC Nellore & DTC Ananthapuram are under consideration due to 
                women SCTCPS already allotted to DTC Ongole for Basic Training.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-3 sm:mt-4 text-center">
              <Link href="/courses/ap-constable">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm sm:text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  View Complete Details
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

