"""
Business logic services
"""
import re
from typing import Dict, List, Optional
from models.user_model import User
from models.user_repository_db import UserRepositoryDB

class UserService:
    """User service for business logic"""
    
    def __init__(self):
        self.repository = UserRepositoryDB()
    
    def get_all_users(self) -> List[Dict]:
        """Get all users"""
        users = self.repository.get_all()
        return [user.to_dict() for user in users]
    
    def get_user_by_id(self, user_id: int) -> Optional[Dict]:
        """Get user by ID"""
        user = self.repository.get_by_id(user_id)
        return user.to_dict() if user else None
    
    def create_user(self, name: str, email: str) -> Dict:
        """Create new user with validation"""
        # Validate input
        validation_error = self._validate_user_data(name, email)
        if validation_error:
            raise ValueError(validation_error)
        
        # Check if email already exists
        if self._email_exists(email):
            raise ValueError("Email already exists")
        
        user = self.repository.create(name.strip(), email.strip().lower())
        return user.to_dict()
    
    def update_user(self, user_id: int, name: str = None, email: str = None) -> Optional[Dict]:
        """Update user with validation"""
        # Check if user exists
        if not self.repository.get_by_id(user_id):
            return None
        
        # Validate input if provided
        if name is not None:
            name = name.strip()
            if not name:
                raise ValueError("Name cannot be empty")
        
        if email is not None:
            email = email.strip().lower()
            if not self._is_valid_email(email):
                raise ValueError("Invalid email format")
            
            # Check if email already exists for another user
            if self._email_exists(email, exclude_user_id=user_id):
                raise ValueError("Email already exists")
        
        user = self.repository.update(user_id, name, email)
        return user.to_dict() if user else None
    
    def delete_user(self, user_id: int) -> bool:
        """Delete user"""
        return self.repository.delete(user_id)
    
    def get_user_count(self) -> int:
        """Get total user count"""
        return self.repository.count()
    
    def _validate_user_data(self, name: str, email: str) -> Optional[str]:
        """Validate user data"""
        if not name or not name.strip():
            return "Name is required"
        
        if not email or not email.strip():
            return "Email is required"
        
        if not self._is_valid_email(email):
            return "Invalid email format"
        
        return None
    
    def _is_valid_email(self, email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def _email_exists(self, email: str, exclude_user_id: int = None) -> bool:
        """Check if email already exists"""
        return self.repository.email_exists(email.lower(), exclude_user_id)
