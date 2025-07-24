/**
 * Main Application Logic for M-Client Frontend
 */
class UserManager {
    constructor() {
        this.users = [];
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.checkAPIStatus();
        this.loadUsers();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // User form submission
        document.getElementById('user-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateUser(e);
        });

        // Edit form submission
        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpdateUser(e);
        });

        // Refresh button
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.loadUsers();
        });

        // Modal close events
        document.querySelector('.close').addEventListener('click', () => {
            this.closeEditModal();
        });

        window.addEventListener('click', (e) => {
            const modal = document.getElementById('edit-modal');
            if (e.target === modal) {
                this.closeEditModal();
            }
        });
    }

    /**
     * Check API server status
     */
    async checkAPIStatus() {
        const statusElement = document.getElementById('api-status');
        const statusDot = statusElement.querySelector('.status-dot');
        const statusText = statusElement.querySelector('.status-text');

        try {
            const response = await api.checkHealth();
            if (response.success) {
                statusDot.className = 'status-dot online';
                statusText.textContent = 'API Server Online';
            }
        } catch (error) {
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'API Server Offline';
            this.showMessage('Cannot connect to API server. Please make sure m-server is running.', 'error');
        }
    }

    /**
     * Load users from API
     */
    async loadUsers() {
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '<div class="loading">Loading users...</div>';

        try {
            const response = await api.getUsers();
            if (response.success) {
                this.users = response.data;
                this.renderUsers();
            }
        } catch (error) {
            usersList.innerHTML = '<div class="loading">Failed to load users</div>';
            this.showMessage('Failed to load users: ' + error.message, 'error');
        }
    }

    /**
     * Render users list
     */
    renderUsers() {
        const usersList = document.getElementById('users-list');
        
        if (this.users.length === 0) {
            usersList.innerHTML = '<div class="loading">No users found</div>';
            return;
        }

        const usersHTML = this.users.map(user => `
            <div class="user-card">
                <div class="user-info">
                    <div>
                        <div class="user-name">${this.escapeHtml(user.name)}</div>
                        <div class="user-email">${this.escapeHtml(user.email)}</div>
                    </div>
                    <div class="user-actions">
                        <button class="btn btn-edit" onclick="userManager.editUser(${user.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="userManager.deleteUser(${user.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        usersList.innerHTML = usersHTML;
    }

    /**
     * Handle create user form submission
     */
    async handleCreateUser(event) {
        const formData = new FormData(event.target);
        const userData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim()
        };

        if (!userData.name || !userData.email) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        try {
            const response = await api.createUser(userData);
            if (response.success) {
                this.showMessage('User created successfully!', 'success');
                event.target.reset();
                this.loadUsers();
            }
        } catch (error) {
            this.showMessage('Failed to create user: ' + error.message, 'error');
        }
    }

    /**
     * Handle update user form submission
     */
    async handleUpdateUser(event) {
        const formData = new FormData(event.target);
        const userId = document.getElementById('edit-user-id').value;
        const userData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim()
        };

        if (!userData.name || !userData.email) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        try {
            const response = await api.updateUser(userId, userData);
            if (response.success) {
                this.showMessage('User updated successfully!', 'success');
                this.closeEditModal();
                this.loadUsers();
            }
        } catch (error) {
            this.showMessage('Failed to update user: ' + error.message, 'error');
        }
    }

    /**
     * Edit user - open modal with user data
     */
    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            this.showMessage('User not found', 'error');
            return;
        }

        document.getElementById('edit-user-id').value = user.id;
        document.getElementById('edit-name').value = user.name;
        document.getElementById('edit-email').value = user.email;
        
        document.getElementById('edit-modal').style.display = 'block';
    }

    /**
     * Delete user with confirmation
     */
    async deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            this.showMessage('User not found', 'error');
            return;
        }

        if (!confirm(`Are you sure you want to delete user "${user.name}"?`)) {
            return;
        }

        try {
            const response = await api.deleteUser(userId);
            if (response.success) {
                this.showMessage('User deleted successfully!', 'success');
                this.loadUsers();
            }
        } catch (error) {
            this.showMessage('Failed to delete user: ' + error.message, 'error');
        }
    }

    /**
     * Close edit modal
     */
    closeEditModal() {
        document.getElementById('edit-modal').style.display = 'none';
        document.getElementById('edit-form').reset();
    }

    /**
     * Show message to user
     */
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert at the top of main content
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global function to close modal (called from HTML)
function closeEditModal() {
    userManager.closeEditModal();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.userManager = new UserManager();
});