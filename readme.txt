TRADEFLOW

A modern trade workflow platform powered by Spring Boot, MySQL, and a Vite + Node.js frontend, with an optional .NET Help Service.

PROJECT ARCHITECTURE

Frontend (Vite + Node.js)
│
▼
Spring Boot Backend
│
▼
MySQL Database

Optional: .NET Help API

FRONTEND SETUP
Requirements

• Node.js (LTS recommended) → https://nodejs.org

• npm (comes with Node.js) or yarn

Installation

Open terminal in the frontend project folder

Run:

npm install

Run Application

npm run dev

Frontend runs at:
http://localhost:5173

BACKEND SETUP (SPRING BOOT)
Requirements

• JDK 17 or higher
• Apache Maven → https://maven.apache.org

• MySQL Server

Database Setup

Create database:

CREATE DATABASE tradeflow;

Open:

src/main/resources/application.properties

Update credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/tradeflow
spring.datasource.username=root
spring.datasource.password=yourpassword

Run Backend Server

Open terminal in backend folder and run:

mvn spring-boot:run

Backend runs at:
http://localhost:8080

OPTIONAL: .NET HELP SERVICE
Requirements

• .NET SDK 6.0 or higher

Run Service

Open terminal in help-service folder and run:

dotnet run

Help API runs at:
https://localhost
:<port>

RECOMMENDED TOOLS

• VS Code — Code editing
• IntelliJ IDEA / Eclipse — Java backend
• MySQL Workbench — Database management
• Postman — API testing

API TESTING

Use Postman to test endpoints:

GET /api/...
POST /api/...

COMMON ISSUES & FIXES
Port Already in Use

Change port in application.properties:

server.port=8081

Database Connection Failed

• Ensure MySQL is running
• Verify username/password
• Confirm database exists

Node Modules Error

Delete and reinstall dependencies:

rm -rf node_modules
npm install

QUICK START

Frontend:

cd frontend
npm install
npm run dev

Backend:

cd backend
mvn spring-boot:run

CONTRIBUTING

Contributions, suggestions, and improvements are welcome.
Feel free to open issues or submit pull requests.