# 📝 Task Management API

A simple and secure RESTful API built with Node.js and Express for managing personal tasks.

---

## 🚀 Features

- User registration and login (JWT-based)
- Create, read, update, and delete tasks
- Rate-limited endpoint for motivational quotes and task management 
- Basic security and input validation

---

## 📦 Technologies Used

- Node.js + Express
- MongoDB
- JWT for authentication
- Helmet, xss-clean for security
- joi-validator for input validation
- express-rate-limit for rate limiting

---

## 📁 API Endpoints

### 🔐 Auth
- `POST api/taskapp/auth/signup` - Register a new user
- `POST api/taskapp/auth/signin` - Login and receive JWT

### ✅ Tasks (Protected + Rate Limited)
- `GET api/taskapp/task/list` - Get all tasks for the user
- `POST api/taskapp/task/create` - Create a new task
- `POST api/taskapp/task/update` - Update a task
- `POST api/taskapp/task/delete` - Delete a task

### 💡 Quotes (Protected + Rate Limited)
- `GET api/taskapp/get/quotes` - Get a motivational quote (max 5/min)

---
### Assumptions
- Only authenticated users can access tasks and quotes.
- Rate limit is per user, not IP.
- No role-based access (single user type).
- Single team; no team grouping implemented.

---

### Scaling to 100k+ Users
- Use a robust DB like PostgreSQL or scaled MongoDB clusters.
- Add caching (Redis) for frequent queries (e.g., quotes).
- Use API gateway + load balancers for horizontal scaling.
- Store JWT in a distributed cache (Redis) for logout/blacklisting.
- Shard database or use multi-tenant design for large user sets.
- Implement background jobs for non-urgent tasks (e.g., email notifications)

---

### 🛡️ Production Readiness Enhancements
- Use HTTPS and secure cookie-based sessions (if not using JWT).
- Add unit/integration tests with Jest.
- Add request logging (e.g., with Morgan + Winston).
- Set up CI/CD pipeline.
- Use environment-specific configs (via dotenv or config service).
- Monitor with tools like New Relic or Prometheus.

---

## ⚙️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/veera-GS/backend-task.git

# Install dependencies
npm install

# Add environment variables in .env
PORT=3000
MONGO_FULLURL=your_mongodb_uri
JWT_SECRET=your_jwt_secret

#Build the app
npm run build

# Run the app
npm run start

```
```
# Postman collection json
{
  "info": {
    "name": "Task Manager API",
    "_postman_id": "8b6f2c5e-1a76-4e41-b62a-1234567890ab",
    "description": "Postman collection for Task Manager API matching README.md endpoints",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "🔐 Signup",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"Id\": \"1\",\n    \"fullname\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"password\": \"password123\"\n}"
        },
        "url": { "raw": "{{baseUrl}}/api/taskapp/auth/signup", "host": ["{{baseUrl}}"], "path": ["api", "taskapp", "auth", "signup"] }
      }
    },
    {
      "name": "🔐 Signin",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"email\": \"john@example.com\",\n    \"password\": \"password123\"\n}"
        },
        "url": { "raw": "{{baseUrl}}/api/taskapp/auth/signin", "host": ["{{baseUrl}}"], "path": ["api", "taskapp", "auth", "signin"] }
      }
    },
    {
      "name": "✅ Get All Tasks",
      "request": {
        "method": "GET",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwtToken}}" }
        ],
        "url": { "raw": "{{baseUrl}}/api/taskapp/task/list", "host": ["{{baseUrl}}"], "path": ["api", "taskapp", "task", "lait"] }
      }
    },
    {
      "name": "✅ Create Task",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwtToken}}" },
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"title\": \"Buy groceries\",\n    \"description\": \"Milk, Bread, Eggs, and Fruits\",\n    \"status\": \"pending\"\n}"
        },
        "url": { "raw": "{{baseUrl}}/api/taskapp/task/create", "host": ["{{baseUrl}}"], "path": ["api", "taskapp", "task", "create"] }
      }
    },
    {
      "name": "✅ Update Task",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwtToken}}" },
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"title\": \"Buy groceries\",\n    \"description\": \"Milk, Bread, Eggs, Fruits, and Butter\",\n    \"status\": \"in-progress\"\n}"
        },
        "url": { "raw": "{{baseUrl}}/api/taskapp/task/update", "host": ["{{baseUrl}}"], "path": ["api", "taskapp", "task", "update"] }
      }
    },
    {
      "name": "✅ Delete Task",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwtToken}}" },
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"id\": \"64c0a9e4b5d1b7a9d5f0e123\"\n}"
        },
        "url": { "raw": "{{baseUrl}}/api/taskapp/task/delete", "host": ["{{baseUrl}}"], "path": ["api", "taskapp", "task", "delete"] }
      }
    },
    {
      "name": "💡 Get Motivational Quote",
      "request": {
        "method": "GET",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwtToken}}" }
        ],
        "url": { "raw": "{{baseUrl}}/get/quotes", "host": ["{{baseUrl}}"], "path": ["get", "quotes"] }
      }
    }
  ],
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:3000" },
    { "key": "jwtToken", "value": "" }
  ]
}

```
