# E-Commerce Website

 By: Priya Gill, Maryam Ahmadi Tabatabaei and Natalie Lewis

If the Docker code is not working optimally, please try running locally using our github repo and local application run steps. It was a learning curve to try and set up Docker, we hope it works smoothly. 

## Installation (for local development)
### Prerequisites:
- Node.js (v18+ recommended)  
- npm (comes with Node.js)  
- Java 17+ 
- Maven (for building the Spring Boot backend)
- MySQL Server: version 8
- MySQL Workbench
- Docker & Docker Compose (for containerized setup)

### Install Maven:
Execute in terminal:
- curl -s "https://get.sdkman.io/" | bash
- source "$HOME/.sdkman/bin/sdkman-init.sh"
- Sdk install maven 

## Run With Docker Setup:
1) Please ensure that no other applications are running on ports **3000**, **8080**, and **3306** before starting the application.
2) Begin by cloning GitHub repo: https://github.com/priyagill0/e-commerce/tree/docker-deployment 
**(docker-deployment branch)**

3) Please execute the following command in the project root folder 
(it covers everything):
- `docker-compose up`
  
This command starts the application by automatically pulling the prebuilt frontend, backend, and database images from dockerhub, creating containers for each service, and running them together so that they can all communicate together. 

3) Please use the front-end url to access the site: http://localhost:3000 . Backend url: http://localhost:8080 Database url: http://localhost:3306  

4) Feel free to log in to one of our test users (listed at the end of this document).

If you would like to pull the images manually from Docker Hub, please follow these steps:
- `docker pull priyagill16/ecommerce-frontend:latest`
- `docker pull priyagill16/ecommerce-backend:latest`
- `docker pull mysql:8`
- `docker volume create mysql-data`
- `docker-compose up`

Note: To start with a fresh database, run:
- `docker compose down -v`
- `docker-compose up`


## Run The Application Locally:
Begin by cloning GitHub repo: https://github.com/priyagill0/e-commerce **(main branch)**

Backend Setup:
1. Navigate to the backend directory: `cd backend`
2. Build the project: `mvn clean install -DskipTests`
3. Run the Spring Boot server: `mvn spring-boot:run`
4. The backend should now be running on: http://localhost:8080

Frontend Setup:
1. Open a new terminal window and navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. The frontend should now be running on: http://localhost:3000

Database Setup (MySQL):
- The project uses MySQL as its database.
- The backend code is already integrated with the database using environment variables in `resources/application.properties`.
- Create a schema named `ecommerce` using MySQL Workbench.
- The database is populated upon running the backend, through the DataSeeder file.

### To test user accounts, you may use the following credentials:
- Admin → email: Admin@gmail.com       password: Admin
- A sample customer account → email: bellahadid@gmail.com        password: password123
  
### API Documentation
Our Spring Boot backend exposes multiple REST API endpoints. All available endpoints are documented using Swagger and can be accessed at http://localhost:8080/swagger-ui/index.html

**Please note:** On the order checkout page, a valid credit card number must contain exactly **16 digits**. If an invalid card number is entered, the order will not be processed.
