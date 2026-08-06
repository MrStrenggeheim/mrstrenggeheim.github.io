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

All styles live in `css/style.css`. To stop pages from drifting apart visually,
it has a **SHARED UI PRIMITIVES** section holding one definition per control:

| Primitive | Use for |
| --- | --- |
| `.container` | Page content wrapper (max width + padding) |
| `.page-title` | The heading at the top of a page |
| `.pill` | Filter and tag buttons (`.pill--spaced`, `.pill--filled`) |
| `.search-field` | Text input with a trailing clear button |
| `.icon-button` | Compact icon-and-label button |
| `.filter-overlay` | Slide-in filter panel with backdrop |

When building a new page:

1. **Use the primitive class in the markup.** Do not invent a new class that
   restates the same colours, borders or type.
2. **Legacy page-specific names** (the `.works__*` set) are attached to the
   primitives as grouped selectors, so there is still only one place that
   defines the look. If you must keep a bespoke name, add its selector to the
   existing group — never copy the declarations.
3. **Page-specific rules may only change layout** — margins, widths, grid.
   Colour, border, and typography come from the primitive.
4. **Never hard-code a colour or size.** Use the tokens in `:root`
   (`--accent`, `--space-md`, `--font-size-sm`, `--control-height`, …). If a
   value is missing, add a token rather than a literal.
5. **Reuse breakpoints.** `--bp-sm` 480px, `--bp-md` 768px, `--bp-lg` 1024px.
   The filter overlay snaps at 1024px on both the works and bufo pages.

Shared page furniture (header, footer, `<head>`) lives in `components/` and is
injected by `build.py`, so editing it once updates every page.

## Local Development

### Prerequisites

- Python 3.8+

### Setup

1. Install dependencies:
   ```bash
   pip install pyyaml markdown
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
