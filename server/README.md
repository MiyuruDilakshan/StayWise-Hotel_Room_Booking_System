Server (backend) scaffold

What this provides:
- Express server with basic auth (register/login) endpoints
- Mongoose DB connection helper
- Socket.IO initializer for booking events
- Placeholder rooms routes to be extended by team members

Quick start (Windows `cmd.exe`):

1. Open `server` folder
2. Create `.env` from `.env.example` and set `MONGO_URI` and `JWT_SECRET`
3. Install dependencies:

```
cd server
npm install
```

4. Start server (development with auto-reload):

```
npm run dev
```

Notes for team members:
- Add models for `Room`, `Booking`, etc. under `server/src/models`
- Add routes under `server/src/routes` and mount them in `src/index.js`
- Use the socket event `bookingCreated` to notify other clients about new bookings
- Authentication uses JWT; protect routes by validating `Authorization: Bearer <token>` header
