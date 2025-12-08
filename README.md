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
├── css/style.css       # All styles
├── js/                 # JavaScript modules
├── content/works/      # Markdown source files
├── works/              # Generated HTML articles
└── build.py            # Build script
```

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
