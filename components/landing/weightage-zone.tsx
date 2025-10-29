'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  BookOpen, 
  Award,
  Sparkles,
  ArrowRight,
  Zap,
  Brain,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Quick stats data
const quickStats = [
  {
    icon: BookOpen,
    label: 'Subjects Analyzed',
    value: '10',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    icon: Target,
    label: 'Years Covered',
    value: '2016-2025',
    color: 'from-purple-600 to-pink-600'
  },
  {
    icon: BarChart3,
    label: 'Question Papers',
    value: '7',
    color: 'from-orange-600 to-red-600'
  },
  {
    icon: TrendingUp,
    label: 'Questions Analyzed',
    value: '1400+',
    color: 'from-green-600 to-emerald-600'
  }
];

// High weightage subjects preview - Based on actual AP Constable exam pattern
const highWeightageSubjects = [
  { name: 'English', questions: '30', color: 'bg-blue-500', percentage: 15 },
  { name: 'Arithmetic', questions: '24-25', color: 'bg-red-500', percentage: 12.5 },
  { name: 'Reasoning', questions: '20-26', color: 'bg-purple-500', percentage: 12 },
  { name: 'History', questions: '20-24', color: 'bg-orange-500', percentage: 11 },
  { name: 'Polity', questions: '13-15', color: 'bg-pink-500', percentage: 7.5 },
  { name: 'General Science', questions: '29-32', color: 'bg-green-500', percentage: 15 }
];

export function WeightageZone() {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center mb-3">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 text-xs px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1.5" />
              NEW
            </Badge>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-3">
            <TrendingUp className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Weightage Zone
            </h2>
          </div>
          
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Data-driven insights from 2016-2025
          </p>
        </motion.div>

        {/* Main Content Grid - Compact */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column - Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Complete Analysis</h3>
                  <p className="text-xs text-gray-600">2016-2025 Exam Patterns</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {quickStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200"
                    >
                      <div className={`inline-flex w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg items-center justify-center mb-2`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Features List - Compact */}
              <div className="space-y-2">
                {[
                  '10 Subjects Coverage',
                  '1400+ Questions Analyzed',
                  'Prelims vs Mains',
                  '2016-2025 Analysis'
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - High Weightage Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">High Weightage Topics</h3>
                  <p className="text-xs text-gray-600">Focus on These First</p>
                </div>
              </div>

              <div className="space-y-3">
                {highWeightageSubjects.map((subject, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${subject.color}`} />
                        <span className="font-semibold text-sm text-gray-900">{subject.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700 px-2 py-1 bg-gray-100 rounded-md border border-gray-300">
                          {subject.questions}
                        </span>
                        <span className="text-xs font-bold text-purple-600">
                          {subject.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${subject.percentage * 5}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                        className={`h-full ${subject.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro Tip - Compact */}
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 mb-0.5">Pro Tip</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Focus on English (30), Arithmetic (24-25), & Reasoning (20-26) first - 74-81+ questions combined!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/exam-papers/ap-constable-blueprint">
            <Button 
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:scale-105 transition-transform shadow-lg px-6 py-2.5 text-base group"
            >
              <Brain className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              View Complete Blueprint
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="mt-2 text-xs text-gray-600">
            ⚡ Compare 2016-2025 • Prelims vs Mains • View Actual Questions
          </p>
        </motion.div>

        {/* Bottom Stats Bar - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl p-4 shadow-lg"
        >
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            <div>
              <div className="text-2xl font-bold mb-0.5">1400+</div>
              <div className="text-xs text-purple-100">Questions Analyzed</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-0.5">100%</div>
              <div className="text-xs text-purple-100">Accuracy Verified</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-0.5">Free</div>
              <div className="text-xs text-purple-100">Always Free Access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
