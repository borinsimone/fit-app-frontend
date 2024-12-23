import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdClose, MdDelete } from 'react-icons/md';
import { addWorkouts } from '../../services/workoutService';
import { useGlobalContext } from '../../context/GlobalContext';

function WorkoutForm({}) {
  const { setWorkoutFormOpen, workoutDateBuffer } = useGlobalContext();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState(workoutDateBuffer || '');
  const [completed, setCompleted] = useState(false);
  const [feeling, setFeeling] = useState(3);
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [sections, setSections] = useState([
    {
      name: '',
      exercises: [
        {
          name: '',
          timeBased: false,
          exerciseSets: [{ reps: 0, weight: 0, rest: 0, time: 0 }],
          notes: '',
        },
      ],
    },
  ]);

  useEffect(() => {
    if (workoutDateBuffer) {
      const date = new Date(workoutDateBuffer);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      const formattedDate = date.toISOString().split('T')[0];
      setWorkoutDate(formattedDate);
    }
  }, [workoutDateBuffer]);
  const handleSectionChange = (index, updatedSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    setSections(updatedSections);
  };

  const handleExerciseChange = (
    sectionIndex,
    exerciseIndex,
    updatedExercise
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises[exerciseIndex] = updatedExercise;
    setSections(updatedSections);
  };

  const handleSetChange = (
    sectionIndex,
    exerciseIndex,
    setIndex,
    updatedSet
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises[exerciseIndex].exerciseSets[
      setIndex
    ] = updatedSet;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: '',
        exercises: [
          {
            name: '',
            timeBased: false,
            exerciseSets: [{ reps: 0, weight: 0, rest: 0, time: 0 }],
            notes: '',
          },
        ],
      },
    ]);
  };

  const addExercise = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises.push({
      name: '',
      timeBased: false,
      exerciseSets: [{ reps: 0, weight: 0, rest: 0, time: 0 }],
      notes: '',
    });
    setSections(updatedSections);
  };

  const addSet = (sectionIndex, exerciseIndex) => {
    const updatedSections = [...sections];
    const lastSet =
      updatedSections[sectionIndex].exercises[exerciseIndex].exerciseSets.slice(
        -1
      )[0];
    const newSet = { ...lastSet };
    updatedSections[sectionIndex].exercises[exerciseIndex].exerciseSets.push(
      newSet
    );
    setSections(updatedSections);
  };

  const deleteSection = (sectionIndex) => {
    const updatedSections = sections.filter(
      (_, index) => index !== sectionIndex
    );
    setSections(updatedSections);
  };

  const deleteExercise = (sectionIndex, exerciseIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises = updatedSections[
      sectionIndex
    ].exercises.filter((_, index) => index !== exerciseIndex);
    setSections(updatedSections);
  };

  const deleteSet = (sectionIndex, exerciseIndex, setIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises[exerciseIndex].exerciseSets =
      updatedSections[sectionIndex].exercises[
        exerciseIndex
      ].exerciseSets.filter((_, index) => index !== setIndex);
    setSections(updatedSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = {
      name: workoutName,
      date: workoutDate,
      completed,
      feedback: {
        feeling,
        notes: feedbackNotes,
      },
      notes: generalNotes,
      sections,
    };
    console.log(workout);
    addWorkouts(workout);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Close onClick={() => setWorkoutFormOpen(false)}>
        <MdClose />
      </Close>
      <FormGroup>
        <Label>Nome Workout:</Label>
        <Input
          type='text'
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Data:</Label>
        <Input
          type='date'
          value={workoutDate}
          onChange={(e) => setWorkoutDate(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Note Generali:</Label>
        <Input
          type='text'
          value={generalNotes}
          onChange={(e) => setGeneralNotes(e.target.value)}
        />
      </FormGroup>
      {sections.map((section, sectionIndex) => (
        <SectionContainer key={sectionIndex}>
          <FormGroup>
            <Label>Nome Sezione:</Label>
            <Input
              type='text'
              value={section.name}
              onChange={(e) =>
                handleSectionChange(sectionIndex, {
                  ...section,
                  name: e.target.value,
                })
              }
            />
            <DeleteButton
              type='button'
              onClick={() => deleteSection(sectionIndex)}
            >
              Elimina Sezione
            </DeleteButton>
          </FormGroup>
          {section.exercises.map((exercise, exerciseIndex) => (
            <ExerciseContainer key={exerciseIndex}>
              <DeleteButton
                type='button'
                onClick={() => deleteExercise(sectionIndex, exerciseIndex)}
              >
                <MdDelete />
              </DeleteButton>
              <div className='flex'>
                <FormGroup>
                  <Label>Nome Esercizio:</Label>
                  <Input
                    type='text'
                    value={exercise.name}
                    onChange={(e) =>
                      handleExerciseChange(sectionIndex, exerciseIndex, {
                        ...exercise,
                        name: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Time Based:</Label>
                  <Input
                    type='checkbox'
                    checked={exercise.timeBased}
                    onChange={(e) =>
                      handleExerciseChange(sectionIndex, exerciseIndex, {
                        ...exercise,
                        timeBased: e.target.checked,
                      })
                    }
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <Label>Note Esercizio:</Label>
                <Input
                  type='text'
                  value={exercise.notes}
                  onChange={(e) =>
                    handleExerciseChange(sectionIndex, exerciseIndex, {
                      ...exercise,
                      notes: e.target.value,
                    })
                  }
                />
              </FormGroup>
              {exercise.exerciseSets.map((set, setIndex) => (
                <SetContainer key={setIndex}>
                  <FormGroup>
                    <Label>Reps:</Label>
                    <Input
                      type='number'
                      value={set.reps}
                      onChange={(e) =>
                        handleSetChange(sectionIndex, exerciseIndex, setIndex, {
                          ...set,
                          reps: e.target.value,
                        })
                      }
                      disabled={exercise.timeBased}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Weight:</Label>
                    <Input
                      type='number'
                      value={set.weight}
                      onChange={(e) =>
                        handleSetChange(sectionIndex, exerciseIndex, setIndex, {
                          ...set,
                          weight: e.target.value,
                        })
                      }
                      disabled={exercise.timeBased}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Rest:</Label>
                    <Input
                      type='number'
                      value={set.rest}
                      onChange={(e) =>
                        handleSetChange(sectionIndex, exerciseIndex, setIndex, {
                          ...set,
                          rest: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Time:</Label>
                    <Input
                      type='number'
                      value={set.time}
                      onChange={(e) =>
                        handleSetChange(sectionIndex, exerciseIndex, setIndex, {
                          ...set,
                          time: e.target.value,
                        })
                      }
                      disabled={!exercise.timeBased}
                    />
                  </FormGroup>
                  <DeleteButton
                    type='button'
                    onClick={() =>
                      deleteSet(sectionIndex, exerciseIndex, setIndex)
                    }
                  >
                    <MdDelete />
                  </DeleteButton>
                </SetContainer>
              ))}
              <Button
                type='button'
                onClick={() => addSet(sectionIndex, exerciseIndex)}
              >
                Aggiungi Set
              </Button>
            </ExerciseContainer>
          ))}
          <Button
            type='button'
            onClick={() => addExercise(sectionIndex)}
          >
            Aggiungi Esercizio
          </Button>
        </SectionContainer>
      ))}
      <Button
        type='button'
        onClick={addSection}
      >
        Aggiungi Sezione
      </Button>
      <Button type='submit'>Salva Workout</Button>
    </FormContainer>
  );
}

export default WorkoutForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90vh;
  overflow: auto;
  .flex {
    display: flex;
    align-items: center;
  }
`;

const FormGroup = styled.div``;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #cccccc30;
  border-radius: 4px;
  font-size: 16px;
  background-color: #333;
`;

const Close = styled.div`
  align-self: flex-end;
  cursor: pointer;
  font-size: 24px;
  color: #999;
  &:hover {
    color: #333;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #00c6be;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #00a5a3;
  }
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 5px;
  &:hover {
    background-color: #ff1a1a;
  }
`;

const SectionContainer = styled.div``;

const ExerciseContainer = styled.div``;

const SetContainer = styled.div`
  display: flex;
  position: relative;
`;
