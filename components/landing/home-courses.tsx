'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Award, 
  CheckCircle,
  ArrowRight,
  FileText,
  Bell,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const examDetails = [
  {
    id: 'ap-constable',
    title: 'AP Constable',
    description: 'Access comprehensive resources for Andhra Pradesh Police Constable examination including previous year papers, notifications, and cutoff details.',
    icon: Shield,
    badge: 'Popular',
    color: 'green',
    resources: [
      'Previous year question papers',
      'Official notifications archive',
      'Year-wise cutoff marks',
      'Eligibility criteria',
      'Age limit details',
      'Educational qualifications'
    ]
  },
  {
    id: 'ap-sub-inspector',
    title: 'AP Sub-Inspector',
    description: 'Complete examination resources for Andhra Pradesh Police Sub-Inspector including past papers, notification history, and cutoff trends.',
    icon: Award,
    badge: 'Premium',
    color: 'blue',
    resources: [
      'Previous year question papers',
      'Notification archives',
      'Historical cutoff data',
      'Eligibility criteria',
      'Age limit details',
      'Educational qualifications'
    ]
  }
];

export function HomeCoursesSection() {
  const router = useRouter();
  const [badgeErrors, setBadgeErrors] = useState<Record<number, boolean>>({});

  const handleNotificationsClick = () => {
    alert('Coming Soon!');
  };

  const handlePreviousPapersClick = (examId: string) => {
    router.push(`/courses/${examId}?openPapers=true`);
  };

  const handleCutoffClick = (examId: string) => {
    router.push(`/courses/${examId}?openCutoff=true`);
  };

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Exam Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {examDetails.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${
                exam.color === 'green' 
                  ? 'from-green-600 to-green-500' 
                  : 'from-blue-600 to-blue-500'
              } p-6 text-white h-[220px] sm:h-[240px] flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {!badgeErrors[index] ? (
                        <Image 
                          src="/police-badge.png" 
                          alt="AP Police Badge" 
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain"
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                            backgroundColor: 'transparent'
                          }}
                          priority
                          onError={() => setBadgeErrors(prev => ({ ...prev, [index]: true }))}
                          onLoadingComplete={() => setBadgeErrors(prev => ({ ...prev, [index]: false }))}
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full">
                          <Shield className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold leading-tight">{exam.title}</h3>
                      <p className="text-white/90 text-sm mt-0.5">AP Police Examination</p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs flex-shrink-0 ml-2">
                    {exam.badge}
                  </Badge>
                </div>
                <p className="text-white/90 text-base leading-relaxed flex-1">{exam.description}</p>
              </div>

              {/* Card Details */}
              <div className="p-6">
                {/* Resource Icons */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => handlePreviousPapersClick(exam.id)}
                    className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all cursor-pointer transform hover:scale-105 h-[88px] flex flex-col items-center justify-center"
                  >
                    <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-700 leading-tight">Previous Papers</p>
                  </button>
                  <button
                    onClick={handleNotificationsClick}
                    className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all cursor-pointer transform hover:scale-105 h-[88px] flex flex-col items-center justify-center"
                  >
                    <Bell className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-700 leading-tight">Notifications</p>
                  </button>
                  <button
                    onClick={() => handleCutoffClick(exam.id)}
                    className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all cursor-pointer transform hover:scale-105 h-[88px] flex flex-col items-center justify-center"
                  >
                    <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-700 leading-tight">Cutoff Marks</p>
                  </button>
                </div>

                {/* Available Resources */}
                <div className="mb-6 min-h-[168px]">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    Available Resources:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {exam.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 leading-tight">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/courses/${exam.id}`} className="w-full block">
                  <Button 
                    className={`w-full h-12 ${
                      exam.color === 'green'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white group text-base font-semibold`}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

