'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { Play, Youtube } from 'lucide-react';

export function YouTubeSection() {
  const { videos, loading, error } = useYouTubeVideos();

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Latest from Our Channel
          </h3>
          <p className="text-gray-600 text-lg">
            Watch our recent videos for exam tips and preparation strategies
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Unable to load videos at the moment</p>
            <p className="text-gray-500">Please try again later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {videos.map((video, index) => (
              <motion.a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 block"
              >
                <div className="relative bg-black">
                  <Image
                    src={video.thumbnail} 
                    alt={video.title}
                    width={480}
                    height={360}
                    className="w-full h-48 object-cover opacity-100"
                    onError={(e) => {
                      const videoId = video.id;
                      const currentSrc = e.currentTarget.src;
                      
                      if (currentSrc.includes('maxresdefault')) {
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      } else if (currentSrc.includes('hqdefault')) {
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                      } else if (currentSrc.includes('mqdefault')) {
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                      } else {
                        e.currentTarget.src = 'https://via.placeholder.com/480x360/cccccc/666666?text=Video+Thumbnail';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 flex items-center justify-center transition-all duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatTimeAgo(video.publishedAt)}</span>
                    <span>{video.viewCount} views</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <motion.a
            href="https://www.youtube.com/@WHIZCLUB07"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Youtube className="w-5 h-5 mr-2" />
            View All Videos
          </motion.a>
        </div>
      </div>
    </section>
  );
}

