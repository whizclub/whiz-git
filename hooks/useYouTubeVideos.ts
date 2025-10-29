'use client';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
}

interface UseYouTubeVideosReturn {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
}

// Hardcoded videos - No API call needed! Saves serverless function calls
const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'vg-IN5kZtTA',
    title: 'AP CONSTABLE EXPECTED CUTOFF (20% OPEN) | ap constable expect...',
    description: 'Essential tips and strategies for AP Police Constable exam preparation. Learn about syllabus, exam pattern, and preparation strategy.',
    thumbnail: 'https://img.youtube.com/vi/vg-IN5kZtTA/maxresdefault.jpg',
    publishedAt: '2024-11-15T10:00:00Z',
    viewCount: '16K',
    duration: '9:36'
  },
  {
    id: 'N0t7SgOMSdQ',
    title: 'CHANGES IN RESERVATION PERCENTAGES | AP SUBINSPECTOR',
    description: 'Complete information about the latest changes in reservation percentages for AP Sub-Inspector recruitment. Important policy updates and guidelines.',
    thumbnail: 'https://i.ytimg.com/vi/N0t7SgOMSdQ/hqdefault.jpg',
    publishedAt: '2024-11-20T12:00:00Z',
    viewCount: '8.5K',
    duration: '15:30'
  },
  {
    id: 'KDnFG42og0E',
    title: 'AP CONSTABLE MAINS PREPARATION',
    description: 'Complete preparation guide for AP Constable Mains exam. Subject-wise weightage and preparation tips for success.',
    thumbnail: 'https://img.youtube.com/vi/KDnFG42og0E/maxresdefault.jpg',
    publishedAt: '2024-05-10T09:15:00Z',
    viewCount: '6.2K',
    duration: '18:20'
  }
];

export function useYouTubeVideos(): UseYouTubeVideosReturn {
  // Return static data immediately - No API call, No serverless function usage!
  return { 
    videos: YOUTUBE_VIDEOS, 
    loading: false, 
    error: null 
  };
}

