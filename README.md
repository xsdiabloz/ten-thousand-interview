# ten-thousand-interview

Installation & Running

You can run the client and server separately or start them both at once from the root directory.

Option 1: Run Everything Together (Recommended)
If you are in the root folder, use the pre-configured script to launch both services simultaneously:

npm run dev

This uses concurrently to orchestrate both the Backend (Port 4000) and Frontend (Port 5173).

Option 2: Run Separately
To start the Backend (Server):

cd backend
npm install
npm run dev

To start the Client (Frontend):
If you are already in the backend folder, move to the frontend first:

cd ../frontend
npm install
npm run dev

Access Points
Frontend: http://localhost:5173
GraphQL Playground: http://localhost:4000/graphql (or your backend port)
