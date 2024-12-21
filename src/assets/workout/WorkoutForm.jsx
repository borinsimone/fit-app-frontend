import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import { addWorkouts } from '../../services/workoutService';
import { MdClose } from 'react-icons/md';

const WorkoutForm = ({ onSubmit, workoutData = {} }) => {
  const { workoutDateBuffer, setWorkoutFormOpen } = useGlobalContext();
  const [workoutName, setWorkoutName] = useState(workoutData.name || '');
  const [workoutDate, setWorkoutDate] = useState(workoutDateBuffer || '');
  const [startTime, setStartTime] = useState(workoutData.startTime || '');
  const [sections, setSections] = useState(workoutData.sections || []);
  function formatDateForInput(date) {
    const year = date.getFullYear(); // Ottieni l'anno
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ottieni il mese (aggiungi 1 e zero iniziale)
    const day = String(date.getDate()).padStart(2, '0'); // Ottieni il giorno (aggiungi zero iniziale)
    return `${year}-${month}-${day}`; // Combina in formato YYYY-MM-DD
  }
  // Sincronizza workoutDate con workoutDateBuffer
  useEffect(() => {
    if (workoutDateBuffer) {
      setWorkoutDate(formatDateForInput(workoutDateBuffer));
    }
  }, []);

  // Gestione delle modifiche per ogni set
  const updateSection = (sectionIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex][field] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: '',
        exercises: [{ name: '', timeBased: false, notes: '', sets: [] }],
      },
    ]);
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections.splice(sectionIndex, 1);
    setSections(updatedSections);
  };

  const addExercise = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises.push({
      name: '',
      timeBased: false,
      notes: '',
      sets: [],
    });
    setSections(updatedSections);
  };

  const removeExercise = (sectionIndex, exerciseIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises.splice(exerciseIndex, 1);
    setSections(updatedSections);
  };

  const addSet = (sectionIndex, exerciseIndex) => {
    const updatedSections = [...sections];
    const currentSets =
      updatedSections[sectionIndex].exercises[exerciseIndex].sets;

    // Copia l'ultimo set se esiste, altrimenti usa valori predefiniti
    const lastSet = currentSets[currentSets.length - 1] || {
      reps: '',
      weight: '',
      time: '',
      rest: '',
    };

    updatedSections[sectionIndex].exercises[exerciseIndex].sets.push({
      ...lastSet, // Copia i valori dall'ultimo set
    });

    setSections(updatedSections);
  };

  const removeSet = (sectionIndex, exerciseIndex, setIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises[exerciseIndex].sets.splice(
      setIndex,
      1
    );
    setSections(updatedSections);
  };

  const toggleTimeBased = (sectionIndex, exerciseIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].exercises[exerciseIndex].timeBased =
      !updatedSections[sectionIndex].exercises[exerciseIndex].timeBased;
    setSections(updatedSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = {
      name: workoutName,
      date: workoutDate,
      startTime,
      sections,
    };
    console.log(workout);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div
        onClick={() => {
          const workoutData = {
            name: 'Allenamento Forza',
            date: '2024-12-21',
            startTime: '10:00',
            sections: [
              {
                name: 'Upper Body',
                exercises: [
                  {
                    name: 'Bench Press',
                    timeBased: false,
                    notes: '',
                    sets: [{ reps: 10, weight: 50 }],
                  },
                ],
              },
            ],
          };
          const token = localStorage.getItem('token');
          addWorkouts(workoutData, token);
        }}
      >
        test
      </div>
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
        <Label>Orario Inizio:</Label>
        <Input
          type='time'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormGroup>

      {/* Sezioni */}
      <FormGroup>
        <Label>Sezioni:</Label>
        {sections.map((section, sectionIndex) => (
          <SectionContainer key={sectionIndex}>
            <FormGroup>
              <Label>Nome Sezione:</Label>
              <Input
                type='text'
                value={section.name}
                onChange={(e) =>
                  updateSection(sectionIndex, 'name', e.target.value)
                }
              />
            </FormGroup>

            {/* Esercizi */}
            {section.exercises.map((exercise, exerciseIndex) => (
              <ExerciseContainer key={exerciseIndex}>
                <FormGroup>
                  <Label>Nome Esercizio:</Label>
                  <Input
                    type='text'
                    value={exercise.name}
                    onChange={(e) =>
                      updateSection(
                        sectionIndex,
                        'exercises',
                        section.exercises.map((ex, i) =>
                          i === exerciseIndex
                            ? { ...ex, name: e.target.value }
                            : ex
                        )
                      )
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Time-based (seleziona se tempo-based):</Label>
                  <input
                    type='checkbox'
                    checked={exercise.timeBased}
                    onChange={() =>
                      toggleTimeBased(sectionIndex, exerciseIndex)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Note:</Label>
                  <TextArea
                    value={exercise.notes}
                    onChange={(e) =>
                      updateSection(
                        sectionIndex,
                        'exercises',
                        section.exercises.map((ex, i) =>
                          i === exerciseIndex
                            ? { ...ex, notes: e.target.value }
                            : ex
                        )
                      )
                    }
                  />
                </FormGroup>

                {/* Set */}
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex}>
                    {!exercise.timeBased && (
                      <FormGroup>
                        <Label>Reps:</Label>
                        <Input
                          type='number'
                          value={set.reps}
                          onChange={(e) =>
                            updateSection(
                              sectionIndex,
                              'exercises',
                              section.exercises.map((ex, i) =>
                                i === exerciseIndex
                                  ? {
                                      ...ex,
                                      sets: ex.sets.map((s, j) =>
                                        j === setIndex
                                          ? { ...s, reps: e.target.value }
                                          : s
                                      ),
                                    }
                                  : ex
                              )
                            )
                          }
                        />
                      </FormGroup>
                    )}

                    {/* Condizioni specifiche per weight/time */}
                    {exercise.timeBased ? (
                      <FormGroup>
                        <Label>Time (in seconds):</Label>
                        <Input
                          type='number'
                          value={set.time}
                          onChange={(e) =>
                            updateSection(
                              sectionIndex,
                              'exercises',
                              section.exercises.map((ex, i) =>
                                i === exerciseIndex
                                  ? {
                                      ...ex,
                                      sets: ex.sets.map((s, j) =>
                                        j === setIndex
                                          ? { ...s, time: e.target.value }
                                          : s
                                      ),
                                    }
                                  : ex
                              )
                            )
                          }
                        />
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <Label>Weight:</Label>
                        <Input
                          type='number'
                          value={set.weight}
                          onChange={(e) =>
                            updateSection(
                              sectionIndex,
                              'exercises',
                              section.exercises.map((ex, i) =>
                                i === exerciseIndex
                                  ? {
                                      ...ex,
                                      sets: ex.sets.map((s, j) =>
                                        j === setIndex
                                          ? { ...s, weight: e.target.value }
                                          : s
                                      ),
                                    }
                                  : ex
                              )
                            )
                          }
                        />
                      </FormGroup>
                    )}

                    <FormGroup>
                      <Label>Rest (in seconds):</Label>
                      <Input
                        type='number'
                        value={set.rest}
                        onChange={(e) =>
                          updateSection(
                            sectionIndex,
                            'exercises',
                            section.exercises.map((ex, i) =>
                              i === exerciseIndex
                                ? {
                                    ...ex,
                                    sets: ex.sets.map((s, j) =>
                                      j === setIndex
                                        ? { ...s, rest: e.target.value }
                                        : s
                                    ),
                                  }
                                : ex
                            )
                          )
                        }
                      />
                    </FormGroup>
                    <RemoveButton
                      onClick={() =>
                        removeSet(sectionIndex, exerciseIndex, setIndex)
                      }
                    >
                      Rimuovi Set
                    </RemoveButton>
                  </div>
                ))}
                <Button
                  type='button'
                  onClick={() => addSet(sectionIndex, exerciseIndex)}
                >
                  Aggiungi Set
                </Button>
                <RemoveButton
                  onClick={() => removeExercise(sectionIndex, exerciseIndex)}
                >
                  Rimuovi Esercizio
                </RemoveButton>
              </ExerciseContainer>
            ))}

            <Button
              type='button'
              onClick={() => addExercise(sectionIndex)}
            >
              Aggiungi Esercizio
            </Button>
            <RemoveButton onClick={() => removeSection(sectionIndex)}>
              Rimuovi Sezione
            </RemoveButton>
          </SectionContainer>
        ))}
        <Button
          type='button'
          onClick={addSection}
        >
          Aggiungi Sezione
        </Button>
      </FormGroup>

      <Button type='submit'>Salva Allenamento</Button>
    </FormContainer>
  );
};

export default WorkoutForm;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background-color: #000;
  position: absolute;
  z-index: 10;
  height: 90vh;
  width: 90%;
  top: 5%;
  left: 5%;
  padding: 10px;
  overflow-y: scroll;
  margin: 0 auto;
`;
const Close = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  svg {
    path {
      color: red;
    }
  }
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SectionContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ExerciseContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #e9ecef;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #d32f2f;
  }
`;
