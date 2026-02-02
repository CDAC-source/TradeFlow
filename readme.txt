TRADEFLOW – INSTALLATION REQUIREMENTS
====================================

FRONTEND SETUP
--------------
1. Install Node.js (LTS version recommended)
   Download from: https://nodejs.org

2. Install a package manager
   - npm (comes with Node.js)
   OR
   - yarn (optional)

3. Install frontend dependencies
   Open terminal in the frontend project directory and run:
   npm install

4. Start the frontend application
   npm run dev

Frontend runs on:
http://localhost:5173


BACKEND SETUP (SPRING BOOT)
--------------------------
1. Install Java Development Kit (JDK)
   Required version: JDK 17 or higher

2. Install Apache Maven
   Download from: https://maven.apache.org

3. Install MySQL Server
   - Create a database for the application
   - Update database credentials in application.properties

4. Run the backend server
   Open terminal in the backend project directory and run:
   mvn spring-boot:run

Backend runs on:
http://localhost:8080


BACKEND SETUP (OPTIONAL – .NET HELP SERVICE)
--------------------------------------------
1. Install .NET SDK
   Required version: .NET 6.0 or higher

2. Run the .NET service
   Open terminal in the .NET project directory and run:
   dotnet run

Help API runs on:
https://localhost:<port>


TOOLS REQUIRED
--------------
- Visual Studio Code (recommended)
- IntelliJ IDEA / Eclipse (for Java backend)
- MySQL Workbench (optional)
- Postman (for API testing)
