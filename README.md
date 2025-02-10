# WishWall

A simple wishes API built to practice DevOps tools and methodologies. This project serves as a practical playground for implementing various DevOps practices, including containerization, CI/CD, and infrastructure as code.

## Project Purpose

This project is primarily designed to:

- Practice DevOps tools and methodologies
- Implement containerization using Docker
- Set up CI/CD pipelines
- Demonstrate infrastructure as code
- Apply monitoring and logging best practices

## Tech Stack

- Node.js & Express.js
- PostgreSQL
- Docker & Docker Compose
- Jest for testing
- ESLint for code quality
- Zod for validation

## Project Structure

```
WishWall/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── controllers/
│   │   └── wish.controller.js
│   ├── database/
│   │   └── database.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   ├── logger.middleware.js
│   │   └── validate.middleware.js
│   ├── routes/
│   │   └── wish.route.js
│   └── schemas/
│       └── wish.schema.js
├── .env                       # Environment variables
├── .env.example              # Environment variables template
├── .gitignore
├── compose.dev.yml           # Docker compose for development
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Development Setup

1. Clone the repository

```bash
git clone https://github.com/moabdelazem/wishwall.git
cd wishwall
```

2. Install dependencies

```bash
npm install
```

3. Start the database

```bash
docker compose -f compose.dev.yml up -d
```

4. Create `.env` file (use .env.example as template)

5. Start the development server

```bash
npm run dev
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm run prod` - Start production server with production environment
- `npm run lint` - Run linting checks and fixes
- `npm run lint:check` - Check for linting issues
- `npm run lint:fix` - Auto-fix linting issues
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## API Endpoints

### Health Check

- `GET /api/v1/health` - Check API and database health

### Wishes

- `GET /api/v1/wishes` - Get all wishes
- `POST /api/v1/wishes` - Create a new wish

## Environment Variables

- `NODE_ENV` - Node environment (development/production)
- `PORT` - Server port number
- `DATABASE_URL` - PostgreSQL connection string

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the ISC License.
