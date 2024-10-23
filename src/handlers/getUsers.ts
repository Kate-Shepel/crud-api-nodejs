import { IncomingMessage, ServerResponse } from 'http';
import { validate as isUuid } from 'uuid';

import { users } from '../data/usersDB.js';

export const getUsers = (request: IncomingMessage, response: ServerResponse) => {
  const pathSegments = request.url?.split('/');

  if (pathSegments && pathSegments.length === 4 && pathSegments[3]) {
    const userId = pathSegments[3];

    if (!isUuid(userId)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Invalid user id format. Must be UUID.' }));
      return;
    }

    const userToShow = users.find((el) => el.id === userId);

    if (userToShow) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(userToShow));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: `User with id ${userId} not found.` }));
    }
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  }
};

export const extractRequestBody = (request: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      resolve(body);
    });
    request.on('error', (err) => {
      reject(err);
    });
  });
};
