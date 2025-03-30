# SmartHire AI

SmartHire AI is a recruitment platform that leverages advanced AI technology to match candidates with recruiters seamlessly.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Development](#development)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Useful Commands](#useful-commands)

---

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd RH
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your local configuration (e.g., database credentials, AWS keys).

4. **Run Database Migrations**
   ```bash
   node ace migration:run
   ```

5. **Seed the Database (Optional)**
   If you have seeders, run:
   ```bash
   node ace db:seed
   ```

---

## Running the Project

1. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3333`.

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Start the Production Server**
   ```bash
   npm start
   ```

---

## Development

### Frontend
- The frontend is built using React and Inertia.js.
- TailwindCSS is used for styling. You can find the configuration in `tailwind.config.ts`.

### Backend
- The backend is powered by AdonisJS.
- Database migrations and models are located in the `database/migrations` and `app/models` directories, respectively.

---

## Testing

1. **Run Tests**
   ```bash
   npm run test
   ```

2. **Run Linter**
   ```bash
   npm run lint
   ```

3. **Run TypeScript Type Check**
   ```bash
   npm run typecheck
   ```

---

## Environment Variables

The `.env` file contains all the necessary environment variables. Below are the key variables:

- **Database**
  ```
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_USER=smarthire
  DB_PASSWORD=smarthire1234
  DB_DATABASE=smarthire
  ```

- **AWS S3**
  ```
  DRIVE_DISK=s3
  AWS_ACCESS_KEY_ID=<your-access-key>
  AWS_SECRET_ACCESS_KEY=<your-secret-key>
  AWS_REGION=us-east-1
  S3_BUCKET=<your-bucket-name>
  ```

- **Session**
  ```
  SESSION_DRIVER=cookie
  ```

---

## Docker Setup

1. **Start Docker Containers**
   ```bash
   docker-compose up -d
   ```

2. **Stop Docker Containers**
   ```bash
   docker-compose down
   ```

3. **Access Services**
   - PostgreSQL: `localhost:5432`
   - MinIO Console: `http://localhost:8900`
   - MailHog: `http://localhost:8025`

---

## Useful Commands

- **Run Migrations**
  ```bash
  node ace migration:run
  ```

- **Rollback Migrations**
  ```bash
  node ace migration:rollback
  ```

- **Generate a New Migration**
  ```bash
  node ace make:migration <migration-name>
  ```

- **Generate a New Model**
  ```bash
  node ace make:model <model-name>
  ```

- **Run the Linter**
  ```bash
  npm run lint
  ```

- **Format Code**
  ```bash
  npm run format
  ```

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your branch.
4. Submit a pull request.
