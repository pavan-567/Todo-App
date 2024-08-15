# React Todo

## Overview

This React project is a modern web application designed to help users manage their tasks efficiently. Built with React and TypeScript, the application leverages a robust set of tools and best practices to provide a seamless and interactive user experience.

## Features

- **Task Management:** Create, read, update, and delete tasks. Each task has a title, description, and status (e.g., completed or pending).
- **Filtering:** Filter tasks based on their status (all, completed, or pending) using a user-friendly dropdown.
- **Editing:** Edit the details of existing tasks, including the title and description.
- **Persistent Storage:** Tasks are stored in local storage, ensuring data persistence across page reloads and browser sessions.
- **Type Safety:** Utilizes TypeScript for static type checking, enhancing code reliability and reducing runtime errors.
- **State Management:** Manages application state using React's `useState` and `useReducer` hooks, or an alternative state management library like Redux.
- **Responsive Design:** Designed to be responsive and work well on various screen sizes, from mobile devices to desktops.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static types.
- **styled-components:** Library for styling React components using tagged template literals.
- **React Hooks:** Manages component state and side effects with hooks like `useState`, `useEffect`, `useReducer`.
- **Local Storage:** Provides persistent storage for tasks.
- **ESLint & Prettier:** Tools for code quality and consistency.

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/react-typescript-todo-project.git
   cd react-typescript-todo-project
   ```

2. **Install Dependencies**
    
    ```bash
    npm install
    ```

1. **Start The Development Server**

    ```bash
    npm run dev
    ```

2. **Open In Browser**
    Navigate to http://localhost:5173 to view the application. (The port might vary; check the terminal output for the correct port.)

## Usage

- **Adding Tasks:** Use the "Add Task" button to create a new task. Provide a title and description, and set the task status.
- **Editing Tasks:** Click the "Edit" button next to a task to change its details.
- **Filtering Tasks:** Use the filter dropdown to display tasks based on their status.
- **Deleting Tasks:** Click the "Delete" button to remove a task from the list.

## Contributing

Contributions are welcome! To contribute, please open an issue or submit a pull request with improvements or bug fixes.
