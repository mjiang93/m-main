#!/usr/bin/env python3
"""
Application entry point
"""
import os
from app import create_app
from utils.logging_utils import setup_logging

if __name__ == '__main__':
    # Setup logging
    setup_logging()
    
    # Create Flask application
    config_name = os.environ.get('FLASK_ENV', 'development')
    app = create_app(config_name)
    
    # Run the application
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])
