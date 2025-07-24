#!/usr/bin/env python3
"""
Database management script
"""
import os
import sqlite3
from database import db

def show_database_info():
    """Show database information"""
    print("🗄️  Database Information")
    print("=" * 50)
    print(f"Database file: {db.db_path}")
    print(f"Database exists: {os.path.exists(db.db_path)}")
    
    if os.path.exists(db.db_path):
        file_size = os.path.getsize(db.db_path)
        print(f"Database size: {file_size} bytes")
    
    print()

def show_users():
    """Show all users in database"""
    print("👥 Users in Database")
    print("=" * 50)
    
    try:
        users = db.execute_query("SELECT * FROM users ORDER BY id")
        if users:
            print(f"{'ID':<5} {'Name':<20} {'Email':<30} {'Created':<20}")
            print("-" * 75)
            for user in users:
                created = user['created_at'][:19] if user['created_at'] else 'N/A'
                print(f"{user['id']:<5} {user['name']:<20} {user['email']:<30} {created:<20}")
        else:
            print("No users found in database")
    except Exception as e:
        print(f"Error reading users: {e}")
    
    print()

def show_database_schema():
    """Show database schema"""
    print("📋 Database Schema")
    print("=" * 50)
    
    try:
        schema = db.execute_query("SELECT sql FROM sqlite_master WHERE type='table'")
        for table in schema:
            print(table['sql'])
            print()
    except Exception as e:
        print(f"Error reading schema: {e}")

def reset_database():
    """Reset database with default data"""
    print("🔄 Resetting Database")
    print("=" * 50)
    
    try:
        # Delete database file if exists
        if os.path.exists(db.db_path):
            os.remove(db.db_path)
            print("✅ Old database deleted")
        
        # Reinitialize database
        db.init_database()
        print("✅ Database recreated with default data")
        
    except Exception as e:
        print(f"❌ Error resetting database: {e}")

def backup_database():
    """Create database backup"""
    import shutil
    from datetime import datetime
    
    print("💾 Creating Database Backup")
    print("=" * 50)
    
    try:
        if not os.path.exists(db.db_path):
            print("❌ Database file not found")
            return
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"app_backup_{timestamp}.db"
        
        shutil.copy2(db.db_path, backup_name)
        print(f"✅ Database backed up to: {backup_name}")
        
    except Exception as e:
        print(f"❌ Error creating backup: {e}")

def main():
    """Main menu"""
    while True:
        print("\n🗄️  Database Management Tool")
        print("=" * 40)
        print("1. Show database info")
        print("2. Show all users")
        print("3. Show database schema")
        print("4. Reset database")
        print("5. Backup database")
        print("6. Exit")
        print()
        
        choice = input("Select option (1-6): ").strip()
        
        if choice == '1':
            show_database_info()
        elif choice == '2':
            show_users()
        elif choice == '3':
            show_database_schema()
        elif choice == '4':
            confirm = input("Are you sure you want to reset the database? (y/N): ")
            if confirm.lower() == 'y':
                reset_database()
        elif choice == '5':
            backup_database()
        elif choice == '6':
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid option. Please try again.")

if __name__ == "__main__":
    main()