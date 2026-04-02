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
- **Gallery with 33 named product images** organised by category (Circular Ponchos & Jackets, Design Motif Square Jackets, Granny Square, Hexagonal Granny Square, Summer Tops & Skirts, Macramé) with filter tabs
- **Category section headers** — gallery grouped under subfolder headings with individual piece names
- **Load More pagination** — keeps initial page loads fast
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
│   └── gallery/            # 33 optimised product images (800px max, 85% JPEG quality)
│       ├── circular-ponchos-and-jackets-*.jpg
│       ├── design-motif-square-jackets-*.jpg
│       ├── granny-square-*.jpg
│       ├── hexogonal-granny-square-*.jpg
│       ├── summer-tops-and-skirts-*.jpg
│       └── macrame-*.jpg
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Actions deployment workflow
├── process_images.py       # Image processing script (resize, crop screenshots, censor names)
├── gallery_manifest.json   # Generated manifest of all gallery images
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

### Image Processing

New product images go into subfolders under `images/Raw_Products/Labelled_Crochet_Cardis/` (crochet) or `images/Raw_Products/Macrame_Images/` (macramé). Then run:

```bash
python process_images.py
```

This resizes to 800px max, centre-crops screenshots with extreme aspect ratios, censors profanity in display names, and outputs to `images/gallery/` with descriptive filenames.

## License

All images and content are the property of The Audacity of Thread. Code structure may be referenced for learning purposes.

---

*"It costs that much because it took me f\*\*king hours."*
