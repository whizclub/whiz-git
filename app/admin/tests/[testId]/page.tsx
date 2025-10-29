'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface MCQQuestion {
  id: string;
  questionNo: number;
  subject?: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string;
  marks: number;
  negativeMarks: number;
}

interface TestDetails {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  isActive: boolean;
  questions: MCQQuestion[];
  _count: {
    attempts: number;
  };
}

export default function TestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  const [test, setTest] = useState<TestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedQuestion, setSelectedQuestion] = useState<MCQQuestion | null>(null);

  useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  const fetchTestDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/tests/${testId}`);
      if (res.ok) {
        const data = await res.json();
        setTest(data.test);
      } else {
        toast.error('Failed to load test details');
      }
    } catch (error) {
      toast.error('Error loading test details');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      questionNo: parseInt(formData.get('questionNo') as string),
      subject: formData.get('subject') as string,
      question: formData.get('question') as string,
      optionA: formData.get('optionA') as string,
      optionB: formData.get('optionB') as string,
      optionC: formData.get('optionC') as string,
      optionD: formData.get('optionD') as string,
      correctAnswer: formData.get('correctAnswer') as string,
      explanation: formData.get('explanation') as string,
      marks: parseInt(formData.get('marks') as string),
      negativeMarks: parseFloat(formData.get('negativeMarks') as string),
    };

    try {
      const url = `/api/admin/tests/${testId}/questions`;
      const method = modalMode === 'create' ? 'POST' : 'PATCH';
      const body = modalMode === 'edit' ? { ...data, questionId: selectedQuestion?.id } : data;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(modalMode === 'create' ? 'Question added!' : 'Question updated!');
        setShowModal(false);
        fetchTestDetails();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving question');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const res = await fetch(`/api/admin/tests/${testId}/questions?questionId=${questionId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Question deleted!');
        fetchTestDetails();
      } else {
        toast.error('Delete failed');
      }
    } catch (error) {
      toast.error('Error deleting question');
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Test not found</p>
        <button
          onClick={() => router.push('/admin/tests')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Tests
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/tests')}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{test.title}</h1>
            <p className="text-gray-600">{test.category}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setModalMode('create');
            setSelectedQuestion(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Question
        </button>
      </div>

      {/* Test Info */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-2xl font-bold text-gray-900">{test.duration} min</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm text-gray-500">Total Marks</p>
          <p className="text-2xl font-bold text-gray-900">{test.totalMarks}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm text-gray-500">Questions</p>
          <p className="text-2xl font-bold text-gray-900">{test.questions.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm text-gray-500">Attempts</p>
          <p className="text-2xl font-bold text-gray-900">{test._count.attempts}</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {test.questions.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-md">
            <p className="text-gray-500">No questions added yet</p>
            <button
              onClick={() => {
                setModalMode('create');
                setSelectedQuestion(null);
                setShowModal(true);
              }}
              className="mt-4 text-blue-600 hover:underline"
            >
              Add your first question
            </button>
          </div>
        ) : (
          test.questions.map((question, index) => (
            <div key={question.id} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                      {question.questionNo}
                    </span>
                    {question.subject && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {question.subject}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {question.marks} mark{question.marks > 1 ? 's' : ''}
                      {question.negativeMarks > 0 && ` (-${question.negativeMarks})`}
                    </span>
                  </div>
                  <p className="mb-3 text-gray-900">{question.question}</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div
                        key={option}
                        className={`rounded-lg border-2 p-3 ${
                          question.correctAnswer === option
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <span className="font-semibold">{option}.</span>{' '}
                        {question[`option${option}` as keyof MCQQuestion]}
                      </div>
                    ))}
                  </div>
                  {question.explanation && (
                    <div className="mt-3 rounded-lg bg-blue-50 p-3">
                      <p className="text-sm font-medium text-blue-900">Explanation:</p>
                      <p className="text-sm text-blue-800">{question.explanation}</p>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex gap-2">
                  <button
                    onClick={() => {
                      setModalMode('edit');
                      setSelectedQuestion(question);
                      setShowModal(true);
                    }}
                    className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {modalMode === 'create' ? 'Add Question' : 'Edit Question'}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdateQuestion} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Question No. *
                  </label>
                  <input
                    type="number"
                    name="questionNo"
                    defaultValue={selectedQuestion?.questionNo ?? test.questions.length + 1}
                    required
                    min="1"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    defaultValue={selectedQuestion?.subject}
                    placeholder="e.g., Maths"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Marks *
                  </label>
                  <input
                    type="number"
                    name="marks"
                    defaultValue={selectedQuestion?.marks ?? 1}
                    required
                    min="1"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question *
                </label>
                <textarea
                  name="question"
                  defaultValue={selectedQuestion?.question}
                  required
                  rows={3}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Option A *
                  </label>
                  <input
                    type="text"
                    name="optionA"
                    defaultValue={selectedQuestion?.optionA}
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Option B *
                  </label>
                  <input
                    type="text"
                    name="optionB"
                    defaultValue={selectedQuestion?.optionB}
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Option C *
                  </label>
                  <input
                    type="text"
                    name="optionC"
                    defaultValue={selectedQuestion?.optionC}
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Option D *
                  </label>
                  <input
                    type="text"
                    name="optionD"
                    defaultValue={selectedQuestion?.optionD}
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Correct Answer *
                  </label>
                  <select
                    name="correctAnswer"
                    defaultValue={selectedQuestion?.correctAnswer ?? 'A'}
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Negative Marks
                  </label>
                  <input
                    type="number"
                    name="negativeMarks"
                    defaultValue={selectedQuestion?.negativeMarks ?? 0}
                    step="0.25"
                    min="0"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Explanation
                </label>
                <textarea
                  name="explanation"
                  defaultValue={selectedQuestion?.explanation}
                  rows={3}
                  placeholder="Optional explanation for the answer"
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
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
                  {modalMode === 'create' ? 'Add Question' : 'Update Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

