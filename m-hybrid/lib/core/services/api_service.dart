import 'package:dio/dio.dart';
import '../utils/app_config.dart';
import '../models/api_response.dart';

class ApiService {
  static final Dio _dio = Dio();
  static const String _baseUrl = 'https://api.example.com'; // Replace with your API URL

  static void initialize() {
    _dio.options = BaseOptions(
      baseUrl: _baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    );

    // Add interceptors
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Add auth token if available
          final token = AppConfig.userToken;
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onResponse: (response, handler) {
          handler.next(response);
        },
        onError: (error, handler) {
          _handleError(error);
          handler.next(error);
        },
      ),
    );
  }

  static void _handleError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        throw ApiException('Connection timeout');
      case DioExceptionType.badResponse:
        final statusCode = error.response?.statusCode;
        final message = error.response?.data['message'] ?? 'Server error';
        throw ApiException('$message (Status: $statusCode)');
      case DioExceptionType.cancel:
        throw ApiException('Request cancelled');
      case DioExceptionType.unknown:
        throw ApiException('Network error');
      default:
        throw ApiException('Unknown error occurred');
    }
  }

  // GET request
  static Future<ApiResponse<T>> get<T>(
    String endpoint, {
    Map<String, dynamic>? queryParameters,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dio.get(
        endpoint,
        queryParameters: queryParameters,
      );
      return ApiResponse.fromResponse(response, fromJson);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // POST request
  static Future<ApiResponse<T>> post<T>(
    String endpoint, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dio.post(
        endpoint,
        data: data,
        queryParameters: queryParameters,
      );
      return ApiResponse.fromResponse(response, fromJson);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // PUT request
  static Future<ApiResponse<T>> put<T>(
    String endpoint, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dio.put(
        endpoint,
        data: data,
        queryParameters: queryParameters,
      );
      return ApiResponse.fromResponse(response, fromJson);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // DELETE request
  static Future<ApiResponse<T>> delete<T>(
    String endpoint, {
    Map<String, dynamic>? queryParameters,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dio.delete(
        endpoint,
        queryParameters: queryParameters,
      );
      return ApiResponse.fromResponse(response, fromJson);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // Upload file
  static Future<ApiResponse<T>> uploadFile<T>(
    String endpoint,
    String filePath, {
    String fieldName = 'file',
    Map<String, dynamic>? additionalData,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final formData = FormData.fromMap({
        fieldName: await MultipartFile.fromFile(filePath),
        ...?additionalData,
      });

      final response = await _dio.post(
        endpoint,
        data: formData,
      );
      return ApiResponse.fromResponse(response, fromJson);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }
}

class ApiException implements Exception {
  final String message;
  ApiException(this.message);

  @override
  String toString() => 'ApiException: $message';
}