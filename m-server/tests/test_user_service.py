"""
Unit tests for UserService
"""
import unittest
from services.user_service import UserService

class TestUserService(unittest.TestCase):
    """Test cases for UserService"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.user_service = UserService()
    
    def test_get_all_users(self):
        """Test getting all users"""
        users = self.user_service.get_all_users()
        self.assertIsInstance(users, list)
        self.assertGreater(len(users), 0)
    
    def test_create_user_valid(self):
        """Test creating a valid user"""
        user = self.user_service.create_user("Test User", "test@example.com")
        self.assertIsInstance(user, dict)
        self.assertEqual(user['name'], "Test User")
        self.assertEqual(user['email'], "test@example.com")
    
    def test_create_user_invalid_email(self):
        """Test creating user with invalid email"""
        with self.assertRaises(ValueError):
            self.user_service.create_user("Test User", "invalid-email")
    
    def test_create_user_empty_name(self):
        """Test creating user with empty name"""
        with self.assertRaises(ValueError):
            self.user_service.create_user("", "test@example.com")
    
    def test_get_user_by_id_existing(self):
        """Test getting existing user by ID"""
        user = self.user_service.get_user_by_id(1)
        self.assertIsNotNone(user)
        self.assertEqual(user['id'], 1)
    
    def test_get_user_by_id_non_existing(self):
        """Test getting non-existing user by ID"""
        user = self.user_service.get_user_by_id(999)
        self.assertIsNone(user)
    
    def test_update_user_existing(self):
        """Test updating existing user"""
        updated_user = self.user_service.update_user(1, "Updated Name", "updated@example.com")
        self.assertIsNotNone(updated_user)
        self.assertEqual(updated_user['name'], "Updated Name")
        self.assertEqual(updated_user['email'], "updated@example.com")
    
    def test_delete_user_existing(self):
        """Test deleting existing user"""
        # First create a user to delete
        user = self.user_service.create_user("To Delete", "delete@example.com")
        user_id = user['id']
        
        # Delete the user
        result = self.user_service.delete_user(user_id)
        self.assertTrue(result)
        
        # Verify user is deleted
        deleted_user = self.user_service.get_user_by_id(user_id)
        self.assertIsNone(deleted_user)

if __name__ == '__main__':
    unittest.main()