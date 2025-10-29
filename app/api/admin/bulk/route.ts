import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-config';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/bulk
 * Generic bulk operations endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resourceType, ids, operation } = body;

    if (!resourceType || !ids || !Array.isArray(ids) || !operation) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    if (ids.length === 0) {
      return NextResponse.json(
        { error: 'No items selected' },
        { status: 400 }
      );
    }

    if (ids.length > 1000) {
      return NextResponse.json(
        { error: 'Maximum 1000 items can be processed at once' },
        { status: 400 }
      );
    }

    let result;
    const errors: string[] = [];
    let successCount = 0;
    let failCount = 0;

    try {
      switch (resourceType) {
        case 'users':
          result = await handleUserBulkOperation(ids, operation);
          break;
        case 'courses':
          result = await handleCourseBulkOperation(ids, operation);
          break;
        case 'exam-papers':
          result = await handleExamPaperBulkOperation(ids, operation);
          break;
        default:
          return NextResponse.json(
            { error: `Unsupported resource type: ${resourceType}` },
            { status: 400 }
          );
      }

      successCount = result.success || 0;
      failCount = result.failed || 0;
      errors.push(...(result.errors || []));
    } catch (error) {
      console.error('Bulk operation error:', error);
      return NextResponse.json(
        { error: 'Bulk operation failed', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: successCount,
      failed: failCount,
      errors,
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleUserBulkOperation(ids: string[], operation: string) {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  for (const id of ids) {
    try {
      switch (operation) {
        case 'delete':
          await prisma.user.delete({ where: { id } });
          success++;
          break;
        case 'activate':
          await prisma.user.update({ where: { id }, data: { isActive: true } });
          success++;
          break;
        case 'deactivate':
          await prisma.user.update({ where: { id }, data: { isActive: false } });
          success++;
          break;
        default:
          errors.push(`Unknown operation: ${operation}`);
          failed++;
      }
    } catch (error) {
      failed++;
      errors.push(`Failed to ${operation} user ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return { success, failed, errors };
}

async function handleCourseBulkOperation(ids: string[], operation: string) {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  for (const id of ids) {
    try {
      switch (operation) {
        case 'delete':
          await prisma.course.delete({ where: { id } });
          success++;
          break;
        case 'activate':
          await prisma.course.update({ where: { id }, data: { isActive: true } });
          success++;
          break;
        case 'deactivate':
          await prisma.course.update({ where: { id }, data: { isActive: false } });
          success++;
          break;
        default:
          errors.push(`Unknown operation: ${operation}`);
          failed++;
      }
    } catch (error) {
      failed++;
      errors.push(`Failed to ${operation} course ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return { success, failed, errors };
}

async function handleExamPaperBulkOperation(ids: string[], operation: string) {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  for (const id of ids) {
    try {
      switch (operation) {
        case 'delete':
          await prisma.previousYearPaper.delete({ where: { id } });
          success++;
          break;
        case 'activate':
          await prisma.previousYearPaper.update({ where: { id }, data: { isActive: true } });
          success++;
          break;
        case 'deactivate':
          await prisma.previousYearPaper.update({ where: { id }, data: { isActive: false } });
          success++;
          break;
        default:
          errors.push(`Unknown operation: ${operation}`);
          failed++;
      }
    } catch (error) {
      failed++;
      errors.push(`Failed to ${operation} exam paper ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return { success, failed, errors };
}

