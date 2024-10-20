import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../data/usersDB.js';

export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};