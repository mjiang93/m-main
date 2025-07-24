"""
Utility decorators for the application
"""
import logging
from functools import wraps
from flask import request, jsonify

def log_request(f):
    """Decorator to log API requests"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        logger = logging.getLogger(__name__)
        logger.info(f"API Request: {request.method} {request.path}")
        return f(*args, **kwargs)
    return decorated_function

def validate_json(f):
    """Decorator to validate JSON input"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.method in ['POST', 'PUT']:
            if not request.is_json:
                return jsonify({
                    "success": False,
                    "message": "Content-Type must be application/json"
                }), 400
        return f(*args, **kwargs)
    return decorated_function