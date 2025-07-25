import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '@types';
import { generateId } from '@utils';

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    isActive: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'moderator',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    isActive: true,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
    isActive: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleAddUser = () => {
    const newUser: User = {
      id: generateId(),
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    };
    setUsers([...users, newUser]);
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleClass = (role: string) => {
    switch (role) {
      case 'admin': return 'user-role admin';
      case 'moderator': return 'user-role moderator';
      default: return 'user-role user';
    }
  };

  return (
    <div className="w-full">
      <motion.main
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-white m-0">👥 User Management</h2>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddUser}
          >
            + Add User
          </motion.button>
        </div>

        {/* Users Grid or Empty State */}
        {users.length === 0 ? (
          <div className="text-center py-16 px-8 text-gray-400">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2 text-white">No users found</h3>
            <p>Get started by adding your first user.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="user-grid">
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  className="user-card group"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  layout
                >
                  <div className="user-avatar">
                    {getInitials(user.name)}
                  </div>
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <div className="flex justify-between items-center">
                    <span className={getRoleClass(user.role)}>
                      {user.role.toUpperCase()}
                    </span>
                    <motion.button
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-md text-sm font-medium hover:bg-red-500/30 transition-colors"
                      onClick={() => handleRemoveUser(user.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Remove
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Statistics */}
        {users.length > 0 && (
          <motion.div
            className="mt-12 p-6 glass rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">📊 User Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {users.length}
                </div>
                <div className="text-gray-300">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-gray-300">Administrators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {users.filter(u => u.isActive).length}
                </div>
                <div className="text-gray-300">Active Users</div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
};