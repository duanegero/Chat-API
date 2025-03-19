# Chat API & Database

This is a RESTful API and database designed to handle requests from the Chat frontend app, Postman, or cURL. The database stores user information, including login credentials, and supports all CRUD operations.

- [Installation](#installation)
- [Docker](#docker)
- [API Endpoints](#api-endpoints)
- [Frontend Repository](#frontend)
- [Socket.IO Repository](#socket)
- [Usage](#usage)

## Installation

1. Clone Repository:<br>
   `git clone https://github.com/duanegero/Chat-API.git`
2. Navigate to the Project Directory
3. Install Dependencies:<br>
   `npm install`

## Docker

1. CREATE DOCKER NETWORK! - Before proceeding with the containers, you need to create a Docker network. This network allows the containers to communicate with each other. Run the following command to create the network:  
   `docker network create Chat-Network`
2. Verify the Network Creation - After creating the network, you can verify that it exists by listing the available networks with this command:
   `docker network ls`
3. Build and Start the Docker Container - To build the Docker container and start the services defined in the docker-compose.yml file, run the following command:
   `docker-compose up --build`
4. Verify the Container Creation - After building and running the container, you can verify that it is up and running with the following command:
   `docker ps`
5. Shut Down the Docker Containers - Once you're done with using the containers, you can stop and remove the containers with the following command:
   `docker-compose down`
