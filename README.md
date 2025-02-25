
---

![image](https://github.com/user-attachments/assets/a0e72386-9893-41de-a944-5cb34c7c0c78)

![image](https://github.com/user-attachments/assets/d27a1372-d372-4892-89ba-893024c06385)

![image](https://github.com/user-attachments/assets/714c4570-2ac1-4852-aed4-16f421cd56b5)


# Project Name: OWN AI Collaborative Platform

## Description

The AI Collaborative Platform is an innovative web application built to enable seamless collaboration and AI-driven assistance for teams working on projects. It integrates various technologies such as **Express.js**, **Node.js**, **React**, **Tailwind CSS**, **Redis**, **Socket.io**, and **Gemini API** to provide real-time communication, AI-based code generation, and project management features.

- **Chat with teammates**: Engage in real-time discussions with others working on the same project.
- **AI-powered Code Generation**: Generate code snippets, suggestions, and other AI-powered assistance for your project.
- **Project Creation & Management**: Create projects, add team members, and manage collaboration tasks efficiently.

## Features

- **Real-time Chat**: 
  - Chat with other team members working on the same project using Socket.io for instant communication.
  
- **AI Code Generation**: 
  - Powered by the Gemini API, generate code, snippets, or suggestions to assist you while coding.

- **Project Management**:
  - Create new projects, add collaborators, and assign tasks to ensure smooth teamwork.

- **Authentication & Authorization**:
  - Secure sign-in and registration via JWT tokens for user authentication.
  
- **Interactive User Interface**:
  - Beautiful, responsive UI built with React and Tailwind CSS.

## Tech Stack

- **Frontend**: 
  - React.js
  - Tailwind CSS

- **Backend**: 
  - Node.js
  - Express.js
  - Socket.io (Real-time Communication)

- **Database/Storage**: 
  - Redis (for session management, caching)

- **Authentication**: 
  - JWT (JSON Web Token)

- **AI Integration**: 
  - Gemini API (for code generation and AI-driven suggestions)

- **API Requests**: 
  - Axios

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:

```bash
git clone <repository-url>
```

2. **Navigate to the project folder**:

```bash
cd <project-folder>
```

3. **Install backend dependencies**:

```bash
cd backend
npm install
```

4. **Install frontend dependencies**:

```bash
cd frontend
npm install
```

5. **Configure environment variables**:
   - Create a `.env` file for the backend and set the necessary environment variables like:
     - `JWT_SECRET`
     - `REDIS_HOST`
     - `GEMINI_API_KEY`
   
6. **Run the application**:

   - For **development** mode, run the following commands in their respective directories:

   - Start the backend (Express.js & Socket.io server):

   ```bash
   cd backend
   npx nodemon
   ```

   - Start the frontend (React):

   ```bash
   cd frontend
   npm run dev
   ```

   The app should now be running on `http://localhost:3000` in your browser.

## Usage

1. **Sign Up/Login**: Register or log in with your account using JWT authentication.
2. **Create a Project**: Navigate to the dashboard and create a new project.
3. **Add Collaborators**: Invite team members to collaborate on the same project.
4. **Chat**: Use the chat feature to communicate with your team members in real-time.
5. **Generate Code**: Use the AI feature to generate code, snippets, and suggestions to boost productivity.

## API Documentation

- **POST** `/api/auth/signup`: Register a new user.
- **POST** `/api/auth/login`: Log in to the system and receive a JWT token.
- **POST** `/api/project/create`: Create a new project.
- **POST** `/api/project/add-collaborator`: Add a new member to the project.
- **GET** `/api/chat/messages`: Retrieve chat messages for the project.
- **POST** `/api/chat/send-message`: Send a message to the project’s chat.
- **POST** `/api/ai/generate-code`: Use Gemini API to generate code for your project.

## Future Enhancements

- **Task Management**: Integrate a task management system to assign and track tasks.
- **Version Control Integration**: Link the platform with GitHub or GitLab for version control.
- **Real-time Code Editing**: Allow multiple users to collaboratively edit the same code in real time.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust or modify any sections based on your actual project structure!
