export function StructuredData() {
  // Enhanced Organization Schema
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'WhizClub',
    alternateName: 'Whiz Club',
    description: 'Complete AP Police Exam Preparation Platform - Constable & Sub-Inspector Coaching',
    url: 'https://whizclub.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://whizclub.com/whizclub-logo.jpg',
      width: 512,
      height: 512,
    },
    image: 'https://whizclub.com/whizclub-logo.jpg',
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      address: 'Andhra Pradesh, India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Telugu'],
      areaServed: 'AP',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      description: 'Free access to comprehensive AP Police exam preparation materials',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '125',
      bestRating: '5',
      worstRating: '1',
    },
  };

  // Enhanced WebSite Schema
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WhizClub',
    url: 'https://whizclub.com',
    description: 'Master AP Police Constable & Sub-Inspector exams with comprehensive study materials, previous year papers, and cutoff marks',
    inLanguage: ['en', 'te'],
    copyrightYear: 2024,
    copyrightHolder: {
      '@type': 'Organization',
      name: 'WhizClub',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://whizclub.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Course Schema
  const courseData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AP Police Constable & Sub-Inspector Exam Preparation',
    description: 'Comprehensive preparation course for AP Police exams with previous year papers, cutoff marks, study materials, mock tests, and expert guidance',
    provider: {
      '@type': 'Organization',
      name: 'WhizClub',
      url: 'https://whizclub.com',
    },
    educationalCredentialAwarded: 'Certificate',
    courseCode: 'AP-POLICE-PREP',
    timeRequired: 'P60D', // 60 days
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    teaches: [
      'AP Police Constable Exam Preparation',
      'AP Sub-Inspector Exam Preparation',
      'English Language Skills',
      'Arithmetic & Reasoning',
      'General Knowledge',
      'Current Affairs',
      'Telugu Language',
    ],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
  };

  // LocalBusiness Schema (for local SEO)
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalService',
    name: 'WhizClub - AP Police Exam Coaching',
    image: 'https://whizclub.com/whizclub-logo.jpg',
    '@id': 'https://whizclub.com',
    url: 'https://whizclub.com',
    telephone: '',
    priceRange: '₹99',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.3850,
      longitude: 78.4867,
    },
    areaServed: {
      '@type': 'State',
      name: 'Andhra Pradesh',
    },
    knowsAbout: [
      'AP Police Constable Exam',
      'AP Sub-Inspector Exam',
      'APSLPRB',
      'Police Exam Preparation',
    ],
  };

  // FAQ Schema
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is WhizClub free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, WhizClub is completely free to use. All study materials, previous year papers, and resources are available at no cost. We welcome voluntary donations to support the platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'What exams are covered on WhizClub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WhizClub covers AP Police Constable and AP Sub-Inspector exam preparation with previous year papers, cutoff marks, study materials, and mock tests.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you need to sign in with Google to access the course materials and track your progress.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are previous year papers available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we have comprehensive previous year papers from 2018, 2022, and other years with detailed solutions for both Prelims and Mains exams.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I practice mock tests on WhizClub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide mock tests for both AP Police Constable and Sub-Inspector exams to help you prepare effectively.',
        },
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://whizclub.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AP Police Exam Preparation',
        item: 'https://whizclub.com/courses',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}

