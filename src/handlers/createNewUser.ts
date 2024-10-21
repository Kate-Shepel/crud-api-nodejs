import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/usersDB.js';
import { extractRequestBody } from './getUsers.js';

export const createNewUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const requestBody = await extractRequestBody(request);

    if (!requestBody) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Please add POST request body for a new user: username, age, and hobbies' }));
      return;
    }

    const { username, age, hobbies } = JSON.parse(requestBody);

    if (!username || typeof username !== 'string' || !age || typeof age !== 'number' || !Array.isArray(hobbies)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Invalid request data. Please provide username, age, and hobbies for a new user.' }));
      return;
    }

    const newUser = {
      id: uuidv4(),
      username,
      age,
      hobbies
    };

    users.push(newUser);

    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newUser));
  } catch (err) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Server error' }));
  }
};