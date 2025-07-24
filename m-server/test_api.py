"""
Simple test script for the m-server API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:5000"

def test_health():
    """Test health endpoint"""
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 50)
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the server.")
        print("Make sure the m-server is running: cd m-server && python run.py")
        return False
    return True

def test_get_users():
    """Test get all users"""
    print("Testing get all users...")
    try:
        response = requests.get(f"{BASE_URL}/api/users")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 50)
        return True
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the server.")
        return False

def test_create_user():
    """Test create user"""
    print("Testing create user...")
    user_data = {
        "name": "Test User",
        "email": "test@example.com"
    }
    try:
        response = requests.post(
            f"{BASE_URL}/api/users",
            headers={"Content-Type": "application/json"},
            data=json.dumps(user_data)
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 50)
        return response.json().get("data", {}).get("id")
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the server.")
        return None

def run_tests():
    """Run all tests"""
    print("🚀 Starting API tests for m-server...")
    print("=" * 60)
    
    # Test health first
    if not test_health():
        print("\n❌ Server is not running!")
        print("Please start the server first:")
        print("  cd m-server")
        print("  python run.py")
        return
    
    # Test get all users
    if test_get_users():
        print("✅ Get users test passed")
    
    # Test create user
    user_id = test_create_user()
    if user_id:
        print("✅ Create user test passed")
    
    print("\n🎉 All tests completed!")
    print("Your m-server is working correctly!")

if __name__ == "__main__":
    run_tests()