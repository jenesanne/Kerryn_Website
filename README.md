# The Audacity of Thread 🧶

**Handcrafted with love & profanity**

A portfolio website for a handmade crochet and macramé business based in Cape Town, South Africa — shipping worldwide.

🌐 **Live site:** [theaudacityofthread.com](https://theaudacityofthread.com)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=flat&logo=githubpages&logoColor=white)

---

## About

The Audacity of Thread is Kerryn's one-woman crochet and macramé studio. The site showcases her handmade pieces — cardigans, tops, skirts, ponchos, wall hangings, and more — with a brand voice that's tongue-in-cheek yet sleek.

This is a static single-page site built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step — just clean code deployed straight to GitHub Pages.

## Features

- **Responsive single-page layout** — looks good on desktop, tablet, and mobile
- **Gallery with 59 product images** (54 crochet, 5 macramé) with category filter tabs
- **Load More pagination** — shows 12 items at a time to keep page loads fast
- **Lightbox viewer** — click any gallery image to browse full-size with keyboard navigation (← → Esc)
- **Scroll-reveal animations** — sections fade in as they enter the viewport via IntersectionObserver
- **Contact form** with email integration
- **SEO optimised** — Open Graph, Twitter Cards, Schema.org structured data, sitemap, robots.txt

## Tech Stack

| Layer       | Technology                                    |
|-------------|-----------------------------------------------|
| Markup      | HTML5                                         |
| Styling     | CSS3 (custom properties, flexbox, grid)       |
| Interactivity | Vanilla JavaScript (ES6+)                   |
| Fonts       | Google Fonts — Playfair Display + Inter       |
| Hosting     | GitHub Pages (via GitHub Actions)             |
| Domain      | theaudacityofthread.com (Namecheap)           |
| Email       | hello@theaudacityofthread.com (Namecheap forwarding) |

## Project Structure

```
├── index.html              # Main single-page site
├── css/
│   └── styles.css          # All styles, responsive breakpoints, animations
├── js/
│   └── main.js             # Nav, gallery filters, lightbox, scroll reveal, contact form
├── images/
│   ├── kerryn-profile.jpg  # About section profile photo
│   └── gallery/            # 59 optimised product images (800px max, 85% JPEG quality)
│       ├── product-01.jpg  # Crochet pieces (01–54)
│       └── product-55.jpg  # Macramé pieces (55–59)
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Actions deployment workflow
├── CNAME                   # Custom domain config for GitHub Pages
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine crawl directives
└── .gitignore
```

## Colour Palette

| Swatch | Name       | Hex       |
|--------|------------|-----------|
| 🟫     | Dark Brown | `#3B2F2F` |
| 🟢     | Sage       | `#7C9070` |
| 🟠     | Terracotta | `#C17754` |
| 🟡     | Cream      | `#FDF6EC` |
| 🩷     | Blush      | `#E8D5C4` |

## Deployment

The site auto-deploys on every push to `main` via the GitHub Actions workflow in `.github/workflows/pages.yml`. DNS is configured with Namecheap (4× A records pointing to GitHub Pages IPs + a `www` CNAME to `jenesanne.github.io`). HTTPS is enforced by GitHub Pages.

## Local Development

No build step required. Just open `index.html` in a browser, or serve it locally:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

## License

All images and content are the property of The Audacity of Thread. Code structure may be referenced for learning purposes.

---

*"It costs that much because it took me f\*\*king hours."*
