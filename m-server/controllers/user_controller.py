"""
User controller for handling user-related HTTP requests
"""
from flask import Blueprint, request
from services import UserService
from utils.decorators import validate_json, log_request
from utils.response_utils import format_response
import logging

user_bp = Blueprint('users', __name__)
user_service = UserService()
logger = logging.getLogger(__name__)

@user_bp.route('/users', methods=['GET'])
@log_request
def get_users():
    """Get all users"""
    try:
        users = user_service.get_all_users()
        return format_response(success=True, data=users)
    except Exception as e:
        logger.error(f"Error getting users: {e}")
        return format_response(success=False, message="Internal server error", status_code=500)

@user_bp.route('/users/<int:user_id>', methods=['GET'])
@log_request
def get_user(user_id):
    """Get user by ID"""
    try:
        user = user_service.get_user_by_id(user_id)
        if user:
            return format_response(success=True, data=user)
        return format_response(success=False, message="User not found", status_code=404)
    except Exception as e:
        logger.error(f"Error getting user {user_id}: {e}")
        return format_response(success=False, message="Internal server error", status_code=500)

@user_bp.route('/users', methods=['POST'])
@log_request
@validate_json
def create_user():
    """Create new user"""
    try:
        data = request.get_json()
        
        if not data or not data.get('name') or not data.get('email'):
            return format_response(
                success=False, 
                message="Name and email are required", 
                status_code=400
            )
        
        user = user_service.create_user(data['name'], data['email'])
        return format_response(
            success=True, 
            data=user, 
            message="User created successfully", 
            status_code=201
        )
    except ValueError as e:
        return format_response(success=False, message=str(e), status_code=400)
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        return format_response(success=False, message="Internal server error", status_code=500)

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
@log_request
@validate_json
def update_user(user_id):
    """Update user"""
    try:
        data = request.get_json()
        
        user = user_service.update_user(
            user_id, 
            data.get('name'), 
            data.get('email')
        )
        
        if user:
            return format_response(
                success=True, 
                data=user, 
                message="User updated successfully"
            )
        return format_response(success=False, message="User not found", status_code=404)
    except ValueError as e:
        return format_response(success=False, message=str(e), status_code=400)
    except Exception as e:
        logger.error(f"Error updating user {user_id}: {e}")
        return format_response(success=False, message="Internal server error", status_code=500)

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
@log_request
def delete_user(user_id):
    """Delete user"""
    try:
        if user_service.delete_user(user_id):
            return format_response(success=True, message="User deleted successfully")
        return format_response(success=False, message="User not found", status_code=404)
    except Exception as e:
        logger.error(f"Error deleting user {user_id}: {e}")
        return format_response(success=False, message="Internal server error", status_code=500)