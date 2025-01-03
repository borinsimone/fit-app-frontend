import React, { useState } from 'react';
import { MdAdd, MdClose, MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';

import Timer from './Timer';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';

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

  const [newExerciseName, setNewExerciseName] = useState('');

  return (
    <Container>
      <MdClose
        className='close'
        onClick={() => close()}
      />
      <AnimatePresence mode='wait'>
        {timer && (
          <Timer
            timer={timer}
            restTime={timer}
            clear={() => setTimer(null)}
          />
        )}
      </AnimatePresence>
      <Content>
        <h1>{currentSection?.name}</h1>
        {currentSection?.exercises.map((exercise, exerciseIndex) => (
          <ExerciseCon key={exercise._id}>
            <div className='exHeader'>
              <h2>{exercise.name}</h2>
              <button
                className='deleteBtn'
                onClick={() => {
                  const updatedSection = { ...currentSection };
                  updatedSection.exercises.splice(exerciseIndex, 1);

                  setSelectedWorkout((prevWorkout) => {
                    const updatedWorkout = { ...prevWorkout };
                    const sectionIndex = updatedWorkout.sections.findIndex(
                      (sec) => sec._id === currentSection._id
                    );
                    updatedWorkout.sections[sectionIndex] = updatedSection;
                    return updatedWorkout;
                  });
                }}
              >
                <MdDelete size={20} />
              </button>
            </div>
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
                  <Item key={setIndex}>
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
                    <td>
                      <button
                        className='deleteBtn'
                        onClick={() => {
                          const updatedSection = { ...currentSection };
                          updatedSection.exercises[
                            exerciseIndex
                          ].exerciseSets.splice(setIndex, 1);

                          setSelectedWorkout((prevWorkout) => {
                            const updatedWorkout = { ...prevWorkout };
                            const sectionIndex =
                              updatedWorkout.sections.findIndex(
                                (sec) => sec._id === currentSection._id
                              );
                            updatedWorkout.sections[sectionIndex] =
                              updatedSection;
                            return updatedWorkout;
                          });
                        }}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </Item>
                ))}
                <tr>
                  <td colSpan='5'>
                    <button
                      className='addBtn'
                      onClick={() => {
                        const updatedSection = { ...currentSection };
                        const lastSet =
                          exercise.exerciseSets[
                            exercise.exerciseSets.length - 1
                          ];
                        const newSet = { ...lastSet, completed: false };
                        updatedSection.exercises[
                          exerciseIndex
                        ].exerciseSets.push(newSet);

                        setSelectedWorkout((prevWorkout) => {
                          const updatedWorkout = { ...prevWorkout };
                          const sectionIndex =
                            updatedWorkout.sections.findIndex(
                              (sec) => sec._id === currentSection._id
                            );
                          updatedWorkout.sections[sectionIndex] =
                            updatedSection;
                          return updatedWorkout;
                        });
                      }}
                    >
                      <MdAdd size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </ExerciseCon>
        ))}
        <NewExerciseContainer>
          <input
            type='text'
            placeholder='New Exercise Name'
            value={newExerciseName}
            onChange={(e) => setNewExerciseName(e.target.value)}
          />
          <button
            onClick={() => {
              const updatedSection = { ...currentSection };
              const newExercise = {
                _id: Date.now().toString(),
                name: newExerciseName,
                exerciseSets: [],
              };
              updatedSection.exercises.push(newExercise);

              setSelectedWorkout((prevWorkout) => {
                const updatedWorkout = { ...prevWorkout };
                const sectionIndex = updatedWorkout.sections.findIndex(
                  (sec) => sec._id === currentSection._id
                );
                updatedWorkout.sections[sectionIndex] = updatedSection;
                return updatedWorkout;
              });

              setNewExerciseName('');
            }}
          >
            Add Exercise
          </button>
        </NewExerciseContainer>
      </Content>
    </Container>
  );
}

export default SectionAssistant;

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 50px 20px;
  /* padding-top: 0; */

  /* overflow-y: auto; */
  z-index: 10;
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

  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: scroll;
  scroll-snap-type: y mandatory; /* Snap orizzontale obbligatorio */

  h1 {
    font-size: 1.5em;
  }
`;

const ExerciseContainer = styled.div`
  scroll-snap-align: top; /* Gli elementi si allineano al centro */

  width: 100%;
  h2 {
    font-size: 1.2em;
  }
  .exHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .deleteBtn {
      all: unset;
      background-color: red;
      border-radius: 50%;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    button {
      all: unset;
    }
    .addBtn {
      background-color: ${({ theme }) => theme.colors.light};
      border-radius: 50%;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .deleteBtn {
      background-color: red;
      border-radius: 50%;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
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
    tr {
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
const NewExerciseContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  input {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 5px;
    width: 200px;
  }

  button {
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;
const Item = ({ children, key }) => {
  const isPresent = useIsPresent();
  const animation = {
    style: {
      position: isPresent ? 'static' : 'absolute',
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  };
  return (
    <motion.tr
      {...animation}
      key={key}
      layout
    >
      {children}
    </motion.tr>
  );
};
const ExerciseCon = ({ children, key }) => {
  const isPresent = useIsPresent();
  const animation = {
    style: {
      position: isPresent ? 'static' : 'absolute',
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  };
  return (
    <ExerciseContainer
      as={motion.div}
      {...animation}
      key={key}
      layout
    >
      {children}
    </ExerciseContainer>
  );
};
