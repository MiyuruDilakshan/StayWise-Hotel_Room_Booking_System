Client scaffold (React + Vite)

This client provides a minimal React + Vite skeleton with some placeholder routes.

Quick start (Windows `cmd.exe`):

1. Open `client` folder
2. Install dependencies:

```
cd client
npm install
```

3. Start dev server:

```
npm run dev
```

Notes for team members:
- Add pages under `client/src/pages` (create folder) and extend routes in `App.jsx`
- Use `axios` to call backend API (`/api/*`) and `socket.io-client` for real-time updates
- For production builds, run `npm run build` and serve the `dist` folder
