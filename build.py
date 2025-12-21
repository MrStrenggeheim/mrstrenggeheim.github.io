#!/usr/bin/env python3
"""
Build Script - Converts markdown content to static HTML pages
Usage: python build.py

This script:
1. Scans content/works/ for .md files
2. Parses YAML frontmatter for metadata
3. Converts markdown to HTML
4. Generates content/works.json index
5. Outputs HTML article pages to works/
"""

import os
import json
import re
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
from html.parser import HTMLParser
import socket

import yaml
import pypandoc

# Configuration
CONTENT_DIR = Path("content/works")
OUTPUT_DIR = Path("works")
INDEX_FILE = OUTPUT_DIR / "works.json"
LINK_CACHE_FILE = OUTPUT_DIR / "link_cache.json"
COMPONENTS_DIR = Path("components")

# Prism.js Theme - Change this to switch syntax highlighting theme
# Options: prism, prism-dark, prism-funky, prism-okaidia, prism-twilight, 
#          prism-coy, prism-solarizedlight, prism-tomorrow, prism-darcula
PRISM_THEME = "prism-darcula"


def load_component(name: str) -> str:
    """Load a component HTML file from the components directory."""
    path = COMPONENTS_DIR / name
    if path.exists():
        return path.read_text(encoding='utf-8')
    return f"<!-- Component {name} not found -->"


def load_header(active_page: str = '') -> str:
    """Load header component with active page highlighted.
    
    active_page: 'about', 'cv', or 'works'
    """
    header = load_component('_header.html')
    # Set active class for the current page
    header = header.format(
        active_about=' active' if active_page == 'about' else '',
        active_cv=' active' if active_page == 'cv' else '',
        active_works=' active' if active_page == 'works' else ''
    )
    return header


def load_footer() -> str:
    """Load footer component."""
    return load_component('_footer.html')


def load_head() -> str:
    """Load common head component (meta, favicon, theme script, CSS, JS)."""
    return load_component('_head.html')


class OpenGraphParser(HTMLParser):
    """Parse HTML to extract OpenGraph meta tags."""
    
    def __init__(self):
        super().__init__()
        self.og_data = {}
        self.title = None
        self.in_title = False
    
    def handle_starttag(self, tag, attrs):
        if tag == 'title':
            self.in_title = True
        if tag == 'meta':
            attrs_dict = dict(attrs)
            # OpenGraph tags
            if attrs_dict.get('property', '').startswith('og:'):
                prop = attrs_dict['property'][3:]  # Remove 'og:' prefix
                self.og_data[prop] = attrs_dict.get('content', '')
            # Twitter card fallbacks
            elif attrs_dict.get('name', '').startswith('twitter:'):
                prop = attrs_dict['name'][8:]  # Remove 'twitter:' prefix
                if prop not in self.og_data:
                    self.og_data[prop] = attrs_dict.get('content', '')
    
    def handle_data(self, data):
        if self.in_title:
            self.title = data.strip()
    
    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False


def load_link_cache() -> dict:
    """Load cached OpenGraph data from file."""
    if LINK_CACHE_FILE.exists():
        try:
            return json.loads(LINK_CACHE_FILE.read_text(encoding='utf-8'))
        except (json.JSONDecodeError, IOError):
            pass
    return {}


def save_link_cache(cache: dict):
    """Save OpenGraph cache to file."""
    LINK_CACHE_FILE.write_text(json.dumps(cache, indent=2), encoding='utf-8')


def fetch_opengraph(url: str, cache: dict) -> dict | None:
    """Fetch OpenGraph metadata from a URL with 3-second timeout.
    
    Returns dict with keys: title, description, image, or None on failure.
    Uses cache to avoid repeated fetches.
    """
    # Check cache first
    if url in cache:
        return cache[url]
    
    try:
        print(f"    Fetching OG data: {url}")
        req = Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (compatible; LinkPreview/1.0)',
                'Accept': 'text/html',
            }
        )
        # 3 second timeout
        socket.setdefaulttimeout(3)
        with urlopen(req, timeout=3) as response:
            # Only read first 50KB to find meta tags
            html = response.read(50000).decode('utf-8', errors='ignore')
        
        parser = OpenGraphParser()
        parser.feed(html)
        
        og_data = {
            'title': parser.og_data.get('title') or parser.title or '',
            'description': parser.og_data.get('description', ''),
            'image': parser.og_data.get('image', ''),
        }
        
        # Cache the result
        cache[url] = og_data
        return og_data
        
    except (URLError, HTTPError, socket.timeout, Exception) as e:
        print(f"    Failed to fetch OG data: {e}")
        cache[url] = None  # Cache the failure too
        return None


# Article HTML template
ARTICLE_TEMPLATE = """<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{subtitle}">
  <title>{title} - Florian Hunecke</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <script>
    (function() {{
      var stored = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));
    }})();
  </script>
  <!-- Prism.js for syntax highlighting -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/{prism_theme}.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/toolbar/prism-toolbar.min.css">
  <link rel="stylesheet" href="/css/style.css">
  <script src="/js/theme.js" defer></script>
  <script src="/js/toc.js" defer></script>
  <!-- MathJax for LaTeX math rendering -->
  <script>
    MathJax = {{
      tex: {{
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
      }},
      svg: {{
        fontCache: 'global'
      }}
    }};
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
  <!-- Prism.js scripts -->
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/toolbar/prism-toolbar.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js" defer></script>
  <script src="/js/code.js" defer></script>
</head>
<body>
  {header}

  <!-- Main Content -->
  <main class="main">
    <div class="container">
      <article class="article">
        <div class="article__main">
          <header class="article__header">
            <div class="article__banner">
              <img class="article__banner-img" src="{thumbnail}" alt="{title}">
              <div class="article__banner-overlay">
                <h1 class="article__title">{title}</h1>
                <div class="article__meta">
                  <span class="article__type">{type}</span>
                  <span>{date}</span>
                  <span>{reading_time} min read</span>
                </div>
                <div class="article__tags">
                  {tags_html}
                </div>
              </div>
            </div>
            {external_links_html}
          </header>
          <div class="article__content">
            {content}
          </div>
        </div>
        <aside class="article__toc">
          <p class="article__toc-title">On this page</p>
          <ul class="article__toc-list">
            <!-- TOC is generated by JS -->
          </ul>
        </aside>
      </article>
    </div>
  </main>

  {footer}
</body>
</html>
"""


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Parse YAML frontmatter from markdown content."""
    if not content.startswith("---"):
        return {}, content
    
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content
    
    try:
        frontmatter = yaml.safe_load(parts[1])
        body = parts[2].strip()
        return frontmatter or {}, body
    except yaml.YAMLError:
        return {}, content


def calculate_reading_time(content: str) -> int:
    """Calculate estimated reading time in minutes."""
    words = len(content.split())
    return max(1, round(words / 200))


def slugify(text: str) -> str:
    """Convert text to URL-safe slug."""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')


def format_date(date_obj) -> str:
    """Format date object to readable string."""
    if isinstance(date_obj, datetime):
        return date_obj.strftime("%b %d, %Y")
    elif isinstance(date_obj, str):
        try:
            dt = datetime.fromisoformat(date_obj)
            return dt.strftime("%b %d, %Y")
        except:
            return date_obj
    return str(date_obj)


def process_markdown(md_content: str) -> str:
    """Convert markdown to HTML using Pandoc with full extension support.
    
    Enables:
    - GFM (GitHub Flavored Markdown)
    - Fenced divs (::: name :::)
    - Footnotes
    - Math ($$, $)
    - Smart quotes
    
    Post-processes HTML to make code blocks compatible with Prism.js.
    """
    try:
        # Use markdown format with all extensions for maximum compatibility
        html = pypandoc.convert_text(
            md_content,
            'html',
            format='markdown+gfm_auto_identifiers+fenced_divs+footnotes+tex_math_dollars+smart+fenced_code_blocks+fenced_code_attributes',
            extra_args=['--no-highlight', '--mathjax']
        )
        
        # Post-process: Convert Pandoc's code block format to Prism-compatible format
        # Pandoc outputs: <div class="sourceCode"><pre class="python"><code class="sourceCode python">
        # or: <pre class="python">code</pre>
        # Prism expects: <pre><code class="language-python">code</code></pre>
        
        # Pattern 1: Full sourceCode div wrapper (Pandoc default)
        html = re.sub(
            r'<div class="sourceCode[^"]*"[^>]*>\s*<pre[^>]*>\s*<code class="sourceCode\s+(\w+)"[^>]*>(.*?)</code>\s*</pre>\s*</div>',
            r'<pre><code class="language-\1">\2</code></pre>',
            html,
            flags=re.DOTALL
        )
        
        # Pattern 2: Simple pre with class (--no-highlight mode)
        html = re.sub(
            r'<pre class="(\w+)">(.*?)</pre>',
            r'<pre><code class="language-\1">\2</code></pre>',
            html,
            flags=re.DOTALL
        )
        
        # Pattern 3: Pre with code but wrong class format
        html = re.sub(
            r'<pre><code class="sourceCode (\w+)"',
            r'<pre><code class="language-\1"',
            html
        )
        
        return html
    except Exception as e:
        print(f"Pandoc error: {e}")
        return f"<p>Error processing markdown: {e}</p>"


def build_works():
    """Main build function."""
    print("🔨 Building works...")
    
    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    # Load link cache for OpenGraph data
    link_cache = load_link_cache()
    
    # Collect all markdown files
    works = []
    
    for type_dir in ["blog", "project", "publication"]:
        type_path = CONTENT_DIR / type_dir
        if not type_path.exists():
            continue
        
        for md_file in type_path.glob("*.md"):
            print(f"  Processing: {md_file}")
            
            # Read and parse
            content = md_file.read_text(encoding="utf-8")
            frontmatter, body = parse_frontmatter(content)
            
            # Extract metadata
            title = frontmatter.get("title", md_file.stem.replace("-", " ").title())
            subtitle = frontmatter.get("subtitle", "")
            date = frontmatter.get("date", datetime.now().isoformat()[:10])
            tags = frontmatter.get("tags", [])
            thumbnail = frontmatter.get("thumbnail", "/assets/thumbnails/default.png")
            work_type = type_dir
            
            # Generate slug and URL
            # Use filename as slug source to ensure stable URLs regardless of title changes
            slug = slugify(md_file.stem)
            url = f"/works/{slug}.html"
            
            # Calculate reading time
            reading_time = calculate_reading_time(body)
            
            # Convert markdown to HTML
            html_content = process_markdown(body)
            
            # Generate tags HTML (clickable links to works page with tag filter)
            from urllib.parse import quote
            tags_html = "".join([
                f'<a href="/works.html?tags={quote(tag)}" class="article__tag">{tag}</a>'
                for tag in tags
            ])
            
            # Generate external links HTML with OpenGraph preview cards
            external_links = frontmatter.get("links", {})
            external_links_html = ""
            if external_links:
                from urllib.parse import urlparse
                import html
                links_items = []
                
                # Arrow SVG icon for external links
                arrow_svg = '<svg class="link-preview__arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>'
                
                # Fallback link icon SVG
                fallback_icon_svg = '<svg class="link-preview__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
                
                for name, link_url in external_links.items():
                    parsed = urlparse(link_url)
                    domain = parsed.netloc.lower()
                    scheme = parsed.scheme or 'https'
                    
                    # Check if it's a valid external URL
                    is_external = bool(domain) and scheme in ('http', 'https')
                    
                    # Try to fetch OpenGraph data only for external URLs
                    og_data = fetch_opengraph(link_url, link_cache) if is_external else None
                    
                    # Create favicon HTML with multi-level fallback chain:
                    # Google (64px) -> DuckDuckGo -> Link SVG icon
                    if is_external:
                        # DuckDuckGo favicon service (good transparent icons)
                        ddg_favicon_url = f"https://icons.duckduckgo.com/ip3/{domain}.ico"
                        # Google's favicon service with higher resolution (64px)
                        google_favicon_url = f"https://www.google.com/s2/favicons?domain={domain}&sz=64"
                        # Escape the SVG for use in JavaScript - replace quotes
                        svg_escaped = fallback_icon_svg.replace('"', '&quot;').replace("'", "\\'")
                        # Build onerror with proper escaping: first try DDG, then use SVG
                        onerror_handler = f"this.onerror=function(){{this.outerHTML='{svg_escaped}'}};this.src='{ddg_favicon_url}';"
                        favicon_html = f'<img class="link-preview__icon" src="{google_favicon_url}" alt="" onerror="{html.escape(onerror_handler, quote=True)}">'
                    else:
                        favicon_html = fallback_icon_svg
                    
                    # Check if we have rich OG data with an actual image
                    has_og_image = og_data and og_data.get('image', '').strip()
                    has_og_title = og_data and og_data.get('title', '').strip()
                    
                    if has_og_image:
                        # Rich preview card with OpenGraph image
                        og_title = html.escape(og_data.get('title', name)[:60])
                        og_desc = html.escape(og_data.get('description', '')[:100])
                        og_image = og_data.get('image', '')
                        
                        # Make relative image URLs absolute
                        if og_image and og_image.startswith('/'):
                            og_image = f"{scheme}://{domain}{og_image}"
                        
                        image_html = f'<img class="link-preview__image" src="{og_image}" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
                        desc_html = f'<span class="link-preview__desc">{og_desc}</span>' if og_desc else ''
                        
                        card = f'''<a class="link-preview" href="{link_url}" target="_blank" rel="noopener">
                            {image_html}
                            <div class="link-preview__content">
                                <span class="link-preview__title">{og_title}</span>
                                {desc_html}
                                <span class="link-preview__domain">{domain}</span>
                            </div>
                            {arrow_svg}
                        </a>'''
                    elif has_og_title:
                        # Has OG title but no image - use favicon + OG title
                        og_title = html.escape(og_data.get('title', name)[:60])
                        og_desc = html.escape(og_data.get('description', '')[:100])
                        desc_html = f'<span class="link-preview__desc">{og_desc}</span>' if og_desc else ''
                        domain_html = f'<span class="link-preview__domain">{domain}</span>' if is_external else ''
                        
                        card = f'''<a class="link-preview link-preview--fallback" href="{link_url}" target="_blank" rel="noopener">
                            {favicon_html}
                            <div class="link-preview__content">
                                <span class="link-preview__title">{og_title}</span>
                                {desc_html}
                                {domain_html}
                            </div>
                            {arrow_svg}
                        </a>'''
                    else:
                        # No OG data at all - use favicon + link name
                        domain_html = f'<span class="link-preview__domain">{domain}</span>' if is_external else ''
                        
                        card = f'''<a class="link-preview link-preview--fallback" href="{link_url}" target="_blank" rel="noopener">
                            {favicon_html}
                            <div class="link-preview__content">
                                <span class="link-preview__title">{html.escape(name)}</span>
                                {domain_html}
                            </div>
                            {arrow_svg}
                        </a>'''
                    
                    links_items.append(card)
                
                external_links_html = f'<div class="article__link-previews">{"".join(links_items)}</div>'
            
            # Generate article HTML
            article_html = ARTICLE_TEMPLATE.format(
                header=load_header('works'),
                footer=load_footer(),
                title=title,
                subtitle=subtitle,
                thumbnail=thumbnail,
                type=work_type,
                date=format_date(date),
                reading_time=reading_time,
                tags_html=tags_html,
                external_links_html=external_links_html,
                content=html_content,
                prism_theme=PRISM_THEME,
            )
            
            # Write article HTML file
            output_path = OUTPUT_DIR / f"{slug}.html"
            output_path.write_text(article_html, encoding="utf-8")
            print(f"  -> Generated: {output_path}")
            
            # Add to index
            works.append({
                "title": title,
                "subtitle": subtitle,
                "date": str(date),
                "type": work_type,
                "tags": tags,
                "thumbnail": thumbnail,
                "url": url,
                "readingTime": reading_time,
            })
    
    # Sort by date descending
    works.sort(key=lambda x: x["date"], reverse=True)
    
    # Write index JSON
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    INDEX_FILE.write_text(json.dumps(works, indent=2), encoding="utf-8")
    print(f"📋 Generated index: {INDEX_FILE} ({len(works)} works)")
    
    # Save link cache
    save_link_cache(link_cache)
    
    print("✅ Works build complete!")


# CV HTML Template
CV_TEMPLATE = """<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    {head}
    <meta name="description"
        content="Curriculum Vitae of Florian Hunecke - Education, Work Experience, and Achievements.">
    <title>CV - Florian Hunecke</title>
