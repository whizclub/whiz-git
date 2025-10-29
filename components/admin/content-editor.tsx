'use client';

import { useState } from 'react';
import { Save, Eye, Clock, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ContentManager,
  ContentMetadata,
  ContentStatus,
  ContentType,
} from '@/lib/content-management';
import { trackEvent } from '@/lib/analytics';

interface ContentEditorProps {
  contentType: ContentType;
  initialContent?: string;
  initialMetadata?: ContentMetadata;
  onSave: (content: string, metadata: ContentMetadata) => Promise<void>;
}

/**
 * Content Editor Component
 * Rich text editor for managing content
 */
export function ContentEditor({
  contentType,
  initialContent = '',
  initialMetadata = { title: '' },
  onSave,
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [metadata, setMetadata] = useState<ContentMetadata>(initialMetadata);
  const [status, setStatus] = useState<ContentStatus>('draft');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = async () => {
    // Validate content
    const validation = ContentManager.validateContent(content, metadata);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    setIsSaving(true);

    try {
      // Sanitize content
      const sanitized = ContentManager.sanitizeContent(content);
      
      // Track save event
      trackEvent('content_saved', {
        category: 'content_management',
        content_type: contentType,
        status,
      });

      await onSave(sanitized, metadata);
    } catch (error) {
      setErrors(['Failed to save content. Please try again.']);
    } finally {
      setIsSaving(false);
    }
  };

  const readingTime = ContentManager.calculateReadingTime(content);
  const excerpt = ContentManager.extractExcerpt(content);

  return (
    <div className="space-y-6">
      {/* Metadata Section */}
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-bold mb-4">Content Details</h2>
        
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={metadata.title}
              onChange={(e) =>
                setMetadata({ ...metadata, title: e.target.value })
              }
              placeholder="Enter content title"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">
              {metadata.title.length}/200 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={metadata.description || ''}
              onChange={(e) =>
                setMetadata({ ...metadata, description: e.target.value })
              }
              placeholder="Brief description"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {(metadata.description?.length || 0)}/500 characters
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <Input
              value={metadata.tags?.join(', ') || ''}
              onChange={(e) =>
                setMetadata({
                  ...metadata,
                  tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                })
              }
              placeholder="Tag1, Tag2, Tag3"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate tags with commas (max 20 tags)
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ContentStatus)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Content</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {readingTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {content.length} chars
            </span>
          </div>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here... (Supports HTML)"
          rows={20}
          className="font-mono text-sm"
        />

        {/* Preview */}
        {content && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Preview:</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: ContentManager.formatContent(content) }}
            />
          </div>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Errors:</h3>
          <ul className="list-disc list-inside text-red-700">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Content'}
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            // Preview logic
            window.open('/content/preview', '_blank');
          }}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
      </div>
    </div>
  );
}

