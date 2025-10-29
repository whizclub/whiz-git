/**
 * User Behavior Analytics Utilities
 * Track and analyze user behavior patterns
 */

export interface UserBehaviorMetric {
  userId: string;
  userName: string;
  userEmail: string;
  totalSessions: number;
  totalTimeSpent: number; // in minutes
  pagesViewed: number;
  coursesEnrolled: number;
  testsCompleted: number;
  averageScore: number;
  lastActive: Date;
  loginFrequency: number; // logins per week
  preferredContentType: string;
  deviceType: string;
  location: string;
}

export interface BehaviorInsight {
  type: 'engagement' | 'performance' | 'activity' | 'trend';
  title: string;
  description: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  priority: 'high' | 'medium' | 'low';
}

/**
 * Get user behavior metrics
 */
export async function getUserBehaviorMetrics(userId?: string): Promise<UserBehaviorMetric[]> {
  try {
    const url = userId 
      ? `/api/admin/analytics/user-behavior?userId=${userId}`
      : '/api/admin/analytics/user-behavior';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user behavior metrics');
    }

    const data = await response.json();
    return data.metrics || [];
  } catch (error) {
    console.error('Error fetching user behavior metrics:', error);
    return [];
  }
}

/**
 * Analyze user behavior patterns
 */
export function analyzeBehaviorPatterns(metrics: UserBehaviorMetric[]): BehaviorInsight[] {
  const insights: BehaviorInsight[] = [];

  if (metrics.length === 0) {
    return insights;
  }

  // Calculate averages
  const avgTimeSpent = metrics.reduce((sum, m) => sum + m.totalTimeSpent, 0) / metrics.length;
  const avgTestsCompleted = metrics.reduce((sum, m) => sum + m.testsCompleted, 0) / metrics.length;
  const avgScore = metrics.reduce((sum, m) => sum + m.averageScore, 0) / metrics.length;

  // High engagement users
  const highEngagement = metrics.filter(m => m.totalTimeSpent > avgTimeSpent * 1.5);
  if (highEngagement.length > 0) {
    insights.push({
      type: 'engagement',
      title: 'High Engagement Users',
      description: `${highEngagement.length} users show above-average engagement`,
      value: highEngagement.length,
      trend: 'up',
      priority: 'high',
    });
  }

  // Low engagement users
  const lowEngagement = metrics.filter(m => m.totalTimeSpent < avgTimeSpent * 0.5);
  if (lowEngagement.length > 0) {
    insights.push({
      type: 'engagement',
      title: 'Low Engagement Users',
      description: `${lowEngagement.length} users may need re-engagement`,
      value: lowEngagement.length,
      trend: 'down',
      priority: 'high',
    });
  }

  // Top performers
  const topPerformers = metrics.filter(m => m.averageScore > avgScore + 10);
  if (topPerformers.length > 0) {
    insights.push({
      type: 'performance',
      title: 'Top Performers',
      description: `${topPerformers.length} users scoring above average`,
      value: topPerformers.length,
      trend: 'up',
      priority: 'medium',
    });
  }

  // Most active users
  const mostActive = metrics.sort((a, b) => b.totalSessions - a.totalSessions).slice(0, 5);
  if (mostActive.length > 0) {
    insights.push({
      type: 'activity',
      title: 'Most Active Users',
      description: `${mostActive[0].userName} is the most active with ${mostActive[0].totalSessions} sessions`,
      value: mostActive[0].totalSessions,
      trend: 'up',
      priority: 'medium',
    });
  }

  // Content preference
  const contentPrefs: Record<string, number> = {};
  metrics.forEach(m => {
    if (m.preferredContentType) {
      contentPrefs[m.preferredContentType] = (contentPrefs[m.preferredContentType] || 0) + 1;
    }
  });
  const topContentType = Object.entries(contentPrefs).sort((a, b) => b[1] - a[1])[0];
  if (topContentType) {
    insights.push({
      type: 'trend',
      title: 'Popular Content Type',
      description: `Most users prefer ${topContentType[0]}`,
      value: topContentType[1],
      trend: 'stable',
      priority: 'low',
    });
  }

  return insights;
}

/**
 * Get user engagement score
 */
export function calculateEngagementScore(metric: UserBehaviorMetric): number {
  let score = 0;

  // Session frequency (0-25 points)
  score += Math.min(metric.totalSessions * 2, 25);

  // Time spent (0-25 points)
  score += Math.min(metric.totalTimeSpent / 10, 25);

  // Content engagement (0-25 points)
  score += Math.min(metric.coursesEnrolled * 5 + metric.testsCompleted * 2, 25);

  // Login frequency (0-25 points)
  score += Math.min(metric.loginFrequency * 5, 25);

  return Math.round(Math.min(score, 100));
}

/**
 * Identify at-risk users
 */
export function identifyAtRiskUsers(metrics: UserBehaviorMetric[]): UserBehaviorMetric[] {
  const avgTimeSpent = metrics.reduce((sum, m) => sum + m.totalTimeSpent, 0) / metrics.length;
  const avgLoginFreq = metrics.reduce((sum, m) => sum + m.loginFrequency, 0) / metrics.length;

  return metrics.filter(m => {
    const daysSinceActive = (Date.now() - new Date(m.lastActive).getTime()) / (1000 * 60 * 60 * 24);
    
    return (
      (daysSinceActive > 30 && m.loginFrequency < avgLoginFreq * 0.5) ||
      (m.totalTimeSpent < avgTimeSpent * 0.3 && daysSinceActive > 14) ||
      (m.totalSessions < 3 && daysSinceActive > 7)
    );
  });
}


