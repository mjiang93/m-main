"""
Response utility functions
"""
from flask import jsonify

def format_response(success=True, data=None, message=None, status_code=200):
    """Format API response"""
    response = {"success": success}
    
    if data is not None:
        response["data"] = data
        if isinstance(data, list):
            response["count"] = len(data)
    
    if message:
        response["message"] = message
    
    return jsonify(response), status_code