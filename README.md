# Louder - AI Event Concierge

A modern AI-powered event venue recommendation platform built with React frontend and Node.js backend.

## Quick Start

### Option 1: Docker (Recommended)

1. Create a `.env` file in the root directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
```

2. Run the application:
```bash
docker-compose up
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Option 2: Local Development

#### Backend Setup
```bash
cd louder-backend/louder-nest-backend
# Create .env file with GEMINI_API_KEY and MONGODB_URI
npm install
npm run start:dev
```

#### Frontend Setup
```bash
cd louder-frontend
npm install
npm run dev
```

## Environment Variables Required

- `GEMINI_API_KEY`: Your Google Gemini API key
- `MONGODB_URI`: MongoDB connection string

## Access Points

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
