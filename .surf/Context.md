# Sami Tuğal Blog - Proje Bağlamı

## Proje Bilgileri
- **Framework:** Hugo v0.157.0
- **Theme:** PaperMod
- **Domain:** https://blog.samitugal.dev/
- **Diller:** Türkçe (varsayılan), İngilizce

## Dizin Yapısı
```
blog/
├── content/           # Türkçe içerik
│   └── posts/         # 11 blog yazısı
├── content_en/        # İngilizce içerik
│   └── posts/         # 15 blog yazısı
├── layouts/
│   ├── partials/      # seo.html, extend_head.html, comments.html
│   ├── _default/_markup/  # render-image.html, render-link.html
│   └── robots.txt
├── static/
│   ├── css/custom.css
│   └── images/
├── themes/PaperMod/
├── hugo.toml
└── netlify.toml
```

## SEO Optimizasyonları (2026-04-25)

### Tamamlanan Görevler
1. **hugo.toml güncellemesi**
   - `enableRobotsTXT`, `enableEmoji`, `enableGitInfo` eklendi
   - `params.description`, `params.images` eklendi
   - `markup.goldmark.renderer.unsafe = true`
   - `minify`, `sitemap`, `taxonomies` yapılandırıldı

2. **Frontmatter standardizasyonu** (11 post)
   - `description`, `slug`, `keywords`, `images`, `author`, `lastmod` eklendi
   - Tüm slug'lar Türkçe karakter içermiyor

3. **SEO partial template** (`layouts/partials/seo.html`)
   - Meta description, keywords, author
   - Open Graph (og:title, og:description, og:image, article:*)
   - Twitter Card (summary_large_image)
   - JSON-LD BlogPosting schema

4. **Render hooks**
   - `render-image.html`: `<figure>` + `loading="lazy"` + `<figcaption>`
   - `render-link.html`: Dış linkler `target="_blank" rel="noopener noreferrer"`

5. **robots.txt** özelleştirildi

6. **İç linkler** `relref` shortcode'una çevrildi

7. **netlify.toml** oluşturuldu
   - Build komutu: `hugo --minify --gc --cleanDestinationDir`
   - Security headers, cache headers

## Eksik/Manuel Yapılacaklar
- [ ] `/static/images/default-og.png` (1200x630px) oluşturulmalı
- [ ] `/static/images/logo.png` (512x512px) oluşturulmalı
- [ ] Google Search Console'a domain eklenmeli
- [ ] Bing Webmaster Tools'a domain eklenmeli
- [ ] İngilizce postların frontmatter'ları da güncellenebilir

## Doğrulama
```bash
# Build test
hugo --minify

# Sitemap kontrolü
curl http://localhost:1313/sitemap.xml

# robots.txt kontrolü
curl http://localhost:1313/robots.txt

# SEO meta kontrolü (view-source)
# <meta name="description"...>
# <script type="application/ld+json">...
```

## Test Araçları
- Schema: https://search.google.com/test/rich-results
- Open Graph: https://www.opengraph.xyz/
- Twitter Card: https://cards-dev.twitter.com/validator
