# PeerJS Server for Voice Calls

## Deploy on Railway

1. Create a new Railway project
2. Connect this repository or upload these files
3. Railway will automatically detect the Node.js project
4. Set environment variables if needed
5. Deploy!

## Deploy on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Deploy!

## Environment Variables

- `PORT`: Automatically set by Railway/Render
- `NODE_ENV`: Set to `production` for production deployments

## Local Development

```bash
npm install
npm run dev
```

Server will run on http://localhost:9000

## Usage

Your PeerJS server will be available at:
- **Railway**: `https://your-app.railway.app/peer`
- **Render**: `https://your-app.onrender.com/peer`

Use this URL in your frontend PeerJS configuration.