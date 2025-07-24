# M-Client Frontend

A modern, responsive frontend application for the M-Server Python backend API.

## Features

- 🎨 **Modern UI Design** - Clean, responsive interface with gradient backgrounds
- 👥 **User Management** - Full CRUD operations for user data
- 🔄 **Real-time API Status** - Live connection status with the backend
- 📱 **Mobile Responsive** - Works perfectly on all device sizes
- ⚡ **Fast & Lightweight** - Pure JavaScript, no heavy frameworks
- 🎯 **User-Friendly** - Intuitive interface with clear feedback

## Project Structure

```
m-client/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # All CSS styles
├── scripts/
│   ├── api.js         # API client for backend communication
│   └── main.js        # Main application logic
└── README.md          # This file
```

## Getting Started

### Prerequisites
- M-Server backend running on `http://localhost:5000`
- Modern web browser
- Local web server (optional, for development)

### Quick Start

1. **Start the M-Server backend:**
   ```bash
   cd ../m-server
   python run.py
   ```

2. **Open the frontend:**
   - **Option 1:** Double-click `index.html` to open in browser
   - **Option 2:** Use a local web server:
     ```bash
     # Using Python
     python -m http.server 8080
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8080
     ```

3. **Access the application:**
   - Direct file: `file:///path/to/m-client/index.html`
   - Local server: `http://localhost:8080`

## Features Overview

### 🏥 API Status Monitor
- Real-time connection status with the backend
- Visual indicators (green=online, red=offline, yellow=checking)
- Automatic status checking on page load

### 👤 User Management
- **Create Users:** Add new users with name and email
- **View Users:** Display all users in a clean card layout
- **Edit Users:** Update user information via modal dialog
- **Delete Users:** Remove users with confirmation prompt

### 🎨 UI Components
- **Responsive Grid Layout:** Adapts to different screen sizes
- **Modal Dialogs:** For editing user information
- **Loading States:** Visual feedback during API calls
- **Success/Error Messages:** Clear user feedback
- **Hover Effects:** Interactive button and card animations

## API Integration

The frontend communicates with the M-Server backend through a RESTful API:

- `GET /health` - Check server status
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Development

### File Structure
- **index.html:** Main page structure and layout
- **styles/main.css:** All styling including responsive design
- **scripts/api.js:** API client class for backend communication
- **scripts/main.js:** Main application logic and DOM manipulation

### Key Classes
- `APIClient`: Handles all HTTP requests to the backend
- `UserManager`: Manages user interface and user operations

### Customization
- **Colors:** Modify CSS custom properties in `main.css`
- **API Endpoint:** Change `baseURL` in `api.js`
- **Styling:** Update styles in `main.css`

## Troubleshooting

### Common Issues

1. **API Server Offline**
   - Ensure M-Server is running: `cd ../m-server && python run.py`
   - Check if port 5000 is available

2. **CORS Issues**
   - M-Server includes CORS headers by default
   - If issues persist, use a local web server instead of file:// protocol

3. **JavaScript Errors**
   - Check browser console for detailed error messages
   - Ensure all files are properly loaded

### Debug Mode
Open browser developer tools (F12) to:
- View console logs
- Monitor network requests
- Debug JavaScript issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use and modify as needed.