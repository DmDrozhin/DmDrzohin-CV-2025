// vite.plugins/htmlMeta.js
import fs from 'fs';
import path from 'path';

export default function injectSeoMeta() {
  return {
    name: 'inject-seo-meta',
    transformIndexHtml(html) {
      // Загружаем SEO-конфиг (можно будет менять в одном месте)
      const seoPath = path.resolve('src/plugins/seoMetaData.json');
      const seo = JSON.parse(fs.readFileSync(seoPath, 'utf-8'));

      // Генерируем HTML для head
      const seoTags = `
        <title>${seo.title}</title>
        <meta name="description" content="${seo.description}" />

        <!-- Open Graph -->
        <meta property="og:title" content="${seo.ogTitle}" />
        <meta property="og:description" content="${seo.ogDescription}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${seo.ogUrl}" />
        <meta property="og:image" content="${seo.ogImage}" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${seo.twitterTitle}" />
        <meta name="twitter:description" content="${seo.twitterDescription}" />
        <meta name="twitter:image" content="${seo.twitterImage}" />

        <!-- Canonical -->
        <link rel="canonical" href="${seo.canonical}" />

        <!-- Favicons -->
        <link rel="icon" href="${seo.basePath}favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="${seo.basePath}favicon/apple-touch-icon.png" />
        <link rel="manifest" href="${seo.basePath}favicon/site.webmanifest" />
      `;

      // Вставляем теги перед </head>
      return html.replace('</head>', `${seoTags}\n</head>`);
    }
  };
}
