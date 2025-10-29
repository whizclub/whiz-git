import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { debounce, throttle, paginateArray, memoize, APICache } from '@/lib/performance';

describe('Performance Utilities', () => {
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should limit function calls', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('paginateArray', () => {
    it('should paginate array correctly', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const pages = paginateArray(array, 3);

      expect(pages).toHaveLength(4);
      expect(pages[0]).toEqual([1, 2, 3]);
      expect(pages[1]).toEqual([4, 5, 6]);
      expect(pages[3]).toEqual([10]);
    });

    it('should handle empty array', () => {
      const pages = paginateArray([], 10);
      expect(pages).toHaveLength(0);
    });

    it('should handle array smaller than page size', () => {
      const pages = paginateArray([1, 2], 10);
      expect(pages).toHaveLength(1);
      expect(pages[0]).toEqual([1, 2]);
    });
  });

  describe('memoize', () => {
    it('should cache function results', () => {
      let callCount = 0;
      const expensiveFn = (x: number) => {
        callCount++;
        return x * 2;
      };

      const memoizedFn = memoize(expensiveFn);

      expect(memoizedFn(5)).toBe(10);
      expect(memoizedFn(5)).toBe(10);
      expect(callCount).toBe(1);
    });

    it('should handle different arguments separately', () => {
      const fn = (x: number) => x * 2;
      const memoizedFn = memoize(fn);

      expect(memoizedFn(5)).toBe(10);
      expect(memoizedFn(10)).toBe(20);
      expect(memoizedFn(5)).toBe(10); // From cache
    });
  });

  describe('APICache', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should cache data', () => {
      const cache = new APICache(5000);
      cache.set('key1', 'value1');

      expect(cache.get('key1')).toBe('value1');
    });

    it('should return null for expired cache', () => {
      const cache = new APICache(1000);
      cache.set('key1', 'value1');

      jest.advanceTimersByTime(1001);
      expect(cache.get('key1')).toBeNull();
    });

    it('should return null for non-existent keys', () => {
      const cache = new APICache(5000);
      expect(cache.get('nonexistent')).toBeNull();
    });

    it('should clear cache', () => {
      const cache = new APICache(5000);
      cache.set('key1', 'value1');
      cache.clear();

      expect(cache.get('key1')).toBeNull();
    });
  });
});

