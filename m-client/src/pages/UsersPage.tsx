import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { User } from '@types';
import { generateId } from '@utils';

const UsersContainer = styled.div`
  width: 100%;
`;

const Content = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const AddButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.gradients.primary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const UserCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
`;

const UserName = styled.h3`
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`;

const UserRole = styled.span<{ role: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.role) {
      case 'admin': return 'rgba(239, 68, 68, 0.2)';
      case 'moderator': return 'rgba(245, 158, 11, 0.2)';
      default: return 'rgba(16, 185, 129, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.role) {
      case 'admin': return '#ef4444';
      case 'moderator': return '#f59e0b';
      default: return '#10b981';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <UsersContainer>
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header>
          <Title>👥 User Management</Title>
          <AddButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddUser}
          >
            + Add User
          </AddButton>
        </Header>

        {users.length === 0 ? (
          <EmptyState>
            <EmptyIcon>👤</EmptyIcon>
            <h3>No users found</h3>
            <p>Get started by adding your first user.</p>
          </EmptyState>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <UserGrid>
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <UserAvatar>
                    {getInitials(user.name)}
                  </UserAvatar>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                  <UserRole role={user.role}>
                    {user.role.toUpperCase()}
                  </UserRole>
                </UserCard>
              ))}
            </UserGrid>
          </motion.div>
        )}
      </Content>
    </UsersContainer>
  );
};