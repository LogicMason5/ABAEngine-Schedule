# MERN-Exam

Develop a simple App for us using ReactJS, Node, Express and MongoDB(it is ok to use a different database if you don't know MongoDB).

## Requirements

The App should have a UI portion and an API.  

The API should speak JSON and provide endpoints to accomplish the following:

Create a new user (username, password, first name, last name and email). The response should return the user id

Sign in the user (via username and pass). The response should return a session token

Fetch user data, i.e. GET /user/123 (authorize by token)

Delete the user's session. The response should be 200 and the token should no longer be honored

The UI should make it possible to do the API functionality mentioned above. Also we should be able to see a list of users as well as an individual user record. 

## Clone Repository
`git clone https://github.com/gilosmichaelcodev/MERN-Exam.git`

## Installation

`cd MERN-Exam`

`npm install`

*We need to configure the react client*

`cd client` (inside MERN-Exam)

`npm install`

`npm run build` (this will build the files the server will serve)

## Running App
cd back to MERN-Exam

`npm start`

## Running Test
`npm test`