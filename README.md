# The Audacity of Thread 🧶

**Handcrafted with love & profanity**

A portfolio website for a handmade crochet and macramé business based in Cape Town, South Africa, with worldwide shipping.

🌐 Live site: [theaudacityofthread.com](https://theaudacityofthread.com)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=flat&logo=githubpages&logoColor=white)

---

## About

The Audacity of Thread is Kerryn’s one-woman crochet and macramé studio. The site showcases handmade pieces with a tongue-in-cheek, polished presentation that suits the brand.

This repository contains a static single-page site built with vanilla HTML, CSS, and JavaScript. There is no build step; the site is deployed directly from the repository to GitHub Pages.

## What’s included

- Responsive single-page layout for desktop, tablet, and mobile
- Gallery browsing with category filters and a lightbox viewer
- Scroll-reveal animations and a contact form
- SEO-friendly metadata, sitemap, and robots directives
- Python helpers for preparing and publishing gallery images

## Tech stack

- HTML5
- CSS3 with custom properties, flexbox, and grid
- Vanilla JavaScript (ES6+)
- Python 3 for image-processing scripts
- GitHub Pages with a GitHub Actions deployment workflow

## Project structure

```text
├── index.html                 # Main single-page site
├── css/styles.css             # Site styles, responsive breakpoints, and animations
├── js/main.js                 # Navigation, gallery filtering, lightbox, and reveal effects
├── images/                    # Static site assets and gallery images
├── .github/workflows/pages.yml  # GitHub Pages deployment workflow
├── process_images.py          # Bulk image processing for the main gallery
├── process_festival_group.py  # Processing helper for the festival group collection
├── gallery_manifest.json      # Generated gallery metadata used by the site
├── CNAME                      # Custom domain configuration for GitHub Pages
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # Crawl instructions for search engines
└── .gitignore
```

## Local development

No build step is required. You can preview the site locally by opening the HTML file directly or serving the folder from a local web server.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Image processing

New product images should be added under the relevant raw-product folders and then processed with the Python helpers.

```bash
python3 process_images.py
python3 process_festival_group.py
```

The scripts:

- resize images to a consistent maximum size
- crop extreme aspect ratios to fit the gallery layout better
- save processed JPEGs into the gallery folder
- generate or update the gallery manifest used by the website

## Deployment

The site deploys automatically to GitHub Pages on pushes to the main branch via the workflow in [.github/workflows/pages.yml](.github/workflows/pages.yml). The custom domain is configured in [CNAME](CNAME).

## License

All images and content are the property of The Audacity of Thread. The code structure and implementation may be referenced for learning purposes.
