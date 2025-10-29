'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and displays a fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // TODO: Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback UI
 */
function ErrorFallback({ error, onReset }: { error: Error | null; onReset: () => void }) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          {/* Error Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>

          {/* Error Message */}
          <p className="text-lg text-gray-600 mb-2">
            We encountered an unexpected error while loading this page.
          </p>

          {error && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 font-mono">
                {error.message || 'Unknown error occurred'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={onReset}
              className="flex items-center gap-2 px-6 py-3"
              variant="default"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-8">
            If this problem persists, please{' '}
            <a href="/" className="text-green-600 hover:underline">
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Custom Error Message Component
 * Use for specific error scenarios
 */
export function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
  showIcon = true,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
  showIcon?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl border-2 border-red-200">
      {showIcon && (
        <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-center">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="default">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

