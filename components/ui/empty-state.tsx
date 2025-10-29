import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Empty State Component
 * Displays a helpful message when there's no content to show
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 ${className}`}>
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        {description}
      </p>
      
      {action && (
        <Button onClick={action.onClick} variant="default">
          {action.label}
        </Button>
      )}
    </div>
  );
}

/**
 * Predefined Empty States
 */
export function EmptyCourses() {
  return (
    <EmptyState
      icon={require('lucide-react').BookOpen}
      title="No courses available"
      description="We're working on adding more courses. Check back soon!"
    />
  );
}

export function EmptyExams() {
  return (
    <EmptyState
      icon={require('lucide-react').FileText}
      title="No exam papers found"
      description="No exam papers are available at the moment. Please try again later."
    />
  );
}

export function EmptyResults() {
  return (
    <EmptyState
      icon={require('lucide-react').BarChart3}
      title="No results yet"
      description="You haven't taken any tests yet. Start your first test to see your results here."
      action={{
        label: 'Browse Tests',
        onClick: () => window.location.href = '/dashboard/tests',
      }}
    />
  );
}

export function EmptyNotifications() {
  return (
    <EmptyState
      icon={require('lucide-react').Bell}
      title="No notifications"
      description="You're all caught up! We'll notify you when there's something new."
    />
  );
}

export function EmptySearch() {
  return (
    <EmptyState
      icon={require('lucide-react').Search}
      title="No results found"
      description="Try adjusting your search terms or filters to find what you're looking for."
    />
  );
}

