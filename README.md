# Abram Mohlamonyane Portfolio

React portfolio built with Vite, React Router, Bootstrap 5, React Bootstrap, and Bootstrap Icons. The router uses hash URLs so the app works on static GitHub Pages hosting.

## Development

Requirements: Node.js 20.19+ and npm.

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. Deploy that directory to the `gh-pages` branch or configure GitHub Pages to publish it. The build uses the repository path `/portfolio-website/`; `404.html` redirects older clean portfolio URLs into the matching hash route.

The contact form continues to submit through FormSubmit at `https://formsubmit.co/ajax/onthatileabram@gmail.com`; actual delivery depends on that service and its recipient verification.