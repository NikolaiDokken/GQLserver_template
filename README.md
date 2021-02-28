# GraphQL Server Template
A GraphQL server setup with a basic user object. The server connects to a MongoDB database using mongoose. JWT is used for authentication.

### Table of Contents  
1. [Project Structure](#project-structure)  
2. [Installation](#setup-and-installation)  

## Project Structure  
The project consists of the following files and folders:
* index.js
* schema
* models
* package.json

In addiditon to this, you will need a .env file. See installation on how this should look.

## Setup and Installation
1. Clone this project
2. cd into the project folder
3. run `npm i` in the terminal

Before we run the server, you will need a `.env` file. It will contain credentials to your MongoDB database. In the `.env` file, paste the following, and replace the placeholder values, with a MongoDB username and password, and the name of the database you wish to connect to.

```
DB_USER="insert username here"
DB_DATABASE="insert database name here"
DB_PASSWORD="insert password here"
```
You are now ready to run the server:
4. Run `npm start` in the terminal

The server should now be running.

