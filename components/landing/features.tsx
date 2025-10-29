'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  BarChart3, 
  MessageCircle,
  BookOpen,
  Clock,
  Users,
  Trophy,
  Zap,
  Shield,
  Smartphone,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Study Plans',
    description: 'Personalized study schedules created by advanced AI algorithms that adapt to your learning pace and exam timeline.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
    features: ['Adaptive Learning Path', 'Smart Scheduling', 'Progress Tracking']
  },
  {
    icon: Target,
    title: 'Intelligent Mock Tests',
    description: 'AI-generated mock tests that adjust difficulty based on your performance and focus on your weak areas.',
    color: 'text-success-600',
    bgColor: 'bg-success-100',
    features: ['Adaptive Difficulty', 'Performance Analysis', 'Weakness Detection']
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Comprehensive performance analytics with detailed insights into your strengths, weaknesses, and improvement areas.',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
    features: ['Performance Insights', 'Progress Visualization', 'Predictive Analytics']
  },
  {
    icon: MessageCircle,
    title: 'AI Doubt Resolution',
    description: '24/7 AI-powered doubt resolution system that provides instant, accurate answers to your questions.',
    color: 'text-warning-600',
    bgColor: 'bg-warning-100',
    features: ['Instant Answers', 'Step-by-Step Solutions', 'Concept Explanations']
  },
  {
    icon: BookOpen,
    title: 'Smart Study Materials',
    description: 'Curated study materials with AI recommendations based on your learning style and exam requirements.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    features: ['Personalized Content', 'Multi-Format Resources', 'Updated Syllabus']
  },
  {
    icon: Clock,
    title: 'Time Management',
    description: 'Advanced time management tools with AI-optimized study schedules and exam time allocation strategies.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    features: ['Smart Scheduling', 'Time Tracking', 'Efficiency Optimization']
  },
  {
    icon: Users,
    title: 'Study Groups',
    description: 'Connect with peers, join study groups, and participate in collaborative learning sessions.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    features: ['Peer Learning', 'Group Discussions', 'Knowledge Sharing']
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Gamified learning experience with badges, achievements, and leaderboards to keep you motivated.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    features: ['Progress Badges', 'Leaderboards', 'Milestone Rewards']
  },
  {
    icon: Zap,
    title: 'Quick Revision',
    description: 'AI-powered quick revision tools with flashcards, summaries, and last-minute preparation strategies.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    features: ['Smart Flashcards', 'Quick Summaries', 'Revision Reminders']
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Enterprise-grade security with encrypted data storage and privacy protection for all students.',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    features: ['End-to-End Encryption', 'Privacy Protection', 'Secure Storage']
  },
  {
    icon: Smartphone,
    title: 'Mobile Learning',
    description: 'Learn anywhere, anytime with our mobile-optimized platform and offline study capabilities.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    features: ['Mobile App', 'Offline Mode', 'Sync Across Devices']
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Study in your preferred language with support for multiple regional languages and exam patterns.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    features: ['Multiple Languages', 'Regional Patterns', 'Localized Content']
  }
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            Revolutionary AI Technology
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            AI-Powered Learning Platform
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We're pioneering the future of education with revolutionary AI technology that no other platform offers. 
            Our advanced algorithms create personalized learning experiences that adapt to your unique learning style.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <div className={`w-2 h-2 rounded-full ${feature.bgColor} mr-3`}></div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Be Part of the AI Revolution
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join learners experiencing revolutionary AI technology in education. 
              Be among the pioneers who will shape the future of learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                Start Free Trial
              </button>
              <button className="btn btn-outline btn-lg">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
