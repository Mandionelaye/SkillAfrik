export default function sitemap() {
  return [
    {
      url: 'https://skillafrik-seven.vercel.app',
      lastModified: new Date(),
       priority: 1,
    },
    {
      url: 'https://skillafrik-seven.vercel.app/domaines/',
      lastModified: new Date(),
       priority: 0.8,
    },
    {
      url: 'https://skillafrik-seven.vercel.app/domaines/formation/',
      lastModified: new Date(),
      priority: 0.9,
    },
  ]
}