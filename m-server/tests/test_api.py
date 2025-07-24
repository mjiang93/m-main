"""
Integration tests for API endpoints
"""
import unittest
import json
from app import create_app

class TestAPI(unittest.TestCase):
    """Test cases for API endpoints"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
    
    def tearDown(self):
        """Clean up after tests"""
        self.app_context.pop()
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertIn('status', data['data'])
        self.assertEqual(data['data']['status'], 'healthy')
    
    def test_get_users(self):
        """Test getting all users"""
        response = self.client.get('/api/users')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertIsInstance(data['data'], list)
    
    def test_create_user_valid(self):
        """Test creating a valid user"""
        user_data = {
            "name": "Test User",
            "email": "test@example.com"
        }
        response = self.client.post(
            '/api/users',
            data=json.dumps(user_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['data']['name'], "Test User")
        self.assertEqual(data['data']['email'], "test@example.com")
    
    def test_create_user_invalid(self):
        """Test creating user with invalid data"""
        user_data = {
            "name": "",
            "email": "invalid-email"
        }
        response = self.client.post(
            '/api/users',
            data=json.dumps(user_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        
        data = json.loads(response.data)
        self.assertFalse(data['success'])
    
    def test_get_user_by_id(self):
        """Test getting user by ID"""
        response = self.client.get('/api/users/1')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['data']['id'], 1)
    
    def test_get_user_not_found(self):
        """Test getting non-existing user"""
        response = self.client.get('/api/users/999')
        self.assertEqual(response.status_code, 404)
        
        data = json.loads(response.data)
        self.assertFalse(data['success'])
    
    def test_update_user(self):
        """Test updating user"""
        update_data = {
            "name": "Updated Name"
        }
        response = self.client.put(
            '/api/users/1',
            data=json.dumps(update_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['data']['name'], "Updated Name")

if __name__ == '__main__':
    unittest.main()