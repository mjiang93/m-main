"""
Health check controller
"""
from flask import Blueprint, jsonify
from datetime import datetime
from utils.response_utils import format_response

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    data = {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Python Backend Service"
    }
    return format_response(success=True, data=data)