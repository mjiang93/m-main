import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static SharedPreferences? _prefs;

  // Initialize SharedPreferences
  static Future<void> init() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  // String operations
  static Future<bool> setString(String key, String value) async {
    await init();
    return await _prefs!.setString(key, value);
  }

  static Future<String?> getString(String key) async {
    await init();
    return _prefs!.getString(key);
  }

  // Bool operations
  static Future<bool> setBool(String key, bool value) async {
    await init();
    return await _prefs!.setBool(key, value);
  }

  static Future<bool?> getBool(String key) async {
    await init();
    return _prefs!.getBool(key);
  }

  // Int operations
  static Future<bool> setInt(String key, int value) async {
    await init();
    return await _prefs!.setInt(key, value);
  }

  static Future<int?> getInt(String key) async {
    await init();
    return _prefs!.getInt(key);
  }

  // Double operations
  static Future<bool> setDouble(String key, double value) async {
    await init();
    return await _prefs!.setDouble(key, value);
  }

  static Future<double?> getDouble(String key) async {
    await init();
    return _prefs!.getDouble(key);
  }

  // List<String> operations
  static Future<bool> setStringList(String key, List<String> value) async {
    await init();
    return await _prefs!.setStringList(key, value);
  }

  static Future<List<String>?> getStringList(String key) async {
    await init();
    return _prefs!.getStringList(key);
  }

  // Remove key
  static Future<bool> remove(String key) async {
    await init();
    return await _prefs!.remove(key);
  }

  // Clear all data
  static Future<bool> clear() async {
    await init();
    return await _prefs!.clear();
  }

  // Check if key exists
  static Future<bool> containsKey(String key) async {
    await init();
    return _prefs!.containsKey(key);
  }

  // Get all keys
  static Future<Set<String>> getKeys() async {
    await init();
    return _prefs!.getKeys();
  }
}