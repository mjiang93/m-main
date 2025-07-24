"""
User repository for data operations
"""
from typing import List, Optional
from .user_model import User

class UserRepository:
    """User repository for data operations"""
    
    def __init__(self):
        self._users: List[User] = [
            User(1, "John Doe", "john@example.com"),
            User(2, "Jane Smith", "jane@example.com")
        ]
        self._next_id = 3
    
    def get_all(self) -> List[User]:
        """Get all users"""
        return self._users.copy()
    
    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return next((user for user in self._users if user.id == user_id), None)
    
    def create(self, name: str, email: str) -> User:
        """Create new user"""
        user = User(self._next_id, name, email)
        self._users.append(user)
        self._next_id += 1
        return user
    
    def update(self, user_id: int, name: str = None, email: str = None) -> Optional[User]:
        """Update user"""
        user = self.get_by_id(user_id)
        if user:
            if name:
                user.name = name
            if email:
                user.email = email
        return user
    
    def delete(self, user_id: int) -> bool:
        """Delete user"""
        user = self.get_by_id(user_id)
        if user:
            self._users.remove(user)
            return True
        return False
    
    def count(self) -> int:
        """Get total user count"""
        return len(self._users)