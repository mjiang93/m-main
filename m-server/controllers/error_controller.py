"""
Error handlers for the application
"""
from flask import jsonify
from utils.response_utils import format_response

def register_error_handlers(app):
    """Register error handlers with the Flask app"""
    
    @app.errorhandler(404)
    def not_found(error):
        return format_response(
            success=False, 
            message="Endpoint not found", 
            status_code=404
        )
    
    @app.errorhandler(405)
    def method_not_allowed(error):
        return format_response(
            success=False, 
            message="Method not allowed", 
            status_code=405
        )
    
    @app.errorhandler(500)
    def internal_error(error):
        return format_response(
            success=False, 
            message="Internal server error", 
            status_code=500
        )
    
    @app.errorhandler(400)
    def bad_request(error):
        return format_response(
            success=False, 
            message="Bad request", 
            status_code=400
        )