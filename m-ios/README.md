# m-ios

A complete iOS application with modern architecture and clean code structure.

## Project Structure

```
m-ios/
├── m-ios.xcodeproj/          # Xcode project file
└── m-ios/
    ├── App/                  # App lifecycle files
    │   ├── AppDelegate.swift
    │   └── SceneDelegate.swift
    ├── Features/             # Feature-based modules
    │   ├── Main/            # Main tab bar controller
    │   ├── Home/            # Home tab
    │   ├── Profile/         # Profile tab
    │   ├── Settings/        # Settings tab
    │   └── Auth/            # Authentication (Login/Register)
    ├── Core/                # Core utilities and services
    └── Resources/           # Assets, Info.plist, Launch screen
```

## Features

- **Tab-based Navigation**: 3 main tabs (Home, Profile, Settings)
- **Authentication Flow**: Login and Register screens
- **Modern iOS Architecture**: Clean separation of concerns
- **Programmatic UI**: No Storyboards, pure code implementation
- **iOS 17+ Support**: Latest iOS features and APIs

## Pages

1. **LoginViewController** - User authentication entry point
2. **RegisterViewController** - New user registration
3. **HomeViewController** - Main home screen (Tab 1)
4. **ProfileViewController** - User profile management (Tab 2)
5. **SettingsViewController** - App settings and preferences (Tab 3)

## Getting Started

1. Open `m-ios.xcodeproj` in Xcode
2. Select your target device or simulator
3. Build and run the project (⌘+R)

## Requirements

- Xcode 15.0+
- iOS 17.0+
- Swift 5.0+

## Architecture

The project follows a feature-based architecture with clear separation between:
- **App Layer**: Application lifecycle and configuration
- **Features Layer**: Individual feature modules
- **Core Layer**: Shared utilities and services
- **Resources Layer**: Assets and configuration files