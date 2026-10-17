# Maha's Little Elsewhere 🌸

A mobile-first interactive friendship world created for Maha.

## Website files

This repository is being prepared to host the **Director's Cut V2** static website on GitHub Pages. It contains HTML, CSS, JavaScript, SVG art, letters, cinema and mini games.

### One-time import

An import workflow in `.github/workflows/import-site.yml` can unpack the official `Mahas_Little_Elsewhere_Directors_Cut_v2.zip` archive into the root of this repository. Upload that ZIP using **Add file → Upload files** and commit it to `main`. The workflow will then unpack its `mahas-little-elsewhere/` directory and commit the real site files.

After that, in **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/(root)` and save. Depending on your GitHub plan, GitHub Pages may require a public repository; do not change the repository visibility without checking the privacy implications.

Before sharing, review `js/content.js` to ensure the personal note is suitable for a public website. The site does not use third-party analytics or require accounts.
