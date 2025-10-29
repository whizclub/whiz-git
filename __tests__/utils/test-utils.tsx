import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { NextRouter } from 'next/router';

/**
 * Custom render function with providers
 * Use this instead of render() from @testing-library/react
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

/**
 * Mock Next.js router
 */
export const mockRouter: Partial<NextRouter> = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
};

/**
 * Create mock user for testing
 */
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  role: 'USER',
  image: null,
  ...overrides,
});

/**
 * Create mock session for testing
 */
export const createMockSession = (overrides = {}) => ({
  user: createMockUser(),
  expires: new Date(Date.now() + 86400000).toISOString(),
  ...overrides,
});

/**
 * Wait for async operations
 */
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Mock API response
 */
export const mockApiResponse = <T,>(data: T, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => data,
  text: async () => JSON.stringify(data),
});

