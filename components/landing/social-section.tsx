'use client';

import { motion } from 'framer-motion';
import { Youtube, Instagram, Send } from 'lucide-react';

export function SocialSection() {
  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Stay Connected & Get Updates
          </h3>
          <p className="text-gray-600 text-lg">
            Follow us for exam tips, updates, and exclusive content
          </p>
        </motion.div>
        
        <div className="flex flex-nowrap justify-center items-center gap-2 sm:gap-4 lg:gap-8">
          {/* YouTube */}
          <motion.a
            href="https://www.youtube.com/@WHIZCLUB07"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center space-y-1 sm:space-y-2 lg:space-y-3 p-2 sm:p-3 lg:p-6 bg-red-50 hover:bg-red-100 rounded-full border-2 border-red-200 hover:border-red-300 transition-all duration-300 cursor-pointer w-20 h-20 sm:w-32 sm:h-32 lg:w-52 lg:h-52"
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors flex-shrink-0">
              <Youtube className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" strokeWidth={2} />
            </div>
            <div className="text-center hidden sm:block">
              <div className="font-bold text-gray-800 text-lg">Subscribe</div>
              <div className="text-red-600 text-sm font-medium">YouTube Channel</div>
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/whiz_club/profilecard/?igsh=Nnh0MGo0dTVkaXNk"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center space-y-1 sm:space-y-2 lg:space-y-3 p-2 sm:p-3 lg:p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-full border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 cursor-pointer w-20 h-20 sm:w-32 sm:h-32 lg:w-52 lg:h-52"
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-all flex-shrink-0">
              <Instagram className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" strokeWidth={2} />
            </div>
            <div className="text-center hidden sm:block">
              <div className="font-bold text-gray-800 text-lg">Follow</div>
              <div className="text-purple-600 text-sm font-medium">Instagram Page</div>
            </div>
          </motion.a>

          {/* Telegram */}
          <motion.a
            href="https://t.me/whizclub_for_AP_POLICE"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center space-y-1 sm:space-y-2 lg:space-y-3 p-2 sm:p-3 lg:p-6 bg-blue-50 hover:bg-blue-100 rounded-full border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 cursor-pointer w-20 h-20 sm:w-32 sm:h-32 lg:w-52 lg:h-52"
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
              <Send className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" strokeWidth={2} />
            </div>
            <div className="text-center hidden sm:block">
              <div className="font-bold text-gray-800 text-lg">Join</div>
              <div className="text-blue-600 text-sm font-medium">Telegram Group</div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

