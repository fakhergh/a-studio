# Overview

A web application to display users and products. Built with **React.js**, **Vite**, **TanStack React Query**, **Axios**, **Redux Toolkit** and **Tailwind.css**.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v18 or higher) – JavaScript runtime environment.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/fakhergh/a-studio.git
    cd a-studio
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the application in development mode:

    ```bash
    npm run dev
    ```

## Available Commands

Here are the available npm commands to manage the frontend project:

### Development

- **Run the app in development mode**:
    ```bash
    npm run dev
    ```
    This will start the Vite development server and watch for file changes.

### Build and Production

- **Run the app in production**:

    ```bash
    npm start
    ```

- **Build the app for production**:

    ```bash
    npm run build
    ```

- **Preview the production build**:
    ```bash
    npm run preview
    ```

### Code Quality

- **Check code quality with ESLint and Prettier**:

    ```bash
    npm run static:check
    ```

- **Automatically fix linting and formatting issues**:
    ```bash
    npm run static:fix
    ```

### Testing

- **Run unit tests**:

    ```bash
    npm run test
    ```

- **Run tests in watch mode**:
    ```bash
    npm run test:watch
    ```

## Project File Structure

```
├── src/                               # Main source code directory
│   ├── __tests__/                     # Test files for unit and integration testing
│   ├── components/                    # Reusable UI components (e.g., datatable, input, datepicker)
│   ├── containers/                    # Components that manage state and logic, often composed of multiple components
│   ├── hooks/                         # Custom React hooks for encapsulating logic (e.g., debouncing...)
│   ├── icons/                         # Custom Icon components
│   ├── routes/                        # Components corresponding to different routes (e.g., users, products)
│   ├── services/                      # Functions for interacting with backend APIs (e.g., Axios calls)
│   ├── types/                         # TypeScript interfaces, types, and enums for type safety
│   ├── constants.ts                   # Constants used throughout the application
│   ├── index.css                      # Global CSS styles
│   ├── main.tsx                       # Main entry point for the React application
│   ├── routeTree.gen.tsx              # Generated route tree file (optional, if using dynamic routing libraries)
│   ├── store.ts                       # Redux store configuration (if using Redux for state management)
│   ├── vite-env.d.ts                  # Vite environment types (e.g., for accessing `import.meta.env` variables)
├── .gitignore                         # Specifies files and directories to ignore in version control
├── .prettierrc                        # Prettier configuration for consistent code formatting
├── eslint.config.mjs                  # ESLint configuration for enforcing coding standards
├── index.html                         # HTML template for the application
├── jest.config.js                     # Jest configuration for unit and integration testing
├── package.json                       # Project dependencies, scripts, and metadata
├── package-lock.json                  # Lockfile for npm to ensure consistent installs
├── README.md                          # Project documentation and instructions
├── tsconfig.app.json                  # TypeScript configuration for the application
├── tsconfig.json                      # Base TypeScript configuration
├── tsconfig.node.json                 # TypeScript configuration for Node.js-specific code
└── vite.config.ts                     # Vite configuration for building, bundling, and dev server setup
```

## Architecture

This project follows a **Container-based Architecture** where components are categorized into **containers** that combine both **UI rendering** and **business logic**. This approach ensures the application remains maintainable while keeping logic and rendering tightly coupled in the same components. Here's an overview of the architecture:

- Containers are components that manage both **UI rendering** and **business logic** (e.g., data fetching, state management, handling side effects).
- They handle communication with external services, such as API calls, and manage state or side effects like form submissions or authentication.
- Containers are often the **"smart" components** that encapsulate complex logic and state management, and then pass down data or actions to **presentational components** via props.
- They are typically **stateful** and are responsible for the **data flow** in the application.

**Example of a Container Component**:

```tsx
import { useState, useEffect } from 'react';
import { fetchUserData } from '@/services/api';
import UserProfile from '@/components/UserProfile';

const UserContainer = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchUserData();
            setUserData(data);
        };

        loadData();
    }, []);

    return <UserProfile user={userData} />;
};

export default UserContainer;
```

## Deployment

This project is **auto-deployed** on Vercel. Any changes pushed to the main branch are automatically deployed to the live environment.

You can access the live application here: [https://a-studio-two.vercel.app/](https://a-studio-two.vercel.app/)
