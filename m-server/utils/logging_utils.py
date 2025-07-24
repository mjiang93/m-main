"""
Logging utility functions
"""
import logging
from datetime import datetime

def setup_logging():
    """Setup application logging"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('app.log'),
            logging.StreamHandler()
        ]
    )

def get_timestamp():
    """Get current timestamp in ISO format"""
    return datetime.now().isoformat()