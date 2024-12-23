import React, { useState } from 'react';
import { LuTableOfContents } from 'react-icons/lu';
import styled from 'styled-components';
import Button from '../UI/Button';
import { GiMuscleUp } from 'react-icons/gi';
import { useGlobalContext } from '../../context/GlobalContext';
import { BiCheck } from 'react-icons/bi';
import {
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from '../../services/workoutService';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

function WorkoutPreview({ workout, date }) {
  const {
    workoutDateBuffer,
    setWorkoutDateBuffer,
    setWorkoutFormOpen,
    setSelectedWorkout,
    setWorkouts,
  } = useGlobalContext();
  const navigate = useNavigate();
  const deleteItem = async (id) => {
    console.log('deleting workout');

    const token = localStorage.getItem('token');
    await deleteWorkout(id, token);
    // const updatedWorkouts = await getWorkouts(token);
    // setWorkouts(updatedWorkouts);
    console.log('workout deleted');
  };
  return (
    <Container>
      {workout?.map((wor) => (
        <div
          className='workoutContainer'
          key={wor._id}
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
        </div>
      ))}
      {!workout && (
        <Button
          onClick={() => {
            setWorkoutDateBuffer(date);
            console.log(date);
            setWorkoutFormOpen(true);
          }}
        >
          <div className='text'>Aggiungi workout</div>
        </Button>
      )}
    </Container>
  );
}

export default WorkoutPreview;

const Container = styled.div`
  padding: 20px 10px;
  height: 53vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
