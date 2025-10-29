'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, AlertTriangle, Clock, Target } from 'lucide-react';
import {
  getUserBehaviorMetrics,
  analyzeBehaviorPatterns,
  calculateEngagementScore,
  identifyAtRiskUsers,
} from '@/lib/admin/user-analytics';
import type { UserBehaviorMetric, BehaviorInsight } from '@/lib/admin/user-analytics';

/**
 * User Behavior Analytics Dashboard
 * Displays user behavior insights and metrics
 */
export function UserAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<UserBehaviorMetric[]>([]);
  const [insights, setInsights] = useState<BehaviorInsight[]>([]);
  const [atRiskUsers, setAtRiskUsers] = useState<UserBehaviorMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const userMetrics = await getUserBehaviorMetrics();
      setMetrics(userMetrics);
      
      const behaviorInsights = analyzeBehaviorPatterns(userMetrics);
      setInsights(behaviorInsights);

      const atRisk = identifyAtRiskUsers(userMetrics);
      setAtRiskUsers(atRisk);
    } catch (error) {
      console.error('Error loading user analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading user analytics...</p>
      </div>
    );
  }

  const avgEngagement = metrics.length > 0
    ? metrics.reduce((sum, m) => sum + calculateEngagementScore(m), 0) / metrics.length
    : 0;

  const insightIcons = {
    engagement: Users,
    performance: Award,
    activity: TrendingUp,
    trend: Target,
  };

  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-blue-200 bg-blue-50',
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{metrics.length}</span>
          </div>
          <p className="text-sm text-gray-600">Total Users Analyzed</p>
        </div>

        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{Math.round(avgEngagement)}</span>
          </div>
          <p className="text-sm text-gray-600">Average Engagement Score</p>
        </div>

        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">{atRiskUsers.length}</span>
          </div>
          <p className="text-sm text-gray-600">At-Risk Users</p>
        </div>
      </div>

      {/* Behavior Insights */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Behavior Insights
        </h3>

        {insights.length === 0 ? (
          <p className="text-gray-500">No insights available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, idx) => {
              const Icon = insightIcons[insight.type] || TrendingUp;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${priorityColors[insight.priority]}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <h4 className="font-semibold">{insight.title}</h4>
                    </div>
                    <span className="text-2xl font-bold">{insight.value}</span>
                  </div>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* At-Risk Users */}
      {atRiskUsers.length > 0 && (
        <div className="bg-white rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            At-Risk Users ({atRiskUsers.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Sessions</th>
                  <th className="text-left p-2">Time Spent</th>
                  <th className="text-left p-2">Last Active</th>
                  <th className="text-left p-2">Engagement Score</th>
                </tr>
              </thead>
              <tbody>
                {atRiskUsers.map((user) => (
                  <tr key={user.userId} className="border-b hover:bg-gray-50">
                    <td className="p-2">{user.userName}</td>
                    <td className="p-2 text-sm text-gray-600">{user.userEmail}</td>
                    <td className="p-2">{user.totalSessions}</td>
                    <td className="p-2">{user.totalTimeSpent} min</td>
                    <td className="p-2 text-sm">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <span className="text-red-600 font-semibold">
                        {calculateEngagementScore(user)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Users */}
      {metrics.length > 0 && (
        <div className="bg-white rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Top Engaging Users
          </h3>

          <div className="space-y-2">
            {metrics
              .sort((a, b) => calculateEngagementScore(b) - calculateEngagementScore(a))
              .slice(0, 10)
              .map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.userName}</p>
                    <p className="text-sm text-gray-600">{user.userEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {calculateEngagementScore(user)} / 100
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.totalSessions} sessions
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}


