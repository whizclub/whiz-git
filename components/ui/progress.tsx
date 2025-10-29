'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'purple' | 'red' | 'orange';
  className?: string;
}

/**
 * Progress Bar Component
 * Displays progress for multi-step processes, loading states, etc.
 */
export function Progress({
  value,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  color = 'green',
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600',
    orange: 'bg-orange-600',
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {showValue && (
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('rounded-full', colorClasses[color])}
        />
      </div>
      {!label && showValue && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

// Add motion import at top
import { motion } from 'framer-motion';

/**
 * Circular Progress Component
 * For loading spinners, score displays, etc.
 */
export function CircularProgress({
  value,
  size = 100,
  strokeWidth = 8,
  className,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-green-600 transition-all duration-500"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute text-sm font-semibold text-gray-900 dark:text-white">
        {Math.round(normalizedValue)}%
      </div>
    </div>
  );
}

/**
 * Multi-Step Progress Indicator
 * Shows progress through multiple steps
 */
export function MultiStepProgress({
  steps,
  currentStep,
  className,
}: {
  steps: string[];
  currentStep: number;
  className?: string;
}) {
  const currentIndex = Math.min(Math.max(currentStep - 1, 0), steps.length - 1);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                  index <= currentIndex
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {index + 1}
              </div>
              <p
                className={cn(
                  'text-xs mt-2 text-center',
                  index <= currentIndex
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500'
                )}
              >
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 mx-2 -mt-4',
                  index < currentIndex ? 'bg-green-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

