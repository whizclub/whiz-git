'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Plus, Send, X, Users, BookOpen, User as UserIcon, CheckCircle2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  targetType: string;
  targetId?: string;
  category?: string;
  priority: string;
  isActive: boolean;
  createdAt: string;
  userNotifications?: { isRead: boolean }[];
}

interface Course {
  id: string;
  title: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetType: 'ALL',
    targetId: '',
    category: 'Announcement',
    priority: 'NORMAL',
  });

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const authRes = await fetch('/api/admin/session');
      if (!authRes.ok) {
        router.push('/login');
        return;
      }

      // Load notifications
      const notifRes = await fetch('/api/admin/notifications');
      if (notifRes.ok) {
        const data = await notifRes.json();
        setNotifications(data.notifications);
      }

      // Load courses for targeting
      const coursesRes = await fetch('/api/admin/courses');
      if (coursesRes.ok) {
        const data = await coursesRes.json();
        setCourses(data.courses);
      }

      // Load users for targeting
      const usersRes = await fetch('/api/admin/users');
      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`Notification sent to ${data.recipientCount} user(s)!`);
        setShowModal(false);
        setFormData({
          title: '',
          message: '',
          targetType: 'ALL',
          targetId: '',
          category: 'Announcement',
          priority: 'NORMAL',
        });
        checkAuthAndLoadData();
      } else {
        toast.error('Failed to send notification');
      }
    } catch (error) {
      toast.error('Error sending notification');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'NORMAL':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'LOW':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTargetIcon = (targetType: string) => {
    switch (targetType) {
      case 'ALL':
        return <Users className="w-4 h-4" />;
      case 'COURSE':
        return <BookOpen className="w-4 h-4" />;
      case 'USER':
        return <UserIcon className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📢 Notifications
            </h1>
            <p className="text-gray-600">Send messages to your students</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
            Send Notification
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Sent</p>
                <p className="text-3xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-400 rounded-xl flex items-center justify-center">
                <Send className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Courses</p>
                <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-400 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No notifications sent yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start engaging with your students by sending your first notification
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all"
              >
                <Send className="w-5 h-5" />
                Send First Notification
              </button>
            </div>
          ) : (
            notifications.map((notification) => {
              const readCount = notification.userNotifications?.filter(n => n.isRead).length || 0;
              const totalCount = notification.userNotifications?.length || 0;

              return (
                <div
                  key={notification.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {getTargetIcon(notification.targetType)}
                          {notification.targetType}
                        </span>
                        <span className="text-xs text-gray-500">
                          {notification.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{notification.message}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {new Date(notification.createdAt).toLocaleString()}
                        </div>
                        {totalCount > 0 && (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            {readCount} / {totalCount} read
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Send Notification Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Send Notification
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSendNotification} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Notification Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="e.g., New Course Available!"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Enter your notification message..."
                  />
                </div>

                {/* Target Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Send To *
                  </label>
                  <select
                    value={formData.targetType}
                    onChange={(e) =>
                      setFormData({ ...formData, targetType: e.target.value, targetId: '' })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="ALL">All Students</option>
                    <option value="COURSE">Students of Specific Course</option>
                    <option value="USER">Specific Student</option>
                  </select>
                </div>

                {/* Conditional Target Selection */}
                {formData.targetType === 'COURSE' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Select Course *
                    </label>
                    <select
                      value={formData.targetId}
                      onChange={(e) =>
                        setFormData({ ...formData, targetId: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="">Choose a course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.targetType === 'USER' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Select Student *
                    </label>
                    <select
                      value={formData.targetId}
                      onChange={(e) =>
                        setFormData({ ...formData, targetId: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="">Choose a student</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Priority & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="LOW">Low</option>
                      <option value="NORMAL">Normal</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="Announcement">Announcement</option>
                      <option value="Update">Update</option>
                      <option value="Reminder">Reminder</option>
                      <option value="Important">Important</option>
                    </select>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg"
                  >
                    Send Notification
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

