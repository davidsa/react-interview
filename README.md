# Interview Project - UserForm Refactoring

## Overview

This is a React + TypeScript + Vite project designed as a coding interview exercise. The application contains a `UserForm` component that has been intentionally structured in a way that presents opportunities for improvement and refactoring.

## Objective

Your task is to **review the codebase** and **refactor the `UserForm` component** to make it more maintainable, readable, and follow React best practices.

## Current State

The `UserForm` component (`src/UserForm.tsx`) currently:
- Handles multiple form fields (name, lastname, email, city)
- Supports different modes (create, update, banner)
- Has conditional rendering based on props
- Contains validation logic
- Includes various features like city fetching, email validation, etc.

The code has been intentionally structured in a way that may not follow all best practices, making it a good candidate for refactoring.

## Your Task

1. **Review** the existing `UserForm` component and identify areas for improvement
2. **Refactor** the component to improve:
   - Code organization and structure
   - Maintainability
   - Reusability
   - Separation of concerns
   - Type safety
   - Performance (if applicable)
   - Testing considerations

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx          # Main application component with three form instances
├── UserForm.tsx     # The component to refactor
└── main.tsx         # Application entry point
```

## Notes

- The codebase is intentionally unorganized in some areas to simulate real-world scenarios
- Focus on making the code more maintainable rather than adding new features
- Consider component composition, custom hooks, and proper separation of concerns
- Feel free to create additional files/components if it improves the structure

## Good Luck!

Take your time to understand the current implementation and think about how you would structure this component in a production environment.
