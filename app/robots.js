export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/domaines', '/domaines/formation'],
      disallow: [],
    },
    sitemap: 'https://skillafrik-seven.vercel.app/sitemap.xml',
  }
}