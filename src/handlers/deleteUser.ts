import { IncomingMessage, ServerResponse } from 'http';
import { validate as isUuid } from 'uuid';

import { users } from '../data/usersDB.js';

export const deleteUser = (request: IncomingMessage, response: ServerResponse) => {
  const pathSegments = request.url?.split('/');

  if (pathSegments && pathSegments.length === 4 && pathSegments[3]) {
    const userId = pathSegments[3];

    if (!isUuid(userId)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Invalid user id format. Must be UUID.' }));
      return;
    }

    const userToDeleteId = users.findIndex((el) => el.id === userId);

    if (userToDeleteId === -1) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: `User with the following id: ${userId} wasn't found.` }));
      return;
    }

    users.splice(userToDeleteId, 1);

    response.writeHead(204);
    response.end();
  } else {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Invalid request URL. Please use /api/users/{userId} format.' }));
  }
};
