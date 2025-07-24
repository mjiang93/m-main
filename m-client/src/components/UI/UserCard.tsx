import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../../services/apiService';
import { apiService } from '../../services/apiService';
import UserEditModal from './UserEditModal';

const CardContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.gradients.primary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

const UserDate = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  opacity: 0.8;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;

  &.edit {
    background: rgba(245, 158, 11, 0.2);
    color: ${({ theme }) => theme.colors.warning};
    border: 1px solid rgba(245, 158, 11, 0.3);

    &:hover {
      background: rgba(245, 158, 11, 0.3);
      transform: translateY(-1px);
    }
  }

  &.delete {
    background: rgba(239, 68, 68, 0.2);
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid rgba(239, 68, 68, 0.3);

    &:hover {
      background: rgba(239, 68, 68, 0.3);
      transform: translateY(-1px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

interface UserCardProps {
  user: User;
  index: number;
  onUserUpdated: (user: User) => void;
  onUserDeleted: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  index,
  onUserUpdated,
  onUserDeleted,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      await apiService.deleteUser(user.id);
      onUserDeleted(user.id);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleUserUpdated = (updatedUser: User) => {
    onUserUpdated(updatedUser);
    setIsEditModalOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <>
      <CardContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        layout
      >
        <UserInfo>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar>{getInitials(user.name)}</Avatar>
            <UserDetails>
              <UserName>{user.name}</UserName>
              <UserEmail>📧 {user.email}</UserEmail>
              <UserDate>📅 Created: {formatDate(user.created_at)}</UserDate>
            </UserDetails>
          </div>
          <ActionButtons>
            <ActionButton
              className="edit"
              onClick={handleEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✏️ Edit
            </ActionButton>
            <ActionButton
              className="delete"
              onClick={handleDelete}
              disabled={isDeleting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDeleting ? '⏳' : '🗑️'} Delete
            </ActionButton>
          </ActionButtons>
        </UserInfo>
      </CardContainer>

      <AnimatePresence>
        {isEditModalOpen && (
          <UserEditModal
            user={user}
            onClose={() => setIsEditModalOpen(false)}
            onUserUpdated={handleUserUpdated}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UserCard;