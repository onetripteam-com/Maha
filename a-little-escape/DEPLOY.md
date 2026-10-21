# Deploy MAHA — A Little Escape

Repository: `onetripteam-com/Maha`; project folder: `a-little-escape/`.

## GitHub Pages (existing repo)
1. In GitHub open the repository > **Settings > Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**; select **main** and **/(root)**.
3. Save and wait for GitHub's own publish status. The new project should be available at `https://onetripteam-com.github.io/Maha/a-little-escape/`.
4. Because the previous website lives in the repository root, publishing `main` from root keeps its URL working too.
5. For any failed preview check **Actions** > Pages deployment, then confirm the Pages build source and branch.

## Netlify
Import the GitHub repo; set **publish directory** to `a-little-escape`; no build command required. Root-relative assets are not used; this site is path-safe.

## Before publishing to Maha
Review copy under `content/`, especially procedure-related content. The default procedure date is null, so the layer is off.
Open on HTTPS. Offline service worker features do not run from a local file URL. No secret tokens or private medical details should be included in a public GitHub repository.
