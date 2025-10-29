import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/WhizClub/);
    
    // Check main heading
    await expect(page.locator('h1, h2')).toContainText(/AP Police/i);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for login button
    const loginLink = page.getByRole('link', { name: /login/i });
    await expect(loginLink).toBeVisible();
    
    // Click login
    await loginLink.click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab through page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should skip to main content with S key', async ({ page }) => {
    await page.goto('/');
    
    // Press S key
    await page.keyboard.press('s');
    
    // Check if main content is focused
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for ARIA landmarks
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('nav[role="navigation"]')).toBeVisible();
    await expect(page.locator('main[role="main"]')).toBeVisible();
  });
});

