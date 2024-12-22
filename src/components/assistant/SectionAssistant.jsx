import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import TimerAssistant from './TimerAssistant';

function SectionAssistant({ currentSection, close }) {
  const { selectedWorkout, setSelectedWorkout } = useGlobalContext();
  const [timer, setTimer] = useState(null);

  const handleInputChange = (e, exerciseIndex, setIndex, field) => {
    const value = e.target.value;
    const updatedSection = { ...currentSection };
    const set = updatedSection.exercises[exerciseIndex].exerciseSets[setIndex];
    set[field] = value;

    setSelectedWorkout((prevWorkout) => {
      const updatedWorkout = { ...prevWorkout };
      const sectionIndex = updatedWorkout.sections.findIndex(
        (sec) => sec._id === currentSection._id
      );
      updatedWorkout.sections[sectionIndex] = updatedSection;
      return updatedWorkout;
    });
  };

  const handleCheckboxChange = (exerciseIndex, setIndex) => {
    const updatedSection = { ...currentSection };
    const set = updatedSection.exercises[exerciseIndex].exerciseSets[setIndex];
    set.completed = !set.completed;

    if (set.completed) {
      const restTime = set.rest; // Convert rest time to milliseconds
      setTimer(restTime);
    }

    setSelectedWorkout((prevWorkout) => {
      const updatedWorkout = { ...prevWorkout };
      const sectionIndex = updatedWorkout.sections.findIndex(
        (sec) => sec._id === currentSection._id
      );
      updatedWorkout.sections[sectionIndex] = updatedSection;
      return updatedWorkout;
    });
  };

  return (
    <Container>
      <MdClose
        className='close'
        onClick={() => close()}
      />
      <Content>
        <h1>{currentSection?.name}</h1>
        {currentSection?.exercises.map((exercise, exerciseIndex) => (
          <ExerciseContainer key={exercise._id}>
            <h2>{exercise.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Set</th>
                  <th>Reps/Time</th>
                  <th>Weight</th>
                  <th>Rest</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {exercise.exerciseSets.map((set, setIndex) => (
                  <tr key={setIndex}>
                    <td>{setIndex + 1}</td>
                    <td>
                      <input
                        className='input'
                        type='number'
                        value={exercise.timeBased ? set.time : set.reps}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            exerciseIndex,
                            setIndex,
                            exercise.timeBased ? 'time' : 'reps'
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className='input'
                        type='number'
                        value={exercise.timeBased ? '-' : set.weight}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            exerciseIndex,
                            setIndex,
                            'weight'
                          )
                        }
                        disabled={exercise.timeBased}
                      />
                    </td>
                    <td>
                      <input
                        className='input'
                        type='number'
                        value={set.rest}
                        onChange={(e) =>
                          handleInputChange(e, exerciseIndex, setIndex, 'rest')
                        }
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        checked={set.completed || false}
                        onChange={() =>
                          handleCheckboxChange(exerciseIndex, setIndex)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ExerciseContainer>
        ))}
      </Content>
      {timer && (
        <TimerAssistant
          restTime={timer}
          clear={() => setTimer(null)}
        />
      )}
    </Container>
  );
}

export default SectionAssistant;

const Container = styled.div`
  position: absolute;
  height: 100dvh;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2em;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h1 {
    font-size: 1.5em;
  }
`;

const ExerciseContainer = styled.div`
  width: 100%;
  h2 {
    font-size: 1.2em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      padding: 10px 0;
      text-align: center;
    }
    th {
      color: white;
    }
    td {
      .input {
        all: unset;
        width: 30px;
      }
    }
    input[type='checkbox'] {
      appearance: none; /* Remove native checkbox styling */
      -webkit-appearance: none; /* For Safari */
      -moz-appearance: none; /* For Firefox */
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 4px; /* Rounded corners */
      cursor: pointer;
      background-color: #fff;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    input[type='checkbox']:checked {
      background-color: #00c6be; /* Fill color when checked */
    }

    input[type='checkbox']:checked::after {
      content: ''; /* Checkmark */
      font-size: 14px;
      color: white;
      display: block;
      text-align: center;
      line-height: 20px;
    }
  }
`;
