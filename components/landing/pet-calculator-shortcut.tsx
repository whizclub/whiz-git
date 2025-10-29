'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, X } from 'lucide-react';
import { PETScoreCalculator } from '@/components/pet-score-calculator';
import { Button } from '@/components/ui/button';

export function PETCalculatorShortcut() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <>
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={() => setShowCalculator(true)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4 text-white">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">Calculate Your PET Score</h3>
                    <p className="text-white/90 text-xs sm:text-sm">Get instant ground score for APSP & AR positions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white group">
                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">Calculate Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Modal */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCalculator(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">PET Score Calculator</h2>
                  <p className="text-blue-100 text-sm sm:text-base">Calculate your Physical Efficiency Test score instantly</p>
                </div>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Calculator Content */}
              <div className="p-6">
                <PETScoreCalculator />
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-2xl flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCalculator(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

