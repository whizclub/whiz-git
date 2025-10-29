import { describe, it, expect } from '@jest/globals';
import {
  generateMetadata,
  generateExamPaperSchema,
  generateCourseSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';

describe('SEO Utilities', () => {
  describe('generateMetadata', () => {
    it('should generate metadata with title and description', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBe('Test description');
    });

    it('should include keywords in metadata', () => {
      const metadata = generateMetadata({
        title: 'Test',
        description: 'Test',
        keywords: ['keyword1', 'keyword2'],
      });

      expect(metadata.keywords).toContain('keyword1');
      expect(metadata.keywords).toContain('AP Police');
    });

    it('should set canonical URL', () => {
      const metadata = generateMetadata({
        title: 'Test',
        description: 'Test',
        canonical: '/test-page',
      });

      expect(metadata.alternates?.canonical).toBe('/test-page');
    });
  });

  describe('generateExamPaperSchema', () => {
    it('should generate valid exam paper schema', () => {
      const schema = generateExamPaperSchema(
        'Constable Prelims 2022',
        2022,
        'Prelims',
        'Constable',
        200,
        ['English', 'Maths']
      );

      expect(schema['@type']).toBe('Course');
      expect(schema.name).toBe('Constable Prelims 2022 - 2022');
      expect(schema.teaches).toEqual(['English', 'Maths']);
    });
  });

  describe('generateCourseSchema', () => {
    it('should generate valid course schema', () => {
      const schema = generateCourseSchema(
        'Test Course',
        'Test description',
        'Constable',
        'P60D'
      );

      expect(schema['@type']).toBe('Course');
      expect(schema.name).toBe('Test Course');
      expect(schema.timeRequired).toBe('P60D');
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('should generate valid breadcrumb schema', () => {
      const schema = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
      ]);

      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0].name).toBe('Home');
    });
  });
});

