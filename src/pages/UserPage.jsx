import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { MdEdit, MdPerson, MdEmail, MdFitness } from 'react-icons/md';

function UserPage() {
  const { user } = useGlobalContext();

  if (!user) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container onClick={() => console.log(user)}>
      <ProfileCard>
        <ProfileHeader>
          <ProfileImage>
            <MdPerson size={40} />
          </ProfileImage>
          <h2>{user.name}</h2>
        </ProfileHeader>

        <InfoSection>
          <InfoItem>
            <MdEmail />
            <span>{user.email}</span>
          </InfoItem>

          <InfoItem>
            {/* <MdFitness /> */}
            {/* <span>Workouts completed: {user.completedWorkouts || 0}</span> */}
          </InfoItem>
        </InfoSection>
      </ProfileCard>
    </Container>
  );
}

export default UserPage;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
  }
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
