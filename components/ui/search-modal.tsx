'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, BookOpen, Target, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'paper' | 'page' | 'content';
  url: string;
  description?: string;
}

/**
 * Global Search Modal
 * Activated with Ctrl/Cmd + K
 */
export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Search function (mock - replace with actual search logic)
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Mock search results - replace with actual API call
    const allResults: SearchResult[] = [
      {
        id: '1',
        title: 'AP Police Constable Course',
        type: 'course',
        url: '/courses/ap-constable',
        description: 'Complete preparation course for AP Police Constable exam',
      },
      {
        id: '2',
        title: 'Previous Year Papers - 2022',
        type: 'paper',
        url: '/exam-papers',
        description: 'Access previous year question papers',
      },
      // Add more mock results
    ];
    
    const mockResults = allResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
    setIsLoading(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (url: string) => {
    window.location.href = url;
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search courses, papers, or topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-500">
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result) => {
                      const icons = {
                        course: BookOpen,
                        paper: FileText,
                        page: Target,
                        content: Target,
                      };
                      const Icon = icons[result.type];

                      return (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result.url)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {result.title}
                            </div>
                            {result.description && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {result.description}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                ) : query ? (
                  <div className="p-8 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Start typing to search...
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">↑↓</kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd>
                    <span>Select</span>
                  </span>
                </div>
                <span className="text-gray-400">
                  Press ESC to close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

