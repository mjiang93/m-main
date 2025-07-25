import 'package:flutter/material.dart';
import '../services/storage_service.dart';

class AppProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.system;
  bool _isLoggedIn = false;
  String? _userToken;
  Map<String, dynamic>? _userInfo;

  // Getters
  ThemeMode get themeMode => _themeMode;
  bool get isLoggedIn => _isLoggedIn;
  String? get userToken => _userToken;
  Map<String, dynamic>? get userInfo => _userInfo;

  AppProvider() {
    _loadSettings();
  }

  // Load settings from storage
  Future<void> _loadSettings() async {
    try {
      final isDarkMode = await StorageService.getBool('isDarkMode') ?? false;
      _themeMode = isDarkMode ? ThemeMode.dark : ThemeMode.light;
      
      _userToken = await StorageService.getString('userToken');
      _isLoggedIn = _userToken != null && _userToken!.isNotEmpty;
      
      final userInfoString = await StorageService.getString('userInfo');
      if (userInfoString != null) {
        // Parse user info from JSON string if needed
        // _userInfo = jsonDecode(userInfoString);
      }
      
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading settings: $e');
    }
  }

  // Theme methods
  Future<void> setThemeMode(ThemeMode mode) async {
    _themeMode = mode;
    await StorageService.setBool('isDarkMode', mode == ThemeMode.dark);
    notifyListeners();
  }

  Future<void> toggleTheme() async {
    final newMode = _themeMode == ThemeMode.light 
        ? ThemeMode.dark 
        : ThemeMode.light;
    await setThemeMode(newMode);
  }

  // Authentication methods
  Future<void> login(String token, Map<String, dynamic>? userInfo) async {
    _userToken = token;
    _userInfo = userInfo;
    _isLoggedIn = true;
    
    await StorageService.setString('userToken', token);
    if (userInfo != null) {
      // Save user info as JSON string if needed
      // await StorageService.setString('userInfo', jsonEncode(userInfo));
    }
    
    notifyListeners();
  }

  Future<void> logout() async {
    _userToken = null;
    _userInfo = null;
    _isLoggedIn = false;
    
    await StorageService.remove('userToken');
    await StorageService.remove('userInfo');
    
    notifyListeners();
  }

  // Update user info
  Future<void> updateUserInfo(Map<String, dynamic> userInfo) async {
    _userInfo = userInfo;
    // await StorageService.setString('userInfo', jsonEncode(userInfo));
    notifyListeners();
  }
}