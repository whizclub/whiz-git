import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAdminSession } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total users
    const totalUsers = await prisma.user.count();
    
    // Get active users
    const activeUsers = await prisma.user.count({
      where: { isActive: true },
    });

    // Get total mock tests
    const totalTests = await prisma.mCQTest.count();

    // Get total test attempts
    const totalAttempts = await prisma.testAttempt.count();

    // Get recent users (last 10)
    const recentUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Get recent test attempts (last 10)
    const recentAttempts = await prisma.testAttempt.findMany({
      select: {
        id: true,
        score: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
        test: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Format recent attempts
    const formattedAttempts = recentAttempts.map((attempt) => ({
      id: attempt.id,
      userName: attempt.user.name,
      testTitle: attempt.test.title,
      score: Math.round(attempt.score),
      createdAt: attempt.createdAt,
    }));

    return NextResponse.json({
      totalUsers,
      activeUsers,
      totalTests,
      totalAttempts,
      recentUsers,
      recentAttempts: formattedAttempts,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

