import dotenv from 'dotenv';
import { createServer, IncomingMessage, ServerResponse } from 'http';

import { getUsers } from '../handlers/getUsers.js';
import { updateUser } from '../handlers/updateUser.js';
import { createNewUser } from '../handlers/createNewUser.js'
import { deleteUser } from '../handlers/deleteUser.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const requestListener = async (request: IncomingMessage, response: ServerResponse) => {
  console.log(`Received request: ${request.method} ${request.url}`);

  if (request.url?.startsWith('/api/users') && request.method === 'GET') {
    getUsers(request, response);
  } else if (request.url === '/api/users' && request.method === 'POST') {
    createNewUser(request, response);
  } else if (request.url?.startsWith('/api/users') && request.method === 'PUT') {
    updateUser(request, response);
  } else if (request.url?.startsWith('/api/users') && request.method === 'DELETE') {
    deleteUser(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Route not found' }));
  }
};

const server = createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});

export default server;