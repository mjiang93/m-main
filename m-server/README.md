# Python Backend Service

A simple Flask-based REST API service for user management.

## Features

- RESTful API endpoints for user CRUD operations
- Input validation and error handling
- CORS support for frontend integration
- Environment-based configuration
- Structured project layout with separation of concerns

## Project Structure (MVC Architecture)

```
test1/
├── app/                    # Application package
│   └── __init__.py        # Flask application factory
├── controllers/           # Controller layer (C in MVC)
│   ├── __init__.py
│   ├── health_controller.py    # Health check controller
│   ├── user_controller.py      # User controller
│   └── error_controller.py     # Error handling controller
├── models/                # Model layer (M in MVC)
│   ├── __init__.py
│   ├── user_model.py      # User data model
│   └── user_repository.py # User data repository
├── services/              # Business logic layer
│   ├── __init__.py
│   └── user_service.py    # User business logic service
├── utils/                 # Utility classes
│   ├── __init__.py
│   ├── decorators.py      # Decorators
│   ├── response_utils.py  # Response utilities
│   └── logging_utils.py   # Logging utilities
├── tests/                 # Test files
│   ├── __init__.py
│   ├── test_user_service.py   # Service layer tests
│   └── test_api.py            # API integration tests
├── run.py                 # Application entry point
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── README.md             # This file
├── 启动指南.md            # Chinese startup guide
└── 项目结构说明.md        # Chinese architecture guide
```

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
# Copy .env file and modify as needed
cp .env.example .env
```

## Running the Application

### Development Mode
```bash
python run.py
```

### Production Mode
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Endpoints

### Health Check
- **GET** `/health` - Check service health

### User Management
- **GET** `/api/users` - Get all users
- **GET** `/api/users/{id}` - Get user by ID
- **POST** `/api/users` - Create new user
- **PUT** `/api/users/{id}` - Update user
- **DELETE** `/api/users/{id}` - Delete user

## API Examples

### Get all users
```bash
curl -X GET http://localhost:5000/api/users
```

### Create a new user
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}'
```

### Update a user
```bash
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated", "email": "john.updated@example.com"}'
```

### Delete a user
```bash
curl -X DELETE http://localhost:5000/api/users/1
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "message": "Optional message",
  "count": 10
}
```

## Environment Variables

- `FLASK_ENV` - Environment (development/production)
- `DEBUG` - Enable debug mode (True/False)
- `PORT` - Server port (default: 5000)
- `SECRET_KEY` - Flask secret key

## Architecture

This project follows the **MVC (Model-View-Controller)** architecture pattern:

- **Model**: Data models and repository classes (`models/`)
- **View**: JSON API responses (handled by `utils/response_utils.py`)
- **Controller**: HTTP request handlers (`controllers/`)
- **Service**: Business logic layer (`services/`)

## Development

The service uses a simple in-memory data store. For production use, integrate with a proper database like PostgreSQL or MySQL.

### Running Tests

```bash
# Run all tests
python -m pytest tests/

# Run specific test files
python -m unittest tests.test_user_service
python -m unittest tests.test_api
```

### Adding New Features

1. Create model in `models/`
2. Create service in `services/`
3. Create controller in `controllers/`
4. Register blueprint in `app/__init__.py`
5. Add tests in `tests/`

## License

MIT License