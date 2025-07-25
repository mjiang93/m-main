import 'package:dio/dio.dart';

class ApiResponse<T> {
  final bool success;
  final String message;
  final T? data;
  final int? statusCode;
  final Map<String, dynamic>? errors;

  ApiResponse({
    required this.success,
    required this.message,
    this.data,
    this.statusCode,
    this.errors,
  });

  factory ApiResponse.fromResponse(
    Response response,
    T Function(dynamic)? fromJson,
  ) {
    final responseData = response.data;
    
    return ApiResponse<T>(
      success: response.statusCode == 200 || response.statusCode == 201,
      message: responseData['message'] ?? 'Success',
      data: fromJson != null && responseData['data'] != null
          ? fromJson(responseData['data'])
          : responseData['data'],
      statusCode: response.statusCode,
      errors: responseData['errors'],
    );
  }

  factory ApiResponse.error(String message, {int? statusCode}) {
    return ApiResponse<T>(
      success: false,
      message: message,
      statusCode: statusCode,
    );
  }

  factory ApiResponse.success(T data, {String? message}) {
    return ApiResponse<T>(
      success: true,
      message: message ?? 'Success',
      data: data,
      statusCode: 200,
    );
  }
}