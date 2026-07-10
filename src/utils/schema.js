/**
 * JSON-LD builders. Schema text must always match visible on-page content.
 */

const SITE = 'https://www.indianbrokertest.in';
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

export function itemListSchema({ name, path, items }) {
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
      url: SITE + '/brokers/' + it.slug + '/',
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
