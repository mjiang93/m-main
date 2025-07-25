# M-Hybrid Flutter App

A Flutter hybrid development project with a clean architecture and common utilities.

## Features

- **Clean Architecture**: Organized code structure with separation of concerns
- **Navigation**: Go Router implementation with tab-based navigation
- **Authentication**: Login and registration pages with form validation
- **State Management**: Provider pattern for app-wide state management
- **API Integration**: Dio-based HTTP client with interceptors and error handling
- **Local Storage**: SharedPreferences wrapper for data persistence
- **Theming**: Light and dark theme support
- **Custom Widgets**: Reusable UI components

## Project Structure

```
lib/
├── core/
│   ├── models/          # Data models
│   ├── providers/       # State management providers
│   ├── router/          # Navigation configuration
│   ├── services/        # Business logic services
│   ├── theme/           # App theming
│   ├── utils/           # Utility functions and constants
│   └── widgets/         # Reusable UI components
├── features/
│   ├── auth/            # Authentication pages
│   ├── home/            # Home/Index page
│   ├── about/           # About page
│   ├── profile/         # Profile/My page
│   └── main/            # Main page with bottom navigation
└── main.dart            # App entry point
```

## Getting Started

### Prerequisites

- Flutter SDK (>=3.0.0)
- Dart SDK (>=3.0.0)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   flutter pub get
   ```

### Running the App

```bash
flutter run
```

## Key Components

### Navigation
- **Go Router**: Declarative routing with nested routes
- **Bottom Navigation**: Tab-based navigation between main pages
- **Route Guards**: Authentication-based navigation

### State Management
- **Provider**: App-wide state management
- **AppProvider**: Handles theme, authentication state

### API Service
- **Dio HTTP Client**: RESTful API communication
- **Interceptors**: Request/response logging and token management
- **Error Handling**: Centralized error processing

### Storage Service
- **SharedPreferences**: Local data persistence
- **Type-safe Methods**: Wrapper methods for different data types

### Custom Widgets
- **CustomButton**: Reusable button with loading states
- **CustomTextField**: Form input with validation support

### Validation
- **Validators**: Common form validation functions
- **Form Validation**: Email, password, and field validation

## Configuration

### API Configuration
Update the base URL in `lib/core/services/api_service.dart`:
```dart
static const String _baseUrl = 'https://your-api-url.com';
```

### App Configuration
Modify app settings in `lib/core/utils/app_config.dart`:
- App name and version
- Feature flags
- Environment configurations

## Pages

1. **Index Page**: Main landing page with "hello-index" message
2. **About Page**: Information page with "hello-index" message
3. **My Page**: Profile page with "hello-index" message and login button
4. **Login Page**: User authentication with email/password
5. **Register Page**: User registration with form validation

## Dependencies

- `flutter`: Flutter SDK
- `provider`: State management
- `go_router`: Navigation
- `dio`: HTTP client
- `shared_preferences`: Local storage
- `json_annotation`: JSON serialization

## Development

### Adding New Features
1. Create feature folder in `lib/features/`
2. Add pages, widgets, and services as needed
3. Update routing in `app_router.dart`
4. Add navigation helpers if required

### Adding New API Endpoints
1. Add endpoint constants to `constants.dart`
2. Create service methods in appropriate service files
3. Handle responses using `ApiResponse` model

### Customizing Theme
Modify colors and styles in `lib/core/theme/app_theme.dart`

## Build

### Android
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ios --release
```

## Contributing

1. Follow the established project structure
2. Use consistent naming conventions
3. Add proper error handling
4. Write meaningful commit messages
5. Test thoroughly before submitting

## License

This project is licensed under the MIT License.