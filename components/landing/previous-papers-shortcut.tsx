'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, X, Shield, Calendar } from 'lucide-react';

export function PreviousPapersShortcut() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<'constable' | 'sub-inspector' | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handlePostSelection = (post: 'constable' | 'sub-inspector') => {
    setSelectedPost(post);
  };

  const handleYearSelection = (year: string) => {
    setSelectedYear(year);
    // Navigate to the course page with the year parameter
    const courseUrl = selectedPost === 'constable' 
      ? `/courses/ap-constable?year=${year}&scroll=papers`
      : `/courses/ap-sub-inspector?year=${year}&scroll=papers`;
    
    router.push(courseUrl);
    // Close the modal after navigation
    setTimeout(() => {
      setShowModal(false);
      setSelectedPost(null);
      setSelectedYear(null);
    }, 100);
  };

  const handleBackToYear = () => {
    setSelectedYear(null);
  };

  const handleBackToPost = () => {
    setSelectedPost(null);
    setSelectedYear(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPost(null);
    setSelectedYear(null);
  };

  const getCurrentTitle = () => {
    if (!selectedPost) return 'Select Post Type';
    if (!selectedYear) return 'Select Year';
    return `${selectedPost === 'constable' ? 'AP Constable' : 'AP Sub-Inspector'} - ${selectedYear}`;
  };

  const getCurrentDescription = () => {
    if (!selectedPost) return 'Choose the position to view previous year papers';
    if (!selectedYear) return 'Choose the recruitment year';
    return `Select to view ${selectedPost === 'constable' ? 'AP Constable' : 'AP Sub-Inspector'} ${selectedYear} question papers`;
  };

  return (
    <>
      <section className="py-6 sm:py-8 bg-white">
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
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4 text-white">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">Previous Year Papers</h3>
                    <p className="text-white/90 text-xs sm:text-sm">Download question papers with answer keys</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white group">
                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">View Papers</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course & Year Selection Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">
                      {getCurrentTitle()}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {getCurrentDescription()}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {!selectedPost ? (
                  /* Post Type Selection */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePostSelection('constable')}
                      className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all group"
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                          <Shield className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">AP Constable</h4>
                          <p className="text-sm text-gray-600">
                            Previous year question papers for Constable recruitment
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePostSelection('sub-inspector')}
                      className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all group"
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                          <Shield className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">AP Sub-Inspector</h4>
                          <p className="text-sm text-gray-600">
                            Previous year question papers for Sub-Inspector recruitment
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  </div>
                ) : !selectedYear ? (
                  /* Year Selection */
                  <div>
                    <button
                      onClick={handleBackToPost}
                      className="mb-6 flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      <ArrowRight className="w-4 h-4 mr-1 rotate-180" />
                      Back to Post Selection
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleYearSelection('2022')}
                        className="p-6 bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all group"
                      >
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                            <Calendar className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">2022</h4>
                            <p className="text-sm text-gray-600">
                              Latest recruitment papers
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleYearSelection('2018')}
                        className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all group"
                      >
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center">
                            <Calendar className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">2018</h4>
                            <p className="text-sm text-gray-600">
                              Previous recruitment papers
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
