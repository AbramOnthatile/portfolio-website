# Abram Mohlamonyane Portfolio

React portfolio built with Vite, React Router, Bootstrap 5, React Bootstrap, and Bootstrap Icons. It is configured for Vercel deployment; the app uses hash URLs for client-side routes.

## Development

Requirements: Node.js 20.19+ and npm.

```bash
npm install
npm run dev
```

## Vercel deployment

```bash
npm run build
```

Import this repository into Vercel using the project root. [vercel.json](./vercel.json) sets the build command, `dist/` output directory, and the chatbot function's 30-second maximum duration. Vercel detects the `api/chat.js` Node.js Function automatically. The site uses `HashRouter`, so no SPA rewrite is needed and `/api/chat` remains available to the function.

### AI portfolio assistant

In Vercel, open **Project Settings → Environment Variables** and add:

- `OPENAI_API_KEY` — required; keep it server-side and do not prefix it with `VITE_`.
- `OPENAI_MODEL` — optional; defaults to `gpt-4o-mini`.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — optional but recommended for shared, cross-instance rate limiting. Without these, a per-instance in-memory limit of 15 requests per IP every 10 minutes is used. If Upstash is configured but unreachable, chat requests fail closed.

Select the appropriate environments (Production, Preview, and Development), save, and redeploy after adding or changing variables. The API endpoint is `/api/chat`; a `GET` request reports whether `OPENAI_API_KEY` is present, but does not validate the key with OpenAI. To exercise the API locally, use `npx vercel dev` rather than Vite's static dev server, then send a chat question to verify a real provider response.

Chat messages and public portfolio knowledge are sent to OpenAI to generate answers. Visitors should avoid sharing sensitive information in the chat.

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