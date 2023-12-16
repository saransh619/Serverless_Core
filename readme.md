# Serverless Testing with Sequelize Migrations

This Serverless Framework project integrates Sequelize migrations to manage your database schema. The project is organized for both local development and deployment on AWS Lambda.

## Table of Contents

- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)

## Project Structure

The project is organized into the following main directories:

- **src/config**: Contains database configuration.
  - `config.ts`: Configuration file using dotenv for environment variables.
- **src/migrations**: Directory for Sequelize migrations.
- **src/models**: Sequelize models for products and users.
- **src/services**: Service handlers for various HTTP methods.
- **src/utils**: Utility functions for Sequelize configuration.
- **.env**: Environment variables configuration (see [.env.example](.env.example) for an example).
- **serverless.yml**: Serverless Framework configuration.
- **tsconfig.json**: TypeScript compiler configuration.
- **package.json**: Node.js project configuration.

## Configuration

Database configuration is handled in `src/config/config.ts`. Environment-specific configurations are stored in the `.env` file. You can refer to the example in [.env.example](.env.example) for guidance on setting up your `.env` file.

## Scripts

The project provides several npm scripts for common tasks:

- **Build and Deploy Scripts**:
  - `build`: Compile TypeScript files.
  - `deploy`: Deploy the Serverless application.
  - `remove`: Remove the deployed Serverless application.
  - `start:dev`: Start the application locally using Serverless Offline.
- **Database Migration Scripts**:
  - `migrate`: Run Sequelize migrations.
  - `undoMigrations`: Undo the last Sequelize migration.

## Usage

1. Clone the repository: `git clone https://github.com/saransh619/Serverless_Core.git`
2. Navigate to the project directory: `cd Serverless_Core`
3. Install dependencies: `npm install`
4. Copy `.env.example` to create your `.env` file: `cp .env.example .env`
5. Configure environment variables in the `.env` file based on your database setup.
6. Run `npm run build` to compile TypeScript files.
7. Run `npm run start:dev` to start the application locally using Serverless Offline.
8. Use the provided HTTP endpoints for various functionalities (e.g., `http://localhost:3000/dev/run-migrations`, `http://localhost:3000/dev/hello`).

For deployment, use `npm run deploy` and for removal, use `npm run remove`.

## Dependencies

Key dependencies for this project include:

- Serverless Framework: For deploying serverless applications.
- Sequelize: A Node.js ORM for managing database interactions.
- Sequelize CLI: Command-line interface for Sequelize.
- Other dependencies listed in `package.json`.

## Troubleshooting

If you encounter issues during development or deployment, consider the following:

- Ensure all dependencies are installed using `npm install`.
- Verify that the environment variables in the `.env` file are correctly set.
- If encountering database migration issues, check the Sequelize documentation for troubleshooting tips.
- For Serverless issues, consult the Serverless Framework documentation.

Feel free to explore the project, modify configurations, and extend functionalities as needed.