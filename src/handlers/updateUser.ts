import { IncomingMessage, ServerResponse } from 'http';
import { validate as isUuid } from 'uuid';
import { users } from '../data/usersDB.js';
import { extractRequestBody } from './users.js';

export const updateUser = async (request: IncomingMessage, response: ServerResponse) => {
  const urlParts = request.url?.split('/');

  if (urlParts && urlParts.length === 4 && urlParts[3]) {
    const userId = urlParts[3];

    if (!isUuid(userId)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Invalid user id format. Must be UUID.' }));
      return;
    }

    const userToUpdate = users.find((el) => el.id === userId);

    if (!userToUpdate) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: `User with id ${userId} wasn't found.` }));
      return;
    }

    const requestBody = await extractRequestBody(request);

    if (!requestBody) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Please add PUT request body to update the user: username, age, and hobbies' }));
      return;
    }

    const { username, age, hobbies } = JSON.parse(requestBody);

    if (!username || typeof username !== 'string' || !age || typeof age !== 'number' || !Array.isArray(hobbies)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Invalid request data. Please provide valid username, age, and hobbies for the user.' }));
      return;
    }

    userToUpdate.username = username;
    userToUpdate.age = age;
    userToUpdate.hobbies = hobbies;

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(userToUpdate));
  } else {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Invalid request URL. Please use /api/users/{userId} format.' }));
  }
};