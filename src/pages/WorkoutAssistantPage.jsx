import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import Button from '../components/UI/Button';
import { GiMuscleUp } from 'react-icons/gi';
import { BiCheck } from 'react-icons/bi';
import SectionAssistant from '../components/assistant/SectionAssistant';
import { useNavigate } from 'react-router-dom';

function WorkoutAssistantPage() {
  const navigate = useNavigate();
  const { selectedWorkout, setSelectedWorkout } = useGlobalContext();
  const [openSectionAssistant, setOpenSectionAssistant] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const handleStartSegment = (segment) => {
    console.log('Starting segment:', segment);
    setCurrentSection(segment);
    setOpenSectionAssistant(true);
  };

  const handleInputChange = (sectionId, exerciseId, setId, field, value) => {
    const updatedWorkout = { ...selectedWorkout };
    const section = updatedWorkout.sections.find(
      (sec) => sec._id === sectionId
    );
    const exercise = section.exercises.find((ex) => ex._id === exerciseId);
    const exerciseSet = exercise.exerciseSets.find((set) => set._id === setId);
    exerciseSet[field] = value;
    setSelectedWorkout(updatedWorkout);
  };

  if (!selectedWorkout) {
    // alert('No workout selected');
    // navigate(-1);
  }

  useEffect(() => {
    console.log(currentSection);
  }, [currentSection]);

  return (
    <Container noscroll={openSectionAssistant}>
      {openSectionAssistant && currentSection && (
        <SectionAssistant
          currentSection={currentSection}
          close={() => {
            setCurrentSection(null);
            setOpenSectionAssistant(false);
          }}
        />
      )}
      <h1 onClick={() => console.log(selectedWorkout)}>
        {selectedWorkout.name}
      </h1>
      <p>Note: {selectedWorkout.notes}</p>
      <h2>Sezioni</h2>
      <div
        className='workoutContainer'
        noscroll={openSectionAssistant}
      >
        {selectedWorkout.sections.map((section) => (
          <SectionContainer key={section._id}>
            <div className='icon'>
              <GiMuscleUp />
            </div>
            <div className='detailList'>
              <div className='sectionName'>
                {section.name}

                <div className='start'>
                  {section.completed ? (
                    <BiCheck />
                  ) : (
                    <Button onClick={() => handleStartSegment(section)}>
                      START
                    </Button>
                  )}
                </div>
              </div>

              {section.exercises.map((exercise) => (
                <div
                  className='exercise'
                  key={exercise._id}
                >
                  <div className='name'>{exercise.name}</div>
                  {exercise.timeBased ? (
                    <div className='exerciseDetails'>
                      {exercise.exerciseSets.map((set, index) => (
                        <div key={set._id}>
                          Set {index + 1} /{' '}
                          <input
                            type='number'
                            value={set.time}
                            onChange={(e) =>
                              handleInputChange(
                                section._id,
                                exercise._id,
                                set._id,
                                'time',
                                e.target.value
                              )
                            }
                          />
                          {`'' `} / Rest:{' '}
                          <input
                            type='number'
                            value={set.rest}
                            onChange={(e) =>
                              handleInputChange(
                                section._id,
                                exercise._id,
                                set._id,
                                'rest',
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='exerciseDetails'>
                      {exercise.exerciseSets.map((set, index) => (
                        <div key={set._id}>
                          Set {index + 1} / Reps{' '}
                          <input
                            type='number'
                            value={set.reps}
                            onChange={(e) =>
                              handleInputChange(
                                section._id,
                                exercise._id,
                                set._id,
                                'reps',
                                e.target.value
                              )
                            }
                          />{' '}
                          /{' '}
                          <input
                            type='number'
                            value={set.weight}
                            onChange={(e) =>
                              handleInputChange(
                                section._id,
                                exercise._id,
                                set._id,
                                'weight',
                                e.target.value
                              )
                            }
                          />
                          kg / Rest:{' '}
                          <input
                            type='number'
                            value={set.rest}
                            onChange={(e) =>
                              handleInputChange(
                                section._id,
                                exercise._id,
                                set._id,
                                'rest',
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionContainer>
        ))}
      </div>
    </Container>
  );
}

export default WorkoutAssistantPage;

const Container = styled.div`
  padding: 0 10px;
  height: 100vh;
  height: 100dvh;
  padding: 50px 20px;

  /* height: 100dvh; */
  /* overflow-y: scroll; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 20px;
  position: relative;
  /* overflow-y: ${(props) => (props.noscroll ? 'hidden' : 'scroll')}; */
  button {
    .text {
      font-size: 1.3em;
    }
  }
  .workoutContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 70vh;
    height: 70dvh;
    /* flex: 1; */
    width: 100%;
    overflow-y: ${(props) => (props.noscroll ? 'hidden' : 'scroll')};
  }
`;

const SectionContainer = styled.div`
  background-color: #d9d9d910;
  color: #d9d9d9;
  border: 1px solid #00c6be;
  box-shadow: 0 0 30px #00000075;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  gap: 20px;
  width: 100%;

  input {
    all: unset;
    width: 20px;
  }
  span {
    width: 50px;
  }
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
    position: relative;
    width: 100%;

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
      text-transform: capitalize;
      position: relative;
      display: flex;
      align-items: center;
      .start {
        position: absolute;
        right: 0;
      }
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
`;
