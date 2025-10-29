'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, BookOpen, ClipboardCheck, TrendingUp, Activity, Eye } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalTests: number;
  totalAttempts: number;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
  recentAttempts: Array<{
    id: string;
    userName: string;
    testTitle: string;
    score: number;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadAnalytics();
  }, []);

  const checkAuthAndLoadAnalytics = async () => {
    try {
      const authRes = await fetch('/api/admin/session');
      if (!authRes.ok) {
        router.push('/login');
        return;
      }

      const statsRes = await fetch('/api/admin/analytics');
      if (statsRes.ok) {
        const data = await statsRes.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Website Analytics</h1>
        <p className="text-gray-600">Overview of your platform's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {analytics?.totalUsers || 0}
          </p>
          <p className="text-sm text-gray-600">Registered Users</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {analytics?.activeUsers || 0}
          </p>
          <p className="text-sm text-gray-600">Active Users</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              Tests
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {analytics?.totalTests || 0}
          </p>
          <p className="text-sm text-gray-600">Mock Tests Created</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              Attempts
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {analytics?.totalAttempts || 0}
          </p>
          <p className="text-sm text-gray-600">Test Attempts</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">👥 Recent Users</h2>
            <button
              onClick={() => router.push('/admin/users')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {analytics?.recentUsers && analytics.recentUsers.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentUsers.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No users yet</p>
          )}
        </div>

        {/* Recent Test Attempts */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">📝 Recent Test Attempts</h2>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>

          {analytics?.recentAttempts && analytics.recentAttempts.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentAttempts.slice(0, 5).map((attempt) => (
                <div
                  key={attempt.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{attempt.userName}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      attempt.score >= 70
                        ? 'bg-green-100 text-green-700'
                        : attempt.score >= 50
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {attempt.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{attempt.testTitle}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(attempt.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No test attempts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
