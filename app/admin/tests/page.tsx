'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface MCQTest {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  isActive: boolean;
  createdAt: string;
  _count: {
    questions: number;
    attempts: number;
  };
}

export default function TestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<MCQTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTest, setSelectedTest] = useState<MCQTest | null>(null);

  useEffect(() => {
    fetchTests();
  }, [page, searchTerm]);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/tests?page=${page}&limit=10&search=${searchTerm}`
      );
      if (res.ok) {
        const data = await res.json();
        setTests(data.tests);
        setTotalPages(data.pagination.totalPages);
      } else {
        toast.error('Failed to load tests');
      }
    } catch (error) {
      toast.error('Error loading tests');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      duration: parseInt(formData.get('duration') as string),
      totalMarks: parseInt(formData.get('totalMarks') as string),
      passingMarks: parseInt(formData.get('passingMarks') as string),
      isActive: formData.get('isActive') === 'true',
    };

    try {
      const url =
        modalMode === 'create'
          ? '/api/admin/tests'
          : `/api/admin/tests/${selectedTest?.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          modalMode === 'create' ? 'Test created!' : 'Test updated!'
        );
        setShowModal(false);
        fetchTests();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving test');
    }
  };

  const handleDelete = async (testId: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;

    try {
      const res = await fetch(`/api/admin/tests/${testId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Test deleted!');
        fetchTests();
      } else {
        toast.error('Delete failed');
      }
    } catch (error) {
      toast.error('Error deleting test');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">MCQ Test Management</h1>
        <button
          onClick={() => {
            setModalMode('create');
            setSelectedTest(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Test
        </button>
      </div>

      {/* Search */}
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : tests.length === 0 ? (
          <div className="col-span-full rounded-lg bg-white p-12 text-center text-gray-500 shadow-md">
            No tests found
          </div>
        ) : (
          tests.map((test) => (
            <div
              key={test.id}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {test.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{test.category}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    test.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {test.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {test.description && (
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                  {test.description}
                </p>
              )}

              <div className="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-900">{test.duration} min</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Marks</p>
                  <p className="font-semibold text-gray-900">{test.totalMarks}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Questions</p>
                  <p className="font-semibold text-gray-900">
                    {test._count.questions}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Attempts</p>
                  <p className="font-semibold text-gray-900">
                    {test._count.attempts}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/tests/${test.id}`)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
                >
                  <Eye className="h-4 w-4" />
                  Manage Questions
                </button>
                <button
                  onClick={() => {
                    setModalMode('edit');
                    setSelectedTest(test);
                    setShowModal(true);
                  }}
                  className="rounded-lg bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-lg bg-white px-6 py-3 shadow-md">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {modalMode === 'create' ? 'Create Test' : 'Edit Test'}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedTest?.title}
                  required
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedTest?.description}
                  rows={3}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={selectedTest?.category}
                  required
                  placeholder="e.g., AP Constable, Sub-Inspector"
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    defaultValue={selectedTest?.duration}
                    required
                    min="1"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Marks *
                  </label>
                  <input
                    type="number"
                    name="totalMarks"
                    defaultValue={selectedTest?.totalMarks}
                    required
                    min="1"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Passing Marks *
                  </label>
                  <input
                    type="number"
                    name="passingMarks"
                    defaultValue={selectedTest?.passingMarks}
                    required
                    min="1"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="isActive"
                  defaultValue={selectedTest?.isActive?.toString() ?? 'true'}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {modalMode === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

