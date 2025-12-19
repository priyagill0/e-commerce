# E-Commerce Website


## Installation

### Prerequisites:
- Node.js (v18+ recommended)  
- npm (comes with Node.js)  
- Java 17+ 
- Maven (for building the Spring Boot backend)
- MySQL Workbench

### Install Maven:
Execute in terminal:
- curl -s "https://get.sdkman.io/" | bash
- source "$HOME/.sdkman/bin/sdkman-init.sh"
- Sdk install maven 

### Backend Setup:
1. Navigate to the backend directory: `cd backend`
2. Build the project: `mvn clean install -DskipTests`
3. Run the Spring Boot server: `mvn spring-boot:run`
4. The backend should now be running on: http://localhost:8080

### Frontend Setup:
1. Open a new terminal window and navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. The frontend should now be running on: http://localhost:3000

### Database Setup (MySQL):
- The project uses MySQL as its database.
- The backend code is already integrated with the database using environment variables in `resources/application.properties`.
- The database is populated upon running the backend, through the DataSeeder file.

### To test user accounts, you may use the following credentials:
- Admin is Admin@gmail.com password: Admin
- A sample customer account is bellahadid@gmail.com password: password123 

