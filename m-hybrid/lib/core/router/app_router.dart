import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/pages/login_page.dart';
import '../../features/auth/pages/register_page.dart';
import '../../features/main/pages/main_page.dart';
import '../../features/home/pages/index_page.dart';
import '../../features/about/pages/about_page.dart';
import '../../features/profile/pages/my_page.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/main',
    routes: [
      // Authentication routes
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/register',
        name: 'register',
        builder: (context, state) => const RegisterPage(),
      ),
      
      // Main app routes with bottom navigation
      ShellRoute(
        builder: (context, state, child) => MainPage(child: child),
        routes: [
          GoRoute(
            path: '/main',
            name: 'main',
            builder: (context, state) => const IndexPage(),
          ),
          GoRoute(
            path: '/about',
            name: 'about',
            builder: (context, state) => const AboutPage(),
          ),
          GoRoute(
            path: '/my',
            name: 'my',
            builder: (context, state) => const MyPage(),
          ),
        ],
      ),
    ],
  );

  // Navigation helpers
  static void goToLogin(BuildContext context) {
    context.go('/login');
  }

  static void goToRegister(BuildContext context) {
    context.go('/register');
  }

  static void goToMain(BuildContext context) {
    context.go('/main');
  }

  static void goToAbout(BuildContext context) {
    context.go('/about');
  }

  static void goToMy(BuildContext context) {
    context.go('/my');
  }
}