# Vajram

Website revamp for **Vajram Antiques & Gardens**.

This repository contains the new site design, imported from Claude Design
(project `464b3a17-a518-4862-a1a9-7d55562871f2`, file `Vajram.dc.html`).

## Contents

- `index.html` — the revamped site. It is a self-contained Claude Design
  bundle (all styles, scripts, and images are inlined), so it renders
  standalone with no build step or external assets.

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```sh
python -m http.server 8000
# then visit http://localhost:8000
```

> Note: `index.html` is a bundled export (~27 MB) and requires JavaScript
> to render.
