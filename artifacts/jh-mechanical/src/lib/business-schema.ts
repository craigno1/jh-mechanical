import logoMarkPath from '@assets/image_1788175621031.png';

export function getBusinessId(siteUrl: string) {
  return `${siteUrl}/#business`;
}

export function getBusinessSchema(siteUrl: string) {
  return {
    '@type': 'AutoRepair',
    '@id': getBusinessId(siteUrl),
    name: 'JH Mechanical',
    url: `${siteUrl}/`,
    logo: `${siteUrl}${logoMarkPath}`,
    image: `${siteUrl}${logoMarkPath}`,
    telephone: '+61 3 5448 8149',
    description:
      'Practical, dependable diesel mechanic services for trucks, fleets, heavy vehicles and machinery across Bendigo and surrounding Victoria. Call ahead to discuss your vehicle and arrange service.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 3/39 Collins St',
      addressLocality: 'Kangaroo Flat',
      addressRegion: 'VIC',
      postalCode: '3555',
      addressCountry: 'AU',
    },
    areaServed: [
      'Bendigo',
      'Heathcote',
      'Seymour',
      'Macedon',
      'Shepparton',
      'Lockington',
      'Melbourne',
      'Sunbury',
      'Victoria',
    ].map((name) => ({
      '@type': name === 'Victoria' ? 'State' : 'City',
      name,
    })),
    sameAs: ['https://www.facebook.com/dieselmechbendigo'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61 3 5448 8149',
      contactType: 'customer service',
      description:
        'Call ahead to discuss your vehicle, confirm availability and arrange service.',
      availableLanguage: 'English',
    },
  };
}