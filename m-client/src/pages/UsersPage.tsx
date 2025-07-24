import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from '../components/UI/UserCard';
import UserForm from '../components/UI/UserForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { apiService } from '../services/apiService';

const UsersContainer = styled.div`
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormSection = styled(motion.section)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  height: fit-content;
`;

const UsersSection = styled(motion.section)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UsersGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(245, 101, 101, 0.1);
  border: 1px solid rgba(245, 101, 101, 0.3);
  color: ${({ theme }) => theme.colors.error};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1rem;
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(72, 187, 120, 0.1);
  border: 1px solid rgba(72, 187, 120, 0.3);
  color: ${({ theme }) => theme.colors.success};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1rem;
`;

const RefreshButton = styled(motion.button)`
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUsers();
      setUsers(response.data || []);
    } catch (err) {
      setError('Failed to load users. Please make sure the server is running.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
    setSuccess('User created successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setSuccess('User updated successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleUserDeleted = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setSuccess('User deleted successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <UsersContainer>
      <PageHeader>
        <PageTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          User Management
        </PageTitle>
        <PageSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Manage your users with our intuitive interface. Add, edit, and delete users
          with real-time updates and beautiful animations.
        </PageSubtitle>
      </PageHeader>

      <AnimatePresence>
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </ErrorMessage>
        )}
        {success && (
          <SuccessMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {success}
          </SuccessMessage>
        )}
      </AnimatePresence>

      <ContentGrid>
        <FormSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>
            ➕ Add New User
          </SectionTitle>
          <UserForm onUserCreated={handleUserCreated} />
        </FormSection>

        <UsersSection
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <SectionTitle>
              👥 Users List ({users.length})
            </SectionTitle>
            <RefreshButton
              onClick={loadUsers}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Refresh
            </RefreshButton>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : users.length === 0 ? (
            <EmptyState>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👤</div>
              <p>No users found. Add your first user to get started!</p>
            </EmptyState>
          ) : (
            <UsersGrid>
              <AnimatePresence>
                {users.map((user, index) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    index={index}
                    onUserUpdated={handleUserUpdated}
                    onUserDeleted={handleUserDeleted}
                  />
                ))}
              </AnimatePresence>
            </UsersGrid>
          )}
        </UsersSection>
      </ContentGrid>
    </UsersContainer>
  );
};

export default UsersPage;