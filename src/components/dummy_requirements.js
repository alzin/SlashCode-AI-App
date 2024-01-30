const exampleText = `Objective: 
I need a full-stack web application that enables users to create, read, update, and delete (CRUD) tasks. 
Each task should have a title, description, priority level, and status. 
The application should also support user authentication.

Programming Language and Libraries/Frameworks:
Backend: Node.js with Express framework 
Frontend: React.js 

Database: MongoDB 

Authentication: JWT (JSON Web Tokens) for user authentication.

Input Description:
Users should be able to input task details through a web form. 
Task details include 'Title', 'Description', 'Priority' (High, Medium, Low), and 'Status' (To Do, In Progress, Done). 

Expected Output:
A web interface where users can:
View all their tasks in a list, with the ability to filter by priority and status. 
Add a new task via a form. 
Update existing tasks (edit title, description, priority, or status).
Delete tasks. 

User authentication system where users can: 
Register a new account. 
Login to their account. 
Perform task operations only after authentication.

Steps:
Backend:
Set up Node.js server with Express. 
Implement routes for handling CRUD operations for tasks. 
Implement routes for user registration and login.
Integrate MongoDB to store tasks and user information. 
Use JWT for handling authentication and protecting routes.

Frontend:
Set up React.js project. 
Create components for task display, task form (add/update), login, and registration. 
Implement state management to handle user inputs and application state. 
Connect with the backend API to send and receive data. 
Implement client-side routing to switch between different views (tasks view, login, registration). 

Database:
Design a MongoDB schema for tasks and users. 
Ensure secure storage of user passwords (use hashing). 

Constraints and Edge Cases:
The web application must be responsive and work on both desktop and mobile browsers. 
Ensure form validation both on the client and server side. 
Proper error handling for database operations and authentication failures. 
Implement security best practices to protect sensitive data. 

Additional Notes:
The user interface should be clean and user-friendly. 
Include basic documentation on how to set up and run the application.
  `;

export default exampleText;
