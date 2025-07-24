"""
User model class
"""
from datetime import datetime
from typing import Dict

class User:
    """User model class"""
    
    def __init__(self, id: int, name: str, email: str, created_at: datetime = None):
        self.id = id
        self.name = name
        self.email = email
        self.created_at = created_at or datetime.now()
    
    def to_dict(self) -> Dict:
        """Convert user object to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'User':
        """Create user object from dictionary"""
        return cls(
            id=data['id'],
            name=data['name'],
            email=data['email'],
            created_at=datetime.fromisoformat(data.get('created_at', datetime.now().isoformat()))
        )
    
    def __repr__(self):
        return f"<User {self.id}: {self.name}>"