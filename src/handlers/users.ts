import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../data/usersDB.js';
import { validate as isUuid } from 'uuid';

export const getUsers = (request: IncomingMessage, response: ServerResponse) => {
  const urlParts = request.url?.split('/');

  if (urlParts && urlParts.length === 4 && urlParts[3]) {
    const userId = urlParts[3];

    if (!isUuid(userId)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Invalid userId format. Must be UUID.' }));
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