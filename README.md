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

## Projects Without a Live Demo

These projects run locally rather than from a hosted demo. Use Python 3 for the standalone programs. Download and extract the ZIP linked in each repository, open a terminal in the extracted project folder, and run:

| Project | Repository | Desktop command |
| --- | --- | --- |
| Sudoku solver | [soduko](https://github.com/AbramOnthatile/soduko) | `python solve.py` |
| UNO game | [uno](https://github.com/AbramOnthatile/uno) | `python uno.py` |
| Spam Detect | [spamDectect](https://github.com/AbramOnthatile/spamDectect) | `python spam.py` |
| Banking application | [bankBanking](https://github.com/AbramOnthatile/bankBanking) | `python banking.py` |

Run Spam Detect from the extracted `spam-detection-main` folder so its `emails` directory remains available to the program.

UniDigital is a local web application, not a hosted demo. Follow the [repository README](https://github.com/SandileSibiya/Project3-UniDigital) to start MySQL, configure the database in `application.properties`, run the Spring Boot backend from an IDE, and open one of the frontend HTML files from the `static` folder in a browser.