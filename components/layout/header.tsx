'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  ArrowLeft, 
  Brain, 
  Menu, 
  X, 
  LogIn, 
  Home, 
  BookOpen, 
  FileText, 
  Bell,
  LayoutDashboard,
  FolderLock,
  Calendar,
  LogOut,
  User,
  Award
} from 'lucide-react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, status, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  // Don't show back button on home page
  const showBackButton = pathname !== '/';
  
  // Don't show hamburger menu on admin pages (admin has its own sidebar)
  const isAdminPage = pathname.startsWith('/admin');

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
  };

  const userNavigationLinks = [
    { name: 'Vault', href: '/dashboard/certificates', icon: FolderLock },
    { name: 'Study Plan', href: '/dashboard/study-plan', icon: Calendar },
    { name: 'Profile', href: '/dashboard', icon: User },
  ];

  const publicNavigationLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Previous Papers', href: '/exam-papers', icon: FileText },
  ];

  return (
    <>
      <header 
        role="banner"
        aria-label="Site header"
        className="bg-green-200/40 backdrop-blur-md shadow-sm border-b border-green-300/50 sticky top-0 z-50 relative"
      >
        <nav 
          id="main-navigation"
          role="navigation"
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative"
        >
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Back Button */}
              {showBackButton && (
                <button
                  onClick={() => router.back()}
                  className="p-1.5 sm:p-2 text-green-800 hover:text-green-950 hover:bg-white/50 rounded-lg transition-colors border border-green-300/50 hover:border-green-400"
                  aria-label="Go back"
                  title="Go back"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
                </button>
              )}
              
              {/* Logo */}
              <Link 
                href="/" 
                className="flex items-center space-x-2 sm:space-x-3"
                aria-label="WhizClub home page"
              >
                {!logoError ? (
                  <Image 
                    src="/whizclub-logo.jpg" 
                    alt="WhizClub Logo" 
                    width={48}
                    height={48}
                    className="w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full shadow-lg"
                    priority
                    onError={() => setLogoError(true)}
                    onLoadingComplete={() => setLogoError(false)}
                  />
                ) : (
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                    W
                  </div>
                )}
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800">WhizClub</span>
              </Link>
            </div>

            {/* Menu / Login Button - Show immediately based on session */}
            {session ? (
              // Only show hamburger menu if not on admin pages
              !isAdminPage && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-green-800 hover:text-green-950 hover:bg-white/50 rounded-lg transition-colors border border-green-300/50 hover:border-green-400"
                  aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="user-menu"
                  aria-haspopup="true"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              )
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-green-800 hover:text-green-950 font-semibold transition-all hover:bg-white/30 rounded-full"
                aria-label="Sign in to your account"
                title="Login"
              >
                <LogIn className="w-5 h-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Dropdown Menu (Only when logged in and not on admin pages) - Inside Header */}
        {session && isMenuOpen && !isAdminPage && (
          <div className="absolute top-full left-0 right-0 z-[60]">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex justify-end">
              <div 
                id="user-menu"
                role="menu"
                aria-label="User menu"
                className="w-56 bg-white/90 backdrop-blur-xl shadow-xl border border-white/40 rounded-xl overflow-hidden animate-slideDown mt-1"
              >
            
            {/* Navigation Links - Clean and Simple */}
            <nav className="py-2" role="navigation" aria-label="User navigation">
              {session.role === 'ADMIN' ? (
                <div>
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-all"
                    role="menuitem"
                    aria-label="Access admin dashboard"
                  >
                    <LayoutDashboard className="w-5 h-5" strokeWidth={2} />
                    <span className="text-sm font-medium">Admin Dashboard</span>
                  </Link>
                  
                  <div className="my-1 border-t border-gray-200/60"></div>
                  
                  {publicNavigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all"
                      role="menuitem"
                      aria-label={`Navigate to ${link.name}`}
                    >
                      <link.icon className="w-5 h-5" strokeWidth={2} />
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div>
                  {userNavigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-all"
                      role="menuitem"
                      aria-label={`Navigate to ${link.name}`}
                    >
                      <link.icon className="w-5 h-5" strokeWidth={2} />
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            {/* Logout Button - Simple */}
            <div className="border-t border-gray-200/60">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                role="menuitem"
                aria-label="Sign out of your account"
              >
                <LogOut className="w-5 h-5" strokeWidth={2} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for menu */}
      {session && isMenuOpen && !isAdminPage && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
