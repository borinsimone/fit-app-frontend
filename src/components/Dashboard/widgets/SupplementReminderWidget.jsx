import React, { useState, useEffect } from 'react';
import { MdTune, MdDelete, MdAdd, MdAccessTime } from 'react-icons/md';
import styled from 'styled-components';

function SupplementsReminderWidget() {
  const [reminders, setReminders] = useState(
    JSON.parse(localStorage.getItem('supplementsReminders')) || []
  );
  const [newSupplement, setNewSupplement] = useState('');
  const [newTime, setNewTime] = useState('');

  // Salva i promemoria nel localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem('supplementsReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();
    const timer = setTimeout(() => {
      setReminders((prev) => {
        prev.map((item) => ({
          ...item,
          completed: false,
        }));
      });
    }, msUntilMidnight);
  }, [reminders]);

  const toggleCheckbox = (id) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const addItem = () => {
    if (!newSupplement.trim()) return;
    setReminders((prev) => [
      ...prev,
      {
        id: Date.now(),
        supplement: newSupplement,
        time: newTime,
        completed: false,
      },
    ]);
  };

  const deleteItem = (id) => {
    setReminders((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSettingsClick = () => {
    console.log('Apri impostazioni per i promemoria integratori');
  };

  return (
    <Container>
      <MdTune
        className='settingIcon'
        onClick={handleSettingsClick}
      />
      <h3>Promemoria Integratori</h3>
      <RemindersList>
        {reminders.map((reminder) => (
          <ReminderItem key={reminder.id}>
            <Checkbox
              checked={reminder.completed}
              onClick={() => toggleCheckbox(reminder.id)}
            >
              {reminder.completed && <div className='inner' />}
            </Checkbox>
            <div
              className='supplementInfo'
              style={{
                opacity: reminder.completed ? 0.5 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <span>{reminder.supplement}</span>
              <span className='time'>{reminder.time}</span>
            </div>
            <MdDelete
              className='deleteIcon'
              onClick={() => deleteItem(reminder.id)}
            />
          </ReminderItem>
        ))}
      </RemindersList>
      <AddReminderContainer>
        <input
          type='text'
          value={newSupplement}
          onChange={(e) => setNewSupplement(e.target.value)}
          placeholder='Nome integratore'
        />
        <div style={{ position: 'relative' }}>
          <input
            type='time'
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
          <MdAccessTime
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              color: '#00c6be',
            }}
          />
        </div>
        <MdAdd
          className='addIcon'
          onClick={addItem}
        />
      </AddReminderContainer>
    </Container>
  );
}
export default SupplementsReminderWidget;
const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #00c6be;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ checked }) => (checked ? '#00c6be' : 'transparent')};

  .inner {
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
  }
`;

const Container = styled.div`
  position: relative;
  color: #d9d9d9;
  background-color: #d9d9d910;
  border: 1px solid #00c6be;
  box-shadow: 0 0 30px #00000075;
  border-radius: 20px;
  width: 90%;

  padding: 20px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
    color: #00c6be;
  }

  .settingIcon {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 10px;
    opacity: 0.7;
    cursor: pointer;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
`;

const RemindersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReminderItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;

  .supplementInfo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .timeIcon {
    font-size: 16px;
    color: #00c6be;
  }

  .time {
    font-size: 0.9em;
    color: #d9d9d9;
    opacity: 0.8;
  }

  .deleteIcon {
    font-size: 20px;
    color: #ff4d4d;
    cursor: pointer;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
  }

  span {
    font-size: 0.9em;
    color: #d9d9d9;
  }
`;

const AddReminderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;

  input[type='text'] {
    flex: 2;
    padding: 5px 10px;
    border: 1px solid #00c6be;
    border-radius: 10px;
    color: #d9d9d9;
    background: transparent;
    outline: none;
    font-size: 0.9em;

    &::placeholder {
      color: #d9d9d950;
    }
  }

  input[type='time'] {
    flex: 1;
    padding: 5px;
    border: 1px solid #00c6be;
    border-radius: 10px;
    color: #d9d9d9;
    background: transparent;
    outline: none;
    font-size: 0.9em;
    padding-right: 30px;
  }
  input[type='time']::-webkit-calendar-picker-indicator {
    display: none; /* Nasconde l'icona predefinita */
  }

  .addIcon {
    font-size: 25px;
    color: #00c6be;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;
