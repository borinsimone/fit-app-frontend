import React, { useState, useEffect } from 'react';
import { MdTune, MdDelete, MdAdd } from 'react-icons/md';
import styled from 'styled-components';

function ChecklistWidget() {
  const [checklist, setChecklist] = useState(
    JSON.parse(localStorage.getItem('checklist')) || []
  );
  const [newItem, setNewItem] = useState('');

  // Salva la checklist quando cambia
  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Reset a mezzanotte
  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timer = setTimeout(() => {
      setChecklist((prev) =>
        prev.map((item) => ({ ...item, completed: false }))
      );
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [checklist]);

  const toggleCheckbox = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setChecklist((prev) => [
      ...prev,
      { id: Date.now(), text: newItem, completed: false },
    ]);
    setNewItem('');
  };

  const deleteItem = (id) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <MdTune
        className='settingIcon'
        onClick={() => {
          console.log('Apri impostazioni per il widget di oggi');
          alert('impostazioni per i widget verranno aggiunte presto!');
        }}
      />
      <h3>Obiettivi</h3>
      <Checklist>
        {checklist.map((item) => (
          <ChecklistItem key={item.id}>
            <Checkbox
              checked={item.completed}
              onClick={() => toggleCheckbox(item.id)}
            >
              {item.completed && <div className='inner' />}
            </Checkbox>
            <div
              className='checklistInfo'
              style={{
                opacity: item.completed ? 0.5 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <span>{item.text}</span>
            </div>
            <MdDelete
              className='deleteIcon'
              onClick={() => deleteItem(item.id)}
            />
          </ChecklistItem>
        ))}
      </Checklist>
      <AddItemContainer>
        <input
          type='text'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder='Aggiungi nuovo elemento'
        />
        <MdAdd
          className='addIcon'
          onClick={addItem}
        />
      </AddItemContainer>
    </Container>
  );
}

export default ChecklistWidget;
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
  flex: 1;
  aspect-ratio: 1;
  padding: 15px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
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

const Checklist = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 60%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChecklistItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;

  .icon {
    font-size: 20px;
    color: #00c6be;
    transition: color 0.3s ease;
  }

  .icon.checked {
    color: #00c6be; /* Verde */
  }

  .deleteIcon {
    font-size: 20px;
    color: #ff4d4d;
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  span {
    flex: 1;
    font-size: 0.7em;
    color: #d9d9d9;
    transition: opacity 0.3s ease;
  }

  span.completed {
    text-decoration: line-through;
    opacity: 0.5;
  }
`;

const AddItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 100%;
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
