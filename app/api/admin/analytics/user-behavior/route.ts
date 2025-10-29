import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-config';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/analytics/user-behavior
 * Get user behavior analytics
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Get users
    const users = userId
      ? await prisma.user.findMany({ where: { id: userId } })
      : await prisma.user.findMany({ take: 100 });

    // In a real implementation, you would calculate these metrics from actual activity data
    // For now, return structured data with mock metrics
    const metrics = users.map(user => ({
      userId: user.id,
      userName: user.name || 'Unknown',
      userEmail: user.email || '',
      totalSessions: Math.floor(Math.random() * 50) + 1,
      totalTimeSpent: Math.floor(Math.random() * 500) + 10, // minutes
      pagesViewed: Math.floor(Math.random() * 200) + 1,
      coursesEnrolled: Math.floor(Math.random() * 10),
      testsCompleted: Math.floor(Math.random() * 20),
      averageScore: Math.floor(Math.random() * 40) + 60,
      lastActive: user.emailVerified || new Date(),
      loginFrequency: Math.floor(Math.random() * 7) + 1,
      preferredContentType: ['courses', 'tests', 'materials'][Math.floor(Math.random() * 3)],
      deviceType: ['mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 3)],
      location: 'Unknown',
    }));

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Error fetching user behavior:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

