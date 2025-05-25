# SmartHire AI

SmartHire AI is a recruitment platform that leverages advanced AI technology to match candidates with recruiters seamlessly.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Architecture Overview](#architecture-overview)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Development](#development)
- [AI Microservice](#ai-microservice)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Useful Commands](#useful-commands)
- [Contributing](#contributing)

---

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)
- [Python 3.10+](https://www.python.org/) (for the AI microservice)

---

## Architecture Overview

SmartHire uses a hybrid architecture combining:

1. **Main Application (AdonisJS)**
   - Handles user authentication, CV storage, and UI rendering
   - Built with TypeScript for type safety and robust development

2. **AI Microservice (FastAPI)**
   - Separate Python-based service for CV analysis
   - Integrates with Gemini API for semantic understanding
   - Processes CV data and extracts structured information
   - Communicates with main app via HTTP endpoints

3. **Vector Database (PostgreSQL + pgvector)**
   - Enables semantic search capabilities
   - Stores CV embeddings for similarity matching

4. **Object Storage (MinIO)**
   - S3-compatible storage for CV files

This separation of concerns allows for specialized handling of AI-related tasks while maintaining a clean architecture.

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

6. **Set Up AI Microservice**
   The AI microservice is in a separate repository and needs to be set up independently:
   ```bash
   # Clone the AI microservice repository to a separate location
   git clone https://github.com/yassine20011/smartHireApi.git
   cd smartHireApi
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

---

## Running the Project

1. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3333`.

2. **Start the AI Microservice**
   ```bash
   cd smartHireApi
   fastapi dev main.py
   ```
   The AI service will be available at `http://localhost:8000`.
---

## Development

### Frontend
- The frontend is built using React and Inertia.js.
- Shadcn UI components are used for the user interface.
- TailwindCSS is used for styling. You can find the configuration in `tailwind.config.ts`.

### Backend
- The backend is powered by AdonisJS.
- Database migrations and models are located in the `database/migrations` and `app/models` directories, respectively.

---

## AI Microservice

The AI component of SmartHire is implemented as a separate microservice in its own repository: [smartHireApi](https://github.com/yassine20011/smartHireApi). This design choice allows us to:

1. **Use Specialized Libraries**: Leverage Python's rich ecosystem for ML/AI tasks
2. **Scale Independently**: Adjust resources for AI processing separately from the main app
3. **Maintain Language Separation**: Use TypeScript for the main app and Python for AI

### Key Features:
- **CV Parsing**: Extracts structured information from PDF and DOCX files
- **Semantic Analysis**: Uses Gemini API to understand resume content
- **Vector Embeddings**: Generates embeddings for semantic search
- **Skills Matching**: Matches candidate skills to job requirements
- **Experience Evaluation**: Assesses relevance of work experience

### API Endpoints:
- `POST /resume_parser`: Analyzes a resume based on a job description.
- `POST /process-cv`: Processes a CV file and returns structured data
- `POST /embeddings`: Generates vector embeddings for semantic search

For detailed documentation and setup instructions for the AI service, please refer to the [smartHireApi repository](https://github.com/yassine20011/smartHireApi).

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

- **AI Service**
  ```
  AI_SERVICE_URL=http://localhost:8000
  GEMINI_API_KEY=<your-gemini-api-key>
  ```

---

## Docker Setup

1. **Start Docker Containers**
   ```bash
   docker-compose up -d
   ```
   This will start all services including:
   - PostgreSQL database
   - MinIO for file storage
   - Main AdonisJS application
   - FastAPI AI microservice
   - MailHog for email testing

2. **Stop Docker Containers**
   ```bash
   docker-compose down
   ```

3. **Access Services**
   - Main App: `http://localhost:3333`
   - AI Service: `http://localhost:8000/docs`
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

