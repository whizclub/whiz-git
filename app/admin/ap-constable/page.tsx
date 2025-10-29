'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, Clock, FileText, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface Test {
  id: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  isActive: boolean;
  createdAt: string;
  _count?: {
    questions: number;
  };
}

export default function APConstableTestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
  });

  useEffect(() => {
    checkAuthAndLoadTests();
  }, []);

  const checkAuthAndLoadTests = async () => {
    try {
      const authRes = await fetch('/api/admin/session');
      if (!authRes.ok) {
        router.push('/login');
        return;
      }

      const testsRes = await fetch('/api/admin/tests?category=AP Constable');
      if (testsRes.ok) {
        const data = await testsRes.json();
        setTests(data.tests);
      }
    } catch (error) {
      toast.error('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          category: 'AP Constable',
        }),
      });

      if (res.ok) {
        toast.success('Test created successfully!');
        setShowModal(false);
        setFormData({
          title: '',
          description: '',
          duration: 60,
          totalMarks: 100,
          passingMarks: 40,
        });
        checkAuthAndLoadTests();
      } else {
        toast.error('Failed to create test');
      }
    } catch (error) {
      toast.error('Error creating test');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;

    try {
      const res = await fetch(`/api/admin/tests/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Test deleted successfully');
        checkAuthAndLoadTests();
      } else {
        toast.error('Failed to delete test');
      }
    } catch (error) {
      toast.error('Error deleting test');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.push('/admin')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Analytics</span>
      </button>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👮 AP Constable Mock Tests
          </h1>
          <p className="text-gray-600">Create and manage AP Constable practice tests</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create New Test
        </button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl p-12 text-center shadow-lg">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tests created yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first AP Constable mock test to get started
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create First Test
            </button>
          </div>
        ) : (
          tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{test.title}</h3>
                  {test.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {test.description}
                    </p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    test.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {test.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Duration
                  </span>
                  <span className="font-semibold text-gray-900">{test.duration} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Marks</span>
                  <span className="font-semibold text-gray-900">{test.totalMarks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Passing Marks</span>
                  <span className="font-semibold text-gray-900">{test.passingMarks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Questions</span>
                  <span className="font-semibold text-gray-900">
                    {test._count?.questions || 0}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/tests/${test.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Manage
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Test Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create AP Constable Test
            </h2>

            <form onSubmit={handleCreateTest} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Test Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  placeholder="e.g., AP Constable Mock Test 1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  placeholder="Brief description of the test..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Duration (min) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: parseInt(e.target.value) })
                    }
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Total Marks *
                  </label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, totalMarks: parseInt(e.target.value) })
                    }
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Pass Marks *
                  </label>
                  <input
                    type="number"
                    value={formData.passingMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, passingMarks: parseInt(e.target.value) })
                    }
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
              </div>

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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                >
                  Create Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

