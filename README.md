Chat App Backend
================

This is the backend for a modern chat application similar to WhatsApp. The backend handles user authentication, profile management, message storage, and group creation.

Features
--------

-   **User Authentication**: Signup, login, and JWT-based authentication.
-   **Profile Management**: Users can upload and update their profile pictures.
-   **Message Management**: Send and receive messages between users.
-   **Group Management**: Create and manage groups.

Tech Stack
----------

-   **Backend**: Node.js with Express.js
-   **Database**: MongoDB
-   **Authentication**: JWT (JSON Web Tokens)
-   **Real-time Communication**: Socket.io 
-   **File Storage**: Cloudinary 

Setup Instructions
------------------

### Prerequisites

-   Node.js and npm installed on your machine.
-   MongoDB database setup. 

### Installation

1.  Clone the repository:

    
    `git clone https://github.com/ahmedhesein1/Chat-App.git` 

2.  Install dependencies:

    `npm install`


3.  Run the backend server:


    `npm start`

    Your backend API will now be running at `http://localhost:5001`.

API Endpoints
-------------

-   **POST /api/auth/signup**: Register a new user.
-   **POST /api/auth/login**: Login with email and password.
-   **GET /api/auth/check**: Check if the user is authenticated.
-   **POST /api/messages**: Send a new message.
-   **GET /api/messages**: Get all messages for the logged-in user.
-   **GET /api/messages/send/:id**: Send messages. 
Dependencies
------------

-   **express**: Web framework for Node.js.
-   **mongoose**: MongoDB object modeling for Node.js.
-   **jsonwebtoken**: JSON Web Token authentication.
-   **bcryptjs**: For hashing passwords.
-   **cors**: Middleware to allow cross-origin requests.

Contributing
------------

Feel free to fork the repository, submit issues, and create pull requests for improvements or bug fixes.

License
-------

This project is licensed under the MIT License.
