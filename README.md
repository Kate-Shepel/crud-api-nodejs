# CRUD API

## Description

This project implements a simple CRUD API using an in-memory database. The API allows users to create, read, update, and delete user records via the /api/users endpoint. It is developed using Node.js (version 22.9.0) and supports both development and production modes. The app handles error cases such as invalid UUIDs, missing request data, and non-existent endpoints with appropriate status codes.

## Before the start

- Install [Node.js](https://nodejs.org/en/download/package-manager) (version 22.9.0 or higher)
- Clone this repository: https://github.com/Kate-Shepel/crud-api-nodejs
- Switch to `dev` branch
- To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)

## Application start

The app can be started by the following npm-scripts:

- Production mode
    `npm run start:prod`

- Development mode
    `npm run start:dev`

## To check the app

To test the application, you can use [Postman Desktop Agent](https://www.postman.com/downloads/postman-agent/) or any similar API testing tool. The server runs on port 4000, and the endpoint is available at
    `http://localhost:4000/api/users`

**Please note:** For convenience, the in-memory database is pre-populated with 4 default users when the server starts.

1. Implemented operations:
    - **GET** `api/users` is used to get all persons
        - Server should answer with `status code` **200** and all users records
    - **GET** `api/users/{userId}` 
        - Server should answer with `status code` **200** and record with `id === userId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

## Body example for POST/PUT requests to create or update a user

```bash
{
  "username": "Samanta",
  "age": 40,
  "hobbies": ["sleeping", "swimming"]
}
```