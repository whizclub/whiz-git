'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  ShoppingCart,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Header } from '@/components/layout/header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const role = (session.user as any).role;
      if (role !== 'ADMIN') {
        router.push('/dashboard');
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    try {
      toast.success('Logged out successfully');
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return null;
  }

  const admin = session.user;

  const navItems = [
    { name: 'Analytics', href: '/admin', icon: LayoutDashboard },
    { name: 'Users Data', href: '/admin/users', icon: Users },
    { name: 'AP Constable Tests', href: '/admin/ap-constable', icon: ClipboardList },
    { name: 'AP Sub-Inspector Tests', href: '/admin/ap-subinspector', icon: BookOpen },
  ];

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-50 pt-14 sm:pt-16">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

      {/* Sidebar */}
      <aside
        className={`fixed top-14 sm:top-16 bottom-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:top-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <h1 className="text-xl font-bold text-blue-600">WhizClub Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Admin info */}
          <div className="border-t p-4">
            <div className="mb-3 rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="font-medium text-gray-900">{admin.name}</p>
              <p className="text-xs text-gray-500">{admin.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-gray-800">
              {navItems.find((item) => item.href === pathname)?.name || 'Admin Panel'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {admin.name}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
    </>
  );
}

