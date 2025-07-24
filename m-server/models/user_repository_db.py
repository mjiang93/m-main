"""
Database-backed user repository
"""
from typing import List, Optional
from datetime import datetime
from .user_model import User
from database import db

class UserRepositoryDB:
    """Database-backed user repository"""
    
    def get_all(self) -> List[User]:
        """Get all users from database"""
        query = "SELECT * FROM users ORDER BY created_at DESC"
        rows = db.execute_query(query)
        return [self._row_to_user(row) for row in rows]
    
    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID from database"""
        query = "SELECT * FROM users WHERE id = ?"
        rows = db.execute_query(query, (user_id,))
        if rows:
            return self._row_to_user(rows[0])
        return None
    
    def create(self, name: str, email: str) -> User:
        """Create new user in database"""
        query = "INSERT INTO users (name, email) VALUES (?, ?)"
        user_id = db.execute_insert(query, (name, email))
        
        # Return the created user
        return self.get_by_id(user_id)
    
    def update(self, user_id: int, name: str = None, email: str = None) -> Optional[User]:
        """Update user in database"""
        # Build dynamic update query
        updates = []
        params = []
        
        if name is not None:
            updates.append("name = ?")
            params.append(name)
        
        if email is not None:
            updates.append("email = ?")
            params.append(email)
        
        if not updates:
            return self.get_by_id(user_id)
        
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(user_id)
        
        query = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
        affected_rows = db.execute_update(query, tuple(params))
        
        if affected_rows > 0:
            return self.get_by_id(user_id)
        return None
    
    def delete(self, user_id: int) -> bool:
        """Delete user from database"""
        query = "DELETE FROM users WHERE id = ?"
        affected_rows = db.execute_update(query, (user_id,))
        return affected_rows > 0
    
    def count(self) -> int:
        """Get total user count from database"""
        query = "SELECT COUNT(*) as count FROM users"
        result = db.execute_query(query)
        return result[0]['count'] if result else 0
    
    def email_exists(self, email: str, exclude_user_id: int = None) -> bool:
        """Check if email exists in database"""
        if exclude_user_id:
            query = "SELECT COUNT(*) as count FROM users WHERE email = ? AND id != ?"
            result = db.execute_query(query, (email, exclude_user_id))
        else:
            query = "SELECT COUNT(*) as count FROM users WHERE email = ?"
            result = db.execute_query(query, (email,))
        
        return result[0]['count'] > 0 if result else False
    
    def _row_to_user(self, row: dict) -> User:
        """Convert database row to User object"""
        created_at = datetime.fromisoformat(row['created_at'].replace('Z', '+00:00')) if row['created_at'] else datetime.now()
        return User(
            id=row['id'],
            name=row['name'],
            email=row['email'],
            created_at=created_at
        )