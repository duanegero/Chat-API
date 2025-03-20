# Chat API & Database

This is a RESTful API and database designed to handle requests from the Chat frontend app, Postman, or cURL. The database stores user information, including login credentials, and supports all CRUD operations.

- [Installation](#installation)
- [Docker](#docker)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Frontend Repository](#frontend)
- [Socket.IO Repository](#socket)

## Installation

1. Clone Repository:<br>
   `git clone https://github.com/duanegero/Chat-API.git`
2. Navigate to the Project Directory
3. Proceed to Docker for next steps.

## Docker

1. **CREATE DOCKER NETWORK!** - Before proceeding with the containers, you need to create a Docker network. This network allows the containers to communicate with each other. Run the following command to create the network:  
   `docker network create Chat-Network`
2. **Verify the Network Creation** - After creating the network, you can verify that it exists by listing the available networks with this command:
   `docker network ls`
3. **Build and Start the Docker Container** - To build the Docker container and start the services defined in the docker-compose.yml file, run the following command:
   `docker-compose up --build`
4. **Verify the Container Creation** - After building and running the container, you can verify that it is up and running with the following command:
   `docker ps`
5. **Shut Down the Docker Containers** - Once you're done with using the containers, you can stop and remove the containers with the following command:
   `docker-compose down`

## API Endpoints

- **POST** `/login` - Endpoint for users to log into frontend app
- **POST** `/users` - Endpoint to create new user in database
- **GET** `/users` - Endpoint for getting all users in database
- **GET** `/users/:id` - Endpoint for getting single user from database
- **GET** `/users/forgot-password/:email` - Endpoint for users to initiate a password reset process by providing their registered email
- **PUT** `/users/update/:username` - Endpoint for users to update their username
- **PUT** `/users/:id` - Endpoint for users to update their user details
- **PUT** `/users/email/:id` - Endpoint for users to update their email
- **DELETE** `/users/:id` - Endpoint to delete user by unique ID

## Usage

Once the Docker network and container are up and running, you can interact with the API and database using the available endpoints. Below is an example of how to create a new user using the /users POST endpoint with Postman or any other HTTP client:

### Example Request (POST `/users`)

```
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "email@email.com",
    "age": 30,
    "username": "john123",
    "password": "password123"

}
```

The API will generate a unique User ID and a `created_at` timestamp automatically upon successful user creation.

## Frontend

## Socket

The Socket.IO server can be found can be found here

https://github.com/duanegero/Chat-Socket.git

For more information, please refer to the Socket.IO documentation for details on setting up and connecting to the socket server, as well as available events and usage examples.
