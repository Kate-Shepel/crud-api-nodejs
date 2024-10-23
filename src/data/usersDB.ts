import { v4 as uuidv4 } from 'uuid';

import { User } from '../types/User.js';

export const users: User[] = [
  { id: uuidv4(), username: 'Alice', age: 28, hobbies: ['piano', 'chess'] },
  { id: uuidv4(), username: 'Bob', age: 34, hobbies: ['running', 'painting'] },
  { id: uuidv4(), username: 'Charlie', age: 22, hobbies: ['coding', 'gaming'] },
  { id: uuidv4(), username: 'Diana', age: 77, hobbies: ['photography', 'yoga'] },
];