</head>

<body>
    {header}

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <section class="cv">
                <div class="cv__header">
                    <p class="page-title">Curriculum Vitae</p>
                </div>

{sections_html}
            </section>
        </div>
    </main>

    {footer}
</body>

</html>
"""


def build_cv():
    """Generate cv.html from content/cv.yaml."""
    print("🔨 Building CV...")
    
    cv_yaml_path = Path("content/cv.yaml")
    if not cv_yaml_path.exists():
        print("  ⚠️ content/cv.yaml not found, skipping CV generation")
        return
    
    cv_data = yaml.safe_load(cv_yaml_path.read_text(encoding="utf-8"))
    
    sections_html = ""
    for section in cv_data.get("sections", []):
        section_title = section.get("title", "")
        entries_html = ""
        
        for entry in section.get("entries", []):
            entry_title = entry.get("title", "")
            subentries = entry.get("subentries", [])
            
            rows_html = ""
            
            # Title row: (location or date) | title
            entry_meta = ""
            if entry.get("location"):
                entry_meta = f'<p class="cv__location">{entry["location"]}</p>'
            elif entry.get("date"):
                entry_meta = f'<p class="cv__date">{entry["date"]}</p>'
            
            rows_html += f'''
                        <div class="cv__entry-row">
                            {entry_meta}
                            <h3 class="cv__title">{entry_title}</h3>
                        </div>'''
            
            # Subtitle rows: (date or location) | subtitle + description/items
            for sub in subentries:
                sub_meta = ""
                if sub.get("date"):
                    sub_meta = f'<p class="cv__date">{sub["date"]}</p>'
                elif sub.get("location"):
                    sub_meta = f'<p class="cv__location">{sub["location"]}</p>'
                
                sub_content = ""
                if sub.get("subtitle"):
                    sub_content += f'<p class="cv__subtitle">{sub["subtitle"]}</p>'
                if sub.get("description"):
                    sub_content += f'<p class="cv__description">{sub["description"]}</p>'
                if sub.get("items"):
                    items_html = ""
                    for item in sub["items"]:
                        if isinstance(item, dict):
                            items_html += f'<li><a href="{item["link"]}">{item["text"]}</a></li>'
                        else:
                            # Convert markdown links [text](url) to HTML
                            import re
                            item_html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', item)
                            items_html += f'<li>{item_html}</li>'
                    sub_content += f'<ul class="cv__list">{items_html}</ul>'
                
                rows_html += f'''
                        <div class="cv__entry-row">
                            {sub_meta}
                            <div class="cv__content">{sub_content}</div>
                        </div>'''
            
            entries_html += f'''
                    <article class="cv__entry">{rows_html}
                    </article>'''
        
        sections_html += f"""
                <!-- {section_title} -->
                <section class="cv__section">
                    <h2 class="cv__section-title">{section_title}</h2>
{entries_html}                </section>
"""
    
    # Generate final HTML
    cv_html = CV_TEMPLATE.format(
        head=load_head(),
        header=load_header('cv'),
        footer=load_footer(),
        sections_html=sections_html
    )
    
    # Write to cv.html
    output_path = Path("cv.html")
    output_path.write_text(cv_html, encoding="utf-8")
    print(f"  -> Generated: {output_path}")
    print("✅ CV build complete!")


# Static pages configuration: (source_file, output_file, active_page)
STATIC_PAGES = [
    ("src/index.html", "index.html", "about"),
    ("src/works.html", "works.html", "works"),
    ("src/404.html", "404.html", ""),
]


def build_static_pages():
    """Build static HTML pages from src/ templates with component injection."""
    print("🔨 Building static pages...")
    
    src_dir = Path("src")
    if not src_dir.exists():
        print("  ⚠️ src/ directory not found, skipping static pages")
        return
    
    for src_file, output_file, active_page in STATIC_PAGES:
        src_path = Path(src_file)
        if not src_path.exists():
            print(f"  ⚠️ {src_file} not found, skipping")
            continue
        
        # Read template
        template = src_path.read_text(encoding="utf-8")
        
        # Inject components
        html = template.format(
            head=load_head(),
            header=load_header(active_page),
            footer=load_footer()
        )
        
        # Write output
        output_path = Path(output_file)
        output_path.write_text(html, encoding="utf-8")
        print(f"  -> Generated: {output_path}")
    
    print("✅ Static pages build complete!")


if __name__ == "__main__":
    build_works()
    build_cv()
    build_static_pages()
    print("\n🎉 All builds complete!")
