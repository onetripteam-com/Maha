# Publish Maha's Little Elsewhere with GitHub Pages

## Easiest route: desktop browser

1. Download and **extract the complete ZIP** first.
2. Sign in at [github.com](https://github.com) and choose **New repository**.
3. Name it `mahas-little-elsewhere` (or any name you like). For a free public Pages site, choose **Public**. Don't put private information in it.
4. Create the repository. On its **Code** tab choose **Add file → Upload files**. Upload the **contents of the extracted folder**, not the ZIP file itself. Preserve `js/` and `assets/` directories. If your browser supports dragging folders, drag the full selected contents into the uploader. Commit the upload.
5. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, `main`, `/(root)`, then **Save**.
6. After deployment finishes, the site should be at:

   `https://YOUR-USERNAME.github.io/mahas-little-elsewhere/`

   Use the repository's exact name in the URL. Check the **Settings → Pages** panel for the actual published link.
7. Open the published URL on your own phone first, test all important sections, then share the link over WhatsApp.

The site needs **no npm, no framework and no build process**. The top-level `index.html` must stay at the repository root. Relative links are deliberately used so that normal project-site subpaths work.

## On a phone

GitHub's website uploader can handle individual files but preserving two folders (`js/` and `assets/`) is difficult on some mobile browsers. If possible, do the first upload from a laptop or desktop. If you must use only a phone, switch your browser to desktop-site mode and make sure every file retains its original path. **Do not upload just the ZIP**, as GitHub Pages will not automatically unpack it. Verify the `assets/` and `js/` folders exist after the commit.

## Updating a letter or a joke later

Go to `js/content.js` in the repository, click the pencil/Edit control, change the desired paragraph (preserving JavaScript quotes, commas and brackets), and commit. GitHub Pages will update after the new deployment. Browsers with an older cache may need a refresh; the service worker is designed to refresh its cached site files.

## Quick phone checklist

- The envelope opens and the illustrated town appears.
- Bottom navigation scrolls sideways if all eight destinations aren't visible.
- Bouquet stems can be added, saved, reset and still appear after reopening the page.
- Postcard writing is readable after flipping; the gallery swipes horizontally.
- Letters open in a modal and close correctly.
- Cinema can play, pause, advance and replay.
- The three games start and finish without trapping scrolling.
- Sound starts **only** after tapping the sound control, and can be turned off.
- No content is covered by the phone notch or bottom controls; try portrait and landscape.

## If something looks wrong

- **Blank page:** ensure `index.html` is at the repo root and Pages uses `main / (root)`.
- **Missing illustration/styles:** check the case-sensitive `assets/`, `js/`, and `styles.css` paths; uploading a flattened list of files breaks the site.
- **Changes don't appear:** confirm Pages has redeployed, then refresh or reopen the site. You can also clear that site's stored data as a last resort, but this clears saved bouquets and notes.
- **Music is silent:** tap **Sound off**. iOS/browser media policies require direct user interaction and sometimes silent mode/device volume settings matter.
- **Save data disappeared:** it lives only in the browser profile. Private mode, changing browsers or clearing site data can remove it.

Official docs: [GitHub Pages creation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [publishing from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
