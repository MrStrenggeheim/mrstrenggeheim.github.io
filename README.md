# hunecke.dev - Personal Website

A minimalistic personal website featuring a landing page, CV, and works (blog/projects/publications) section.

## Features

- 🎨 **Minimalistic Design** - Clean, edgy aesthetic with grey-orange color palette
- 🌙 **Dark/Light Theme** - Toggle between themes, dark by default
- 📱 **Responsive** - Works on desktop and mobile
- ⚡ **Fast** - No frameworks, pure HTML/CSS/JS
- 📝 **Markdown Content** - Write works in markdown, build to static HTML

## Structure

```
├── index.html          # Landing page
├── cv.html             # Curriculum Vitae
├── works.html          # Works listing
├── bufo/index.html     # Bufo library (generated from src/bufo.html)
├── assets/bufo/        # Bufo images, thumbnails and search catalog
├── css/style.css       # All styles
├── js/                 # JavaScript modules
├── content/works/      # Markdown source files
├── works/              # Generated HTML articles
├── tools/              # Offline data pipelines (not run in CI)
└── build.py            # Build script
```

## Styling Rules

Keep the grey/orange palette and use one visual cue to distinguish a component:
usually its background. Tags, controls, cards, media previews, and article demos
have no enclosing borders. Dividers can mark document structure. Do not add
orange focus outlines; preserve keyboard operation.

All site styles live in `css/style.css`. Its **SHARED UI PRIMITIVES** section
owns the appearance of controls, including legacy `.works__*` selectors. Avoid
redeclaring their padding, font, background, or height in page-specific rules.

| Token / primitive | Purpose |
| --- | --- |
| `--control-height` | 2.75rem (44px at the default font size) for search and standard buttons |
| `--control-height-small` | 2rem (32px) for type filters and tag chips |
| `--control-gap` | Shared 8px spacing between controls |
| `--control-padding`, `--icon-size` | Shared horizontal padding and icon dimensions |
| `--radius` | Shared UI corners; currently `0px`. Controls and surfaces inherit it through `--radius-control` and `--radius-surface` |
| `--space-*` | Spacing scale; derive intermediate sizes with `calc()` |
| `--surface-selected`, `--text-selected` | Consistent, theme-aware selected state |
| `--motion-fast`, `--motion-standard`, `--ease-out` | Interaction timing; honor reduced motion |
| `.pill`, `.icon-button`, `.search-field` | Shared interactive controls |
| `.container`, `.page-title`, `.filter-overlay` | Shared layout and page furniture |

New components use these tokens and primitives. Add a named token for a new
role instead of a literal size or color. Page-specific rules should only change
layout. Work cards preserve their original square image and gradient overlay;
hover feedback does not move or scale their hit area.

Interactive examples use `css/article-demo.css` and the same geometry, with a
semantic green accent for availability and friendship data. Preserve all graph,
slider, reset, and keyboard behavior when changing their presentation.

Reuse the 480px, 768px, and 1024px breakpoints (`--bp-sm`, `--bp-md`, `--bp-lg`).
CSS variables cannot be used directly in media query conditions, so these three
values are repeated there. Shared header, footer, and `<head>` markup lives in
`components/`; `build.py` injects it into the generated pages.

## Local Development

### Prerequisites

- Python 3.10+
- Pandoc (used by `pypandoc` to render Markdown)
- Poppler (`pdfinfo` and `pdftotext`) for PDF link titles; install `poppler-utils` on Debian/Ubuntu

### Setup

1. Install dependencies:
   ```bash
   pip install pyyaml markdown pypandoc
   ```

2. Build the works:
   ```bash
   python build.py
   ```

3. Serve locally (any static server):
   ```bash
   python -m http.server 8000
   ```

4. Visit `http://localhost:8000`

## Adding Content

Create a markdown file in `content/works/{type}/`:

- `content/works/blog/` - Blog posts
- `content/works/project/` - Projects
- `content/works/publication/` - Publications

### Frontmatter Format

```yaml
---
title: "Your Title"
subtitle: "Brief description"
date: 2024-01-15
type: blog
tags: [Tag1, Tag2]
thumbnail: /assets/thumbnails/your-image.png
---

Your markdown content here...
```

Then run `python build.py` to generate the HTML.

## Deployment (GitHub Pages)

### 1. Repository Setup

Push this code to your GitHub repository.

### 2. Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. The workflow will auto-deploy on push to `main`

### 3. Custom Domain (hunecke.dev)

1. The `CNAME` file is already configured
2. In your DNS provider, add:

   **Option A: A Records**
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **Option B: CNAME Record**
   ```
   CNAME -> mrstrenggeheim.github.io
   ```

3. In GitHub Pages settings:
   - Enter `hunecke.dev` as custom domain
   - Enable "Enforce HTTPS"

4. Wait for DNS propagation (up to 24 hours)

## License

MIT License - Florian Hunecke
