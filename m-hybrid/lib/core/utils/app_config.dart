import '../services/storage_service.dart';
import '../services/api_service.dart';

class AppConfig {
  static String? _userToken;
  static Map<String, dynamic>? _userInfo;
  static bool _isInitialized = false;

  // Getters
  static String? get userToken => _userToken;
  static Map<String, dynamic>? get userInfo => _userInfo;
  static bool get isInitialized => _isInitialized;

  // Initialize app configuration
  static Future<void> initialize() async {
    if (_isInitialized) return;

    try {
      // Initialize storage service
      await StorageService.init();
      
      // Load user data
      _userToken = await StorageService.getString('userToken');
      final userInfoString = await StorageService.getString('userInfo');
      if (userInfoString != null) {
        // Parse user info from JSON string if needed
        // _userInfo = jsonDecode(userInfoString);
      }

      // Initialize API service
      ApiService.initialize();

      _isInitialized = true;
    } catch (e) {
      throw Exception('Failed to initialize app configuration: $e');
    }
  }

  // Update user token
  static Future<void> setUserToken(String? token) async {
    _userToken = token;
    if (token != null) {
      await StorageService.setString('userToken', token);
    } else {
      await StorageService.remove('userToken');
    }
  }

  // Update user info
  static Future<void> setUserInfo(Map<String, dynamic>? userInfo) async {
    _userInfo = userInfo;
    if (userInfo != null) {
      // Save user info as JSON string if needed
      // await StorageService.setString('userInfo', jsonEncode(userInfo));
    } else {
      await StorageService.remove('userInfo');
    }
  }

  // Clear all user data
  static Future<void> clearUserData() async {
    _userToken = null;
    _userInfo = null;
    await StorageService.remove('userToken');
    await StorageService.remove('userInfo');
  }

  // App constants
  static const String appName = 'M-Hybrid App';
  static const String appVersion = '1.0.0';
  static const int apiTimeout = 30; // seconds
  static const int maxRetries = 3;
  
  // Environment configurations
  static const bool isDebugMode = true; // Set to false for production
  static const String baseUrl = 'https://api.example.com'; // Replace with your API URL
  
  // Feature flags
  static const bool enableLogging = true;
  static const bool enableAnalytics = false;
  static const bool enableCrashReporting = false;
}