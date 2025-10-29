'use client';

import { motion } from 'framer-motion';
import { Share2, Facebook, Twitter, Linkedin, Link2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function ShareWebsite() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const websiteUrl = 'https://whizclub.com';
  const shareTitle = 'WhizClub - AP Police Exam Preparation Platform';
  const shareDescription = 'Master AP Police Constable & Sub-Inspector exams with comprehensive study materials, previous year papers, and expert guidance!';

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(websiteUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedDescription = encodeURIComponent(shareDescription);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(websiteUrl);
          toast.success('Link copied to clipboard!');
          setShowShareOptions(false);
          return;
        } catch (err) {
          toast.error('Failed to copy link');
          return;
        }
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareDescription,
              url: websiteUrl,
            });
            toast.success('Thanks for sharing!');
            setShowShareOptions(false);
            return;
          } catch (err) {
            // User cancelled share
            return;
          }
        }
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareOptions(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Help Your Friends Succeed! 🎯
          </h3>
          
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Share WhizClub with your friends and help them ace their AP Police exams. 
            Together, we can build a community of successful candidates!
          </p>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
            >
              <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Share WhizClub
            </button>

            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-3 p-6 bg-white rounded-2xl shadow-xl border border-gray-100"
              >
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </button>
                
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  <Link2 className="w-5 h-5" />
                  Copy Link
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

