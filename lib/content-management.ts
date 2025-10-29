/**
 * Content Management utilities for WhizClub platform
 */

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';
export type ContentType = 'course' | 'exam-paper' | 'notification' | 'article' | 'page';

export interface ContentMetadata {
  title: string;
  description?: string;
  tags?: string[];
  author?: string;
  category?: string;
  publishedAt?: Date;
  updatedAt?: Date;
}

export interface ContentVersion {
  version: number;
  content: string;
  metadata: ContentMetadata;
  status: ContentStatus;
  createdAt: Date;
  createdBy: string;
}

/**
 * Content Manager class
 * Handles content creation, editing, versioning, and publishing
 */
export class ContentManager {
  /**
   * Validate content
   */
  static validateContent(content: string, metadata: ContentMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!content || content.trim().length === 0) {
      errors.push('Content cannot be empty');
    }

    if (content.length > 50000) {
      errors.push('Content exceeds maximum length of 50,000 characters');
    }

    if (!metadata.title || metadata.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (metadata.title && metadata.title.length > 200) {
      errors.push('Title exceeds maximum length of 200 characters');
    }

    if (metadata.description && metadata.description.length > 500) {
      errors.push('Description exceeds maximum length of 500 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize content HTML
   */
  static sanitizeContent(content: string): string {
    // Remove script tags
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove event handlers
    content = content.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // Remove javascript: protocol
    content = content.replace(/javascript:/gi, '');
    
    return content;
  }

  /**
   * Generate content slug from title
   */
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Extract excerpt from content
   */
  static extractExcerpt(content: string, maxLength: number = 150): string {
    // Remove HTML tags
    const text = content.replace(/<[^>]*>/g, '');
    
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.substring(0, maxLength).trim() + '...';
  }

  /**
   * Calculate reading time
   */
  static calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  /**
   * Parse content for SEO keywords
   */
  static extractKeywords(content: string, metadata: ContentMetadata): string[] {
    const keywords = new Set<string>();

    // Add tags
    if (metadata.tags) {
      metadata.tags.forEach(tag => keywords.add(tag.toLowerCase()));
    }

    // Extract from title
    const titleWords = metadata.title.toLowerCase().split(/\s+/);
    titleWords.forEach(word => {
      if (word.length > 3) {
        keywords.add(word);
      }
    });

    // Extract from content (simple word frequency)
    const text = content.replace(/<[^>]*>/g, '').toLowerCase();
    const words = text.match(/\b\w{4,}\b/g) || [];
    const wordFreq: Record<string, number> = {};
    
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    // Add top 10 most frequent words
    Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([word]) => keywords.add(word));

    return Array.from(keywords);
  }

  /**
   * Format content for display
   */
  static formatContent(content: string): string {
    // Convert markdown to HTML (if needed)
    // Add line breaks
    content = content.replace(/\n/g, '<br>');
    
    // Preserve paragraphs
    content = content.replace(/<p>/g, '<p>').replace(/<\/p>/g, '</p>');
    
    return content;
  }

  /**
   * Validate metadata
   */
  static validateMetadata(metadata: ContentMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!metadata.title) {
      errors.push('Title is required');
    }

    if (metadata.tags && metadata.tags.length > 20) {
      errors.push('Maximum 20 tags allowed');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Content Scheduler
 * Handles scheduled publishing of content
 */
export class ContentScheduler {
  /**
   * Check if content should be published
   */
  static shouldPublish(publishedAt: Date | null, currentDate: Date = new Date()): boolean {
    if (!publishedAt) return false;
    return publishedAt <= currentDate;
  }

  /**
   * Schedule content for publishing
   */
  static schedulePublish(contentId: string, publishDate: Date): boolean {
    // In production, this would:
    // 1. Update database with scheduled date
    // 2. Set up cron job or scheduled task
    // 3. Notify admins
    
    // For now, return true
    return true;
  }

  /**
   * Get upcoming scheduled content
   */
  static getScheduledContent(currentDate: Date = new Date()): string[] {
    // In production, query database for scheduled content
    return [];
  }
}

/**
 * Content Version Manager
 * Handles content versioning
 */
export class ContentVersionManager {
  /**
   * Create new version
   */
  static createVersion(
    baseContent: string,
    baseMetadata: ContentMetadata,
    newContent: string,
    newMetadata: ContentMetadata,
    createdBy: string
  ): ContentVersion {
    return {
      version: 1, // In production, increment from database
      content: newContent,
      metadata: newMetadata,
      status: 'draft',
      createdAt: new Date(),
      createdBy,
    };
  }

  /**
   * Compare versions
   */
  static compareVersions(v1: ContentVersion, v2: ContentVersion): {
    contentChanged: boolean;
    metadataChanged: boolean;
    changes: string[];
  } {
    const changes: string[] = [];
    const contentChanged = v1.content !== v2.content;
    const metadataChanged = JSON.stringify(v1.metadata) !== JSON.stringify(v2.metadata);

    if (contentChanged) {
      changes.push('Content was modified');
    }

    if (v1.metadata.title !== v2.metadata.title) {
      changes.push(`Title changed from "${v1.metadata.title}" to "${v2.metadata.title}"`);
    }

    if (v1.status !== v2.status) {
      changes.push(`Status changed from "${v1.status}" to "${v2.status}"`);
    }

    return {
      contentChanged,
      metadataChanged,
      changes,
    };
  }
}

/**
 * Content Search
 * Simple content search utilities
 */
export class ContentSearch {
  /**
   * Search content
   */
  static search(query: string, content: string, metadata: ContentMetadata): {
    matches: boolean;
    score: number;
    highlights: string[];
  } {
    const queryLower = query.toLowerCase();
    const contentLower = content.toLowerCase();
    const titleLower = metadata.title.toLowerCase();
    
    let score = 0;
    const highlights: string[] = [];

    // Title match (highest score)
    if (titleLower.includes(queryLower)) {
      score += 100;
      highlights.push('Title match');
    }

    // Description match
    if (metadata.description?.toLowerCase().includes(queryLower)) {
      score += 50;
      highlights.push('Description match');
    }

    // Content match
    const contentMatches = (contentLower.match(new RegExp(queryLower, 'g')) || []).length;
    score += contentMatches * 10;
    
    if (contentMatches > 0) {
      highlights.push(`${contentMatches} content matches`);
    }

    return {
      matches: score > 0,
      score,
      highlights,
    };
  }

  /**
   * Filter content by criteria
   */
  static filter(
    contentList: Array<{ metadata: ContentMetadata; status: ContentStatus }>,
    filters: {
      status?: ContentStatus;
      category?: string;
      tags?: string[];
      author?: string;
      search?: string;
    }
  ) {
    return contentList.filter((item) => {
      if (filters.status && item.status !== filters.status) {
        return false;
      }

      if (filters.category && item.metadata.category !== filters.category) {
        return false;
      }

      if (filters.author && item.metadata.author !== filters.author) {
        return false;
      }

      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some(tag =>
          item.metadata.tags?.includes(tag)
        );
        if (!hasTag) return false;
      }

      if (filters.search) {
        const searchResult = this.search(
          filters.search,
          '', // Would need full content
          item.metadata
        );
        if (!searchResult.matches) return false;
      }

      return true;
    });
  }
}

/**
 * Content Export/Import
 */
export class ContentExport {
  /**
   * Export content to JSON
   */
  static exportToJSON(content: ContentVersion): string {
    return JSON.stringify({
      version: content.version,
      content: content.content,
      metadata: content.metadata,
      status: content.status,
      exportedAt: new Date().toISOString(),
    }, null, 2);
  }

  /**
   * Import content from JSON
   */
  static importFromJSON(json: string): ContentVersion | null {
    try {
      const data = JSON.parse(json);
      return {
        version: data.version || 1,
        content: data.content,
        metadata: data.metadata,
        status: data.status || 'draft',
        createdAt: new Date(data.exportedAt || Date.now()),
        createdBy: data.createdBy || 'system',
      };
    } catch (error) {
      return null;
    }
  }
}

