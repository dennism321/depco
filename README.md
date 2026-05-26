# Comfort Depco Solutions — Website

Business website for **Comfort Depco Solutions**, a plumbing, heating, and electrical company based in Plainville, CT.

## Project Structure

```
├── index.html        ← Main page (single-page site)
├── css/
│   └── style.css     ← All styles (responsive, no external deps)
├── js/
│   └── main.js       ← Navigation, scroll effects, form handling
└── README.md
```

## Deploying to GitHub Pages

This is a static site — no build step required. Follow these steps to go live:

### Step 1 — Push to GitHub

If you haven't already:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Open your repository on GitHub
2. Go to **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set **Branch** to `main` and folder to `/ (root)`
5. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

GitHub typically deploys within 1–2 minutes. You can check the build status under **Actions**.

### Step 3 — Custom Domain (optional)

To use a custom domain (e.g. `www.comfortdepco.com`):

1. In **Settings → Pages**, enter your domain under **Custom domain**
2. Add a `CNAME` file to the repo root containing just your domain:
   ```
   www.comfortdepco.com
   ```
3. Update your DNS provider to point to GitHub Pages:
   - Add a `CNAME` record: `www` → `YOUR_USERNAME.github.io`
   - Or `A` records pointing to GitHub's IPs (see GitHub docs)

## Customization Checklist

Before going live, update the following placeholders in `index.html`:

- [ ] `(860) 555-0100` → real phone number (search and replace all)
- [ ] `Plainville, CT 06062` → full street address
- [ ] Business hours (if different from Mon–Fri 7am–6pm, Sat 8am–4pm)
- [ ] Service area towns (add or remove as needed)
- [ ] Stats: years in business, customer count
- [ ] Form submission — currently shows a success message client-side only.
      To actually receive form submissions, integrate a service like
      [Formspree](https://formspree.io) (free tier) or [Web3Forms](https://web3forms.com)
      by adding `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag
      and removing the JavaScript submit handler.

## No Third-Party Dependencies

This site uses zero external libraries — no CDN, no npm packages, no tracking pixels.
Everything runs from the two files in `css/` and `js/`.
