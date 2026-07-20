/**
 * JSON-LD builders. Schema text must always match visible on-page content.
 */

const SITE = 'https://www.indianbrokertest.com';
const SITE_NAME = 'Indian Broker Test';

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE + '/',
    description:
      'Independent, data-driven comparison of Indian stock brokers based only on verifiable published information.',
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE + '/',
    logo: SITE + '/favicon.svg',
    email: 'indianbrokertest@gmail.com',
    description:
      'An independent editorial publication comparing Indian stock brokers. Not affiliated with, sponsored by, or endorsed by any broker.',
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE + it.path,
    })),
  };
}

export function articleSchema({ title, description, path, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: SITE + path,
    datePublished,
    dateModified,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE + '/about/' },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function itemListSchema({ name, path, items, itemPath }) {
  const urlFor = itemPath ?? ((it) => '/brokers/' + it.slug + '/');
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: SITE + path,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: SITE + urlFor(it),
    })),
  };
}

export function collectionPageSchema({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: SITE + path,
  };
}

export function webApplicationSchema({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: SITE + path,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE + '/' },
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE + '/about/' },
  };
}
