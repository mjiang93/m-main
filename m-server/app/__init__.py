"""
Flask application factory
"""
from flask import Flask
from flask_cors import CORS
from config import config
import os

def create_app(config_name=None):
    """Create and configure Flask application"""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    CORS(app)
    
    # Register blueprints
    from controllers.user_controller import user_bp
    from controllers.health_controller import health_bp
    
    app.register_blueprint(health_bp)
    app.register_blueprint(user_bp, url_prefix='/api')
    
    # Register error handlers
    from controllers.error_controller import register_error_handlers
    register_error_handlers(app)
    
    return app