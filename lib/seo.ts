import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/whizclub-logo.jpg',
  ogType = 'website',
  canonical,
}: PageMetadata): Metadata {
  return {
    title: {
      default: `${title} | WhizClub`,
      template: '%s | WhizClub',
    },
    description,
    keywords: [
      ...keywords,
      'AP Police',
      'Constable exam',
      'Sub-Inspector exam',
      'AP Police preparation',
    ],
    authors: [{ name: 'WhizClub Team', url: 'https://whizclub.com' }],
    creator: 'WhizClub',
    publisher: 'WhizClub',
    metadataBase: new URL('https://whizclub.com'),
    alternates: {
      canonical: canonical || '/',
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonical ? `https://whizclub.com${canonical}` : 'https://whizclub.com',
      title: `${title} | WhizClub`,
      description,
      siteName: 'WhizClub',
      images: [
        {
          url: `https://whizclub.com${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | WhizClub`,
      description,
      images: [`https://whizclub.com${ogImage}`],
      creator: '@whizclub',
      site: '@whizclub',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate structured data for exam papers
 */
export function generateExamPaperSchema(
  paperTitle: string,
  paperYear: number,
  paperType: 'Prelims' | 'Mains',
  examType: 'Constable' | 'Sub-Inspector',
  totalQuestions: number,
  subjects: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${paperTitle} - ${paperYear}`,
    description: `${examType} ${paperType} exam paper from ${paperYear}`,
    provider: {
      '@type': 'Organization',
      name: 'WhizClub',
      url: 'https://whizclub.com',
    },
    courseCode: `AP-${examType.toUpperCase().replace(' ', '-')}-${paperYear}-${paperType}`,
    numberOfCredits: totalQuestions,
    teaches: subjects,
    educationalCredentialAwarded: 'Certificate of Completion',
  };
}

/**
 * Generate structured data for courses
 */
export function generateCourseSchema(
  title: string,
  description: string,
  category: string,
  duration: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description,
    provider: {
      '@type': 'Organization',
      name: 'WhizClub',
      url: 'https://whizclub.com',
    },
    courseCode: `WHIZ-${category.toUpperCase().replace(' ', '-')}`,
    timeRequired: duration,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generate structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://whizclub.com${item.url}`,
    })),
  };
}

/**
 * Generate Article schema for blog posts or announcements
 */
export function generateArticleSchema(
  title: string,
  description: string,
  author: string,
  publishedDate: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? `https://whizclub.com${image}` : 'https://whizclub.com/whizclub-logo.jpg',
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Organization',
      name: 'WhizClub',
      url: 'https://whizclub.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WhizClub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://whizclub.com/whizclub-logo.jpg',
      },
    },
  };
}

/**
 * Default meta tags for pages
 */
export const defaultMetaTags = {
  siteName: 'WhizClub',
  siteUrl: 'https://whizclub.com',
  twitterHandle: '@whizclub',
  author: 'WhizClub Team',
};

