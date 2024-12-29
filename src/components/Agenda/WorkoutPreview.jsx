import React, { useEffect, useRef, useState } from 'react';
import { LuTableOfContents } from 'react-icons/lu';
import styled from 'styled-components';
import Button from '../UI/Button';
import { GiMuscleUp } from 'react-icons/gi';
import { useGlobalContext } from '../../context/GlobalContext';
import { BiCheck } from 'react-icons/bi';
import {
  addWorkouts,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from '../../services/workoutService';
import { useNavigate } from 'react-router-dom';
import { MdClose, MdDelete } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

function WorkoutPreview({
  workout,
  date,
  setCalendarExpanded,
  previewExpanded,
  setPreviewExpanded,
}) {
  const {
    workouts,
    workoutDateBuffer,
    setWorkoutDateBuffer,
    setWorkoutFormOpen,
    setSelectedWorkout,
    setWorkouts,
  } = useGlobalContext();
  const navigate = useNavigate();

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await deleteWorkout(id, token);
      console.log(response);
      const updatedWorkouts = await getWorkouts();
      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };
  //repeat workout
  const [selectWorkout, setSelectWorkout] = useState(false);
  const handleAddWorkout = async (workout) => {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    newDate.toISOString();
    // console.log(newDate, workout.date);

    const newWorkout = { ...workout };
    newWorkout.date = newDate.toISOString();
    newWorkout.completed = false;
    newWorkout.feedback.feeling = null;
    newWorkout.feedback.notes = '';
    console.log(newWorkout);
    const response = await addWorkouts(newWorkout);
    // await refreshWorkouts();
    console.log(response);
    if (response.status === 200) {
      alert('Workout aggiunto');
      setSelectWorkout(false);
      const updatedWorkouts = getWorkouts();
      setWorkouts(updatedWorkouts);
    }
  };
  // Show workout details
  const [showWorkout, setShowWorkout] = useState(false);
  const [workoutToShow, setWorkoutToShow] = useState(null);

  useEffect(() => {
    setSelectWorkout(false);
    setShowWorkout(false);
    setWorkoutToShow(null);
  }, [date]);
  const scrollableRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = scrollableRef.current;

      if (scrollTop <= 0) {
        console.log('top');
        setCalendarExpanded(true);
      } else {
        console.log('down');
        setCalendarExpanded(false);
      }
    };

    const scrollableElement = scrollableRef.current;
    scrollableElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollableElement.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState(null);
  // Add update handler
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateWorkout(editedWorkout._id, editedWorkout, token);
      // refreshWorkouts();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };
  // Add these handlers after other state declarations
  const handleSetChange = (sectionIndex, exerciseIndex, setIndex, field, e) => {
    const value = e.target.value;
    setEditedWorkout((prev) => {
      const newWorkout = { ...prev };
      const set =
        newWorkout.sections[sectionIndex].exercises[exerciseIndex].exerciseSets[
          setIndex
        ];
      set[field] = value;
      return newWorkout;
    });
  };

  const handleExerciseChange = (sectionIndex, exerciseIndex, e) => {
    const value = e.target.value;
    setEditedWorkout((prev) => {
      const newWorkout = { ...prev };
      newWorkout.sections[sectionIndex].exercises[exerciseIndex].name = value;
      return newWorkout;
    });
  };

  const handleAddSection = () => {
    setEditedWorkout((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          name: 'Nuova Sezione',
          exercises: [
            {
              name: 'Nuovo Esercizio',
              timeBased: false,
              exerciseSets: [
                {
                  reps: 0,
                  weight: 0,
                  rest: 0,
                  time: 0,
                },
              ],
            },
          ],
        },
      ],
    }));
  };

  const handleRemoveSection = (sectionIndex) => {
    setEditedWorkout((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex),
    }));
  };

  const handleAddExercise = (sectionIndex) => {
    setEditedWorkout((prev) => {
      const newWorkout = { ...prev };
      newWorkout.sections[sectionIndex].exercises.push({
        name: 'Nuovo Esercizio',
        timeBased: false,
        exerciseSets: [
          {
            reps: 0,
            weight: 0,
            rest: 0,
            time: 0,
          },
        ],
      });
      return newWorkout;
    });
  };

  const handleRemoveExercise = (sectionIndex, exerciseIndex) => {
    setEditedWorkout((prev) => {
      const newWorkout = { ...prev };
      newWorkout.sections[sectionIndex].exercises = newWorkout.sections[
        sectionIndex
      ].exercises.filter((_, index) => index !== exerciseIndex);
      return newWorkout;
    });
  };

  const handleAddSet = (sectionIndex, exerciseIndex) => {
    setEditedWorkout((prev) => {
      const newWorkout = { ...prev };
      const exercise =
        newWorkout.sections[sectionIndex].exercises[exerciseIndex];
      const lastSet = exercise.exerciseSets[exercise.exerciseSets.length - 1];
      exercise.exerciseSets.push({ ...lastSet });
      return newWorkout;
    });
  };

  const handleRemoveSet = (sectionIndex, exerciseIndex, setIndex) => {
    setEditedWorkout((prev) => {
      const newWorkout = { ...prev };
      const exercise =
        newWorkout.sections[sectionIndex].exercises[exerciseIndex];
      exercise.exerciseSets = exercise.exerciseSets.filter(
        (_, index) => index !== setIndex
      );
      return newWorkout;
    });
  };

  return (
    <Container ref={scrollableRef}>
      {workout?.map((wor) => (
        <div
          className='workoutContainer'
          key={wor._id}
          onClick={() => {
            setCalendarExpanded(false);
            setPreviewExpanded(true);
          }}
        >
          {wor.completed ? (
            <Button>
              <div className='text'>Modifica allenamento</div>
            </Button>
          ) : (
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button
                onClick={() => {
                  setSelectedWorkout(wor);
                  localStorage.setItem('selectedWorkout', JSON.stringify(wor));
                  navigate('/assistant');
                }}
              >
                <div className='text'>AVVIA SESSIONE</div>
              </Button>
              <MdDelete
                style={{ position: 'absolute', right: '10px' }}
                onClick={() => deleteItem(wor._id)}
              />
            </div>
          )}
          <div className='title'>dettagli</div>
          <SectionContainer>
            <div className='icon'>
              <LuTableOfContents />
            </div>

            <div className='detailList'>
              <div className='detail'>
                <div className='label'>Data:</div>
                <div className='text'>
                  {new Date(wor.date).toLocaleDateString('it-IT')}
                </div>
              </div>
              <div className='detail'>
                <div className='label'>Inizio:</div>
                <div className='text'>
                  {new Date(wor.start).toLocaleTimeString('it-IT', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <div className='detail'>
                <div className='label'>Note:</div>
                <div className='text'>{wor.notes}</div>
              </div>
              <div className='detail'>
                <div className='label'>Completato:</div>
                <div className='text'>
                  {wor.completed ? <BiCheck /> : <>no</>}
                </div>
              </div>
            </div>
          </SectionContainer>
          <div className='title'>sezioni</div>
          {wor.sections.map((section) => (
            <SectionContainer key={section._id}>
              <div className='icon'>
                <GiMuscleUp />
              </div>
              <div className='detailList'>
                <div className='sectionName'>{section.name}</div>
                {section.exercises.map((exercise, i) => (
                  <div
                    className='exercise'
                    key={exercise._id}
                  >
                    <div className='name'>{exercise.name}</div>
                    {exercise.timeBased ? (
                      <div className='exerciseDetails'>
                        {exercise.exerciseSets.length} x{' '}
                        {exercise.exerciseSets
                          .map((set, index) => `${set.time}''`)
                          .join(' / ')}{' '}
                        Rest:{' '}
                        {exercise.exerciseSets
                          .map((set, index) => `${set.rest}''`)
                          .join(' / ')}{' '}
                      </div>
                    ) : (
                      <div className='exerciseDetails'>
                        {exercise.exerciseSets.length} x{' '}
                        {exercise.exerciseSets
                          .map((set, index) => `${set.reps} reps`)
                          .join(' / ')}{' '}
                        {exercise.exerciseSets
                          .map((set, index) => `${set.weight}kg`)
                          .join(' / ')}{' '}
                        <br />
                        Rest:{' '}
                        {exercise.exerciseSets
                          .map((set, index) => `${set.rest}''`)
                          .join(' / ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionContainer>
          ))}

          {/* {wor.completed ? (
            <Button
              onClick={() => {
                setIsEditing(true);
                setEditedWorkout({ ...wor });
              }}
            >
              <div className='text'>Modifica allenamento</div>
            </Button>
          ) : (
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button
                onClick={() => {
                  setSelectedWorkout(wor);
                  localStorage.setItem('selectedWorkout', JSON.stringify(wor));
                  navigate('/assistant');
                }}
              >
                <div className='text'>AVVIA SESSIONE</div>
              </Button>
              <MdDelete
                style={{ position: 'absolute', right: '10px' }}
                onClick={() => deleteItem(wor._id)}
              />
            </div>
          )} */}

          {/* {isEditing ? (
            <div className='edit'>
              <div className='title'>dettagli</div>
              <SectionContainer>
                <div className='icon'>
                  <LuTableOfContents />
                </div>
                <div className='detailList'>
                  <div className='detail'>
                    <div className='label'>Data:</div>
                    <Input
                      type='date'
                      value={
                        new Date(editedWorkout.date).toISOString().split('T')[0]
                      }
                      onChange={(e) =>
                        setEditedWorkout({
                          ...editedWorkout,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='detail'>
                    <div className='label'>Note:</div>
                    <Input
                      type='text'
                      value={editedWorkout.notes}
                      onChange={(e) =>
                        setEditedWorkout({
                          ...editedWorkout,
                          notes: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </SectionContainer>
              <div className='title'>sezioni</div>
              {editedWorkout.sections.map((section, sectionIndex) => (
                <SectionContainer key={section._id}>
                  <div className='icon'>
                    <GiMuscleUp />
                  </div>
                  <div className='detailList'>
                    <div className='input-group'>
                      <div className='section-header'>
                        <Input
                          type='text'
                          value={section.name}
                          // onChange={(e) => handleSectionChange(sectionIndex, e)}
                        />
                        <ActionButton
                          onClick={() => handleRemoveSection(sectionIndex)}
                        >
                          <MdDelete />
                        </ActionButton>
                      </div>
                      <Label>Nome Sezione:</Label>
                      <Input
                        type='text'
                        value={section.name}
                        onChange={(e) => {
                          const newSections = [...editedWorkout.sections];
                          newSections[sectionIndex].name = e.target.value;
                          setEditedWorkout({
                            ...editedWorkout,
                            sections: newSections,
                          });
                        }}
                      />
                    </div>
                    {section.exercises.map((exercise, exerciseIndex) => (
                      <div
                        className='exercise'
                        key={exercise._id}
                      >
                        <div className='input-group'>
                          <Label>Nome Esercizio:</Label>
                          <Input
                            type='text'
                            value={exercise.name}
                            onChange={(e) =>
                              handleExerciseChange(
                                sectionIndex,
                                exerciseIndex,
                                e
                              )
                            }
                          />
                        </div>
                        {exercise.timeBased
                          ? exercise.exerciseSets.map((set, setIndex) => (
                              <SetContainer key={setIndex}>
                                <div className='input-group'>
                                  <Label>Tempo (secondi):</Label>
                                  <Input
                                    type='number'
                                    value={set.time}
                                    onChange={(e) =>
                                      handleSetChange(
                                        sectionIndex,
                                        exerciseIndex,
                                        setIndex,
                                        'time',
                                        e
                                      )
                                    }
                                  />
                                </div>
                                <div className='input-group'>
                                  <Label>Riposo (secondi):</Label>
                                  <Input
                                    type='number'
                                    value={set.rest}
                                    onChange={(e) =>
                                      handleSetChange(
                                        sectionIndex,
                                        exerciseIndex,
                                        setIndex,
                                        'rest',
                                        e
                                      )
                                    }
                                  />
                                </div>
                              </SetContainer>
                            ))
                          : exercise.exerciseSets.map((set, setIndex) => (
                              <SetContainer key={setIndex}>
                                <div className='input-group'>
                                  <Label>Ripetizioni:</Label>
                                  <Input
                                    type='number'
                                    value={set.reps}
                                    onChange={(e) =>
                                      handleSetChange(
                                        sectionIndex,
                                        exerciseIndex,
                                        setIndex,
                                        'reps',
                                        e
                                      )
                                    }
                                  />
                                </div>
                                <div className='input-group'>
                                  <Label>Peso (kg):</Label>
                                  <Input
                                    type='number'
                                    value={set.weight}
                                    onChange={(e) =>
                                      handleSetChange(
                                        sectionIndex,
                                        exerciseIndex,
                                        setIndex,
                                        'weight',
                                        e
                                      )
                                    }
                                  />
                                </div>
                                <div className='input-group'>
                                  <Label>Riposo (secondi):</Label>
                                  <Input
                                    type='number'
                                    value={set.rest}
                                    onChange={(e) =>
                                      handleSetChange(
                                        sectionIndex,
                                        exerciseIndex,
                                        setIndex,
                                        'rest',
                                        e
                                      )
                                    }
                                  />
                                </div>
                              </SetContainer>
                            ))}
                      </div>
                    ))}
                  </div>
                </SectionContainer>
              ))}
              <ButtonGroup>
                <Button onClick={handleUpdate}>
                  <div className='text'>Salva</div>
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                  <div className='text'>Annulla</div>
                </Button>
              </ButtonGroup>
            </div>
          ) : (
            <>
              <div className='title'>dettagli</div>
              <SectionContainer>
                <div className='icon'>
                  <LuTableOfContents />
                </div>

                <div className='detailList'>
                  <div className='detail'>
                    <div className='label'>Data:</div>
                    <div className='text'>
                      {new Date(wor.date).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                  <div className='detail'>
                    <div className='label'>Inizio:</div>
                    <div className='text'>
                      {new Date(wor.start).toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className='detail'>
                    <div className='label'>Note:</div>
                    <div className='text'>{wor.notes}</div>
                  </div>
                  <div className='detail'>
                    <div className='label'>Completato:</div>
                    <div className='text'>
                      {wor.completed ? <BiCheck /> : <>no</>}
                    </div>
                  </div>
                </div>
              </SectionContainer>
              <div className='title'>sezioni</div>
              {wor.sections.map((section) => (
                <SectionContainer key={section._id}>
                  <div className='icon'>
                    <GiMuscleUp />
                  </div>
                  <div className='detailList'>
                    <div className='sectionName'>{section.name}</div>
                    {section.exercises.map((exercise, i) => (
                      <div
                        className='exercise'
                        key={exercise._id}
                      >
                        <div className='name'>{exercise.name}</div>
                        {exercise.timeBased ? (
                          <div className='exerciseDetails'>
                            {exercise.exerciseSets.length} x{' '}
                            {exercise.exerciseSets
                              .map((set, index) => `${set.time}''`)
                              .join(' / ')}{' '}
                            Rest:{' '}
                            {exercise.exerciseSets
                              .map((set, index) => `${set.rest}''`)
                              .join(' / ')}{' '}
                          </div>
                        ) : (
                          <div className='exerciseDetails'>
                            {exercise.exerciseSets.length} x{' '}
                            {exercise.exerciseSets
                              .map((set, index) => `${set.reps} reps`)
                              .join(' / ')}{' '}
                            {exercise.exerciseSets
                              .map((set, index) => `${set.weight}kg`)
                              .join(' / ')}{' '}
                            <br />
                            Rest:{' '}
                            {exercise.exerciseSets
                              .map((set, index) => `${set.rest}''`)
                              .join(' / ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </SectionContainer>
              ))}
            </>
          )} */}
        </div>
      ))}
      {!workout && (
        <div className='noWorkout'>
          <Button
            onClick={() => {
              setWorkoutDateBuffer(date);
              console.log(date);
              setWorkoutFormOpen(true);
            }}
          >
            <div className='text'>Aggiungi workout</div>
          </Button>
          <Button
            onClick={() => {
              setSelectWorkout(true);
            }}
          >
            <div className='text'>Ripeti workout</div>
          </Button>
        </div>
      )}

      <AnimatePresence mode='wait'>
        {selectWorkout && (
          <RepeatContainer
            as={motion.div}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            duration={{ duration: 0.5 }}
          >
            <MdClose onClick={() => setSelectWorkout(false)} />
            {[
              ...new Map(
                workouts.map((workout) => [workout.name, workout])
              ).values(),
            ].map((workout) => (
              <div
                className='workoutContainer'
                key={workout._id}
              >
                {workout.name}
                <div
                  className='add'
                  onClick={() => {
                    handleAddWorkout(workout);
                  }}
                >
                  scegli
                </div>
                <div
                  className='show'
                  onClick={() => {
                    setWorkoutToShow(workout);
                    setShowWorkout(true);
                    console.log(workout._id);
                  }}
                >
                  mostra
                </div>
              </div>
            ))}
          </RepeatContainer>
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {showWorkout && (
          <ShowContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MdClose
              onClick={() => {
                setShowWorkout(false);
                setWorkoutToShow(null);
              }}
            />
            {workoutToShow && (
              <div className='workout'>
                <div className='name'>{workoutToShow.name}</div>
                {workoutToShow.sections.map((section) => (
                  <div className='section'>
                    <div className='sectionName'>{section.name}</div>
                    <div className='sectionCotent'>
                      {section.exercises.map((exercise) => (
                        <div className='exercise'>
                          {exercise.name} x {exercise.exerciseSets.length}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ShowContainer>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default WorkoutPreview;

const Container = styled.div`
  /* height: 40vh; */
  flex: 1;
  padding: 20px 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  button {
    .text {
      font-size: 1.3em;
    }
  }
  .workoutContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    .title {
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 2px;
      font-size: 1.3em;
    }
  }
  .noWorkout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 20px;
    button {
      width: 90%;
      .text {
        color: ${({ theme }) => theme.colors.background};
      }
    }
  }
`;

const SectionContainer = styled.div`
  background-color: #d9d9d910;
  color: #d9d9d9;
  background-color: #d9d9d910;
  border: 1px solid #00c6be;
  box-shadow: 0 0 30px #00000075;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  gap: 20px;
  width: 100%;
  .icon {
    background-color: #d9d9d910;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 50%;
    svg {
      font-size: 20px;
    }
  }

  .detailList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .detail {
      display: flex;
      align-items: center;
      gap: 5px;
      .label {
        font-weight: 800;
        font-size: 1em;
      }
      .text {
        font-weight: 100;
        opacity: 60%;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        height: 100%;
        vertical-align: baseline;
        line-height: 1em;
      }
    }
    .sectionName {
      font-weight: 800;
      font-size: 1.2em;
    }
    .exercise {
      display: flex;
      flex-direction: column;
      gap: 5px;
      .name {
        font-size: 1em;
      }
      .exerciseDetails {
        opacity: 60%;
        font-size: 0.9em;
      }
    }
  }
  .sectionName {
    text-transform: capitalize;
  }
`;

const RepeatContainer = styled.div`
  position: absolute;

  background-color: ${({ theme }) => theme.colors.background};
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  height: 100%;
  width: 90vw;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  svg {
    font-size: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    path {
      color: red;
    }
  }
  .workoutContainer {
    background-color: #d9d9d910;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    width: 90%;
    border-radius: 10px;
    div {
      text-transform: capitalize;
      background-color: ${({ theme }) => theme.colors.light};
      padding: 5px 10px;
      border-radius: 5px;
      color: ${({ theme }) => theme.colors.background};
      font-weight: 600;
    }
    .add {
      margin-left: auto;
    }
  }
`;
const ShowContainer = styled.div`
  position: absolute;

  background-color: ${({ theme }) => theme.colors.background};
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  height: 100%;
  width: 90vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  svg {
    font-size: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    path {
      color: red;
    }
  }
  .workout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .name {
      font-size: 1.2em;
      font-weight: 700;
    }
  }
  .section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .sectionName {
      font-size: 1.1em;
    }
    .sectionCotent {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .exercise {
      font-size: 0.8em;
      font-weight: 100;
      opacity: 90%;
    }
  }
`;
const Input = styled.input`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 8px;
  width: 100%;
  margin: 2px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SetInputs = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px 0;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9em;
  margin-bottom: 4px;
  opacity: 0.8;
`;

const SetContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;

  .input-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;
