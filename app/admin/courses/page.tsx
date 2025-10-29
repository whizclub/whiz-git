'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  level: string;
  category?: string;
  thumbnail?: string;
  isActive: boolean;
  createdAt: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [page, searchTerm]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/courses?page=${page}&limit=10&search=${searchTerm}`
      );
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses);
        setTotalPages(data.pagination.totalPages);
      } else {
        toast.error('Failed to load courses');
      }
    } catch (error) {
      toast.error('Error loading courses');
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
      price: formData.get('price') as string,
      duration: formData.get('duration') as string,
      level: formData.get('level') as string,
      category: formData.get('category') as string,
      thumbnail: formData.get('thumbnail') as string,
      isActive: formData.get('isActive') === 'true',
    };

    try {
      const url =
        modalMode === 'create'
          ? '/api/admin/courses'
          : `/api/admin/courses/${selectedCourse?.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          modalMode === 'create' ? 'Course created!' : 'Course updated!'
        );
        setShowModal(false);
        fetchCourses();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving course');
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Course deleted!');
        fetchCourses();
      } else {
        toast.error('Delete failed');
      }
    } catch (error) {
      toast.error('Error deleting course');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
        <button
          onClick={() => {
            setModalMode('create');
            setSelectedCourse(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Course
        </button>
      </div>

      {/* Search */}
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No courses found
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      course.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {course.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>
                <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
                  <span className="font-semibold text-blue-600">
                    ₹{course.price}
                  </span>
                  <span>{course.level}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setModalMode('edit');
                      setSelectedCourse(course);
                      setShowModal(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
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
                {modalMode === 'create' ? 'Create Course' : 'Edit Course'}
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
                  defaultValue={selectedCourse?.title}
                  required
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedCourse?.description}
                  required
                  rows={4}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={selectedCourse?.price}
                    required
                    placeholder="e.g., 999"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={selectedCourse?.duration}
                    placeholder="e.g., 3 months"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <select
                    name="level"
                    defaultValue={selectedCourse?.level ?? 'Beginner'}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={selectedCourse?.category}
                    placeholder="e.g., AP Police"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  defaultValue={selectedCourse?.thumbnail}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="isActive"
                  defaultValue={selectedCourse?.isActive?.toString() ?? 'true'}
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

