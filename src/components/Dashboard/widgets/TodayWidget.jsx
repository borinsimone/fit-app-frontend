import React from 'react';
import { MdAdd, MdTune } from 'react-icons/md';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalContext';
import { PieChart, Pie, Cell } from 'recharts';

function TodayWidget() {
  const { workouts } = useGlobalContext();

  // // const today = new Date();
  // // const startOfWeek = new Date(today);
  // // startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
  // // startOfWeek.setHours(0, 0, 0, 0); // Normalize to start of the day

  // // const endOfWeek = new Date(startOfWeek);
  // // endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
  // // endOfWeek.setHours(23, 59, 59, 999); // Normalize to end of the day

  // // const weeklyWorkouts = workouts?.filter((workout) => {
  // //   const workoutDate = new Date(workout.date);
  // //   workoutDate.setHours(0, 0, 0, 0); // Normalize to start of the day
  // //   return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
  // // });

  // const completedWorkouts = weeklyWorkouts?.filter(
  //   (workout) => workout.completed
  // ).length;
  // const totalWorkouts = weeklyWorkouts?.length;

  // const data = [
  //   { name: 'Completati', value: completedWorkouts },
  //   { name: 'Rimanenti', value: totalWorkouts - completedWorkouts },
  // ];

  // const COLORS = ['#00C6BE', '#00C6BE30']; // Verde per completati, grigio per rimanenti

  // function getFormattedDate() {
  //   const giorniSettimana = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  //   const mesi = [
  //     'Gen',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'Mag',
  //     'Giu',
  //     'Lug',
  //     'Ago',
  //     'Set',
  //     'Ott',
  //     'Nov',
  //     'Dic',
  //   ];

  //   const oggi = new Date();
  //   const giornoSettimana = giorniSettimana[oggi.getDay()];
  //   const giornoMese = oggi.getDate();
  //   const mese = mesi[oggi.getMonth()];

  //   return `${giornoSettimana} ${giornoMese} ${mese}`;
  // }
  const today = new Date();

  // Get current week range
  const currentMonday = new Date(today);
  currentMonday.setDate(
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
  );
  currentMonday.setHours(0, 0, 0, 0);

  const currentSunday = new Date(currentMonday);
  currentSunday.setDate(currentMonday.getDate() + 6);
  currentSunday.setHours(23, 59, 59, 999);

  // Filter workouts for current week
  const weeklyWorkouts = workouts?.filter((workout) => {
    const workoutDate = new Date(workout.date);
    workoutDate.setHours(0, 0, 0, 0);
    return workoutDate >= currentMonday && workoutDate <= currentSunday;
  });

  const completedWorkouts =
    weeklyWorkouts?.filter((workout) => workout.completed).length || 0;
  const totalWorkouts = weeklyWorkouts?.length || 0;

  const data = [
    { name: 'Completati', value: completedWorkouts },
    { name: 'Rimanenti', value: totalWorkouts - completedWorkouts },
  ];

  const COLORS = ['#00C6BE', '#00C6BE30'];

  function getFormattedDate() {
    const giorniSettimana = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const mesi = [
      'Gen',
      'Feb',
      'Mar',
      'Apr',
      'Mag',
      'Giu',
      'Lug',
      'Ago',
      'Set',
      'Ott',
      'Nov',
      'Dic',
    ];

    return `${giorniSettimana[today.getDay()]} ${today.getDate()} ${
      mesi[today.getMonth()]
    }`;
  }

  const todayWorkout = weeklyWorkouts?.find((workout) => {
    const workoutDate = new Date(workout.date);
    return (
      workoutDate.getDate() === today.getDate() &&
      workoutDate.getMonth() === today.getMonth() &&
      workoutDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <Container
      onClick={() => {
        console.log(weeklyWorkouts);
      }}
    >
      <MdTune
        className='settingIcon'
        onClick={() => {
          console.log('Apri impostazioni per il widget di oggi');
          alert('impostazioni per i widget verranno aggiunte presto!');
        }}
      />

      {totalWorkouts > 0 && (
        <ChartContainer
          onClick={() => {
            alert(
              `Forza, ti mancano solo ${
                totalWorkouts - completedWorkouts
              } allenamenti!`
            );
          }}
        >
          <PieChart
            width={60}
            height={60}
          >
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={22}
              outerRadius={28}
              fill='#8884d8'
              paddingAngle={0}
              dataKey='value'
              startAngle={90}
              endAngle={-270}
              stroke='none'
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* Aggiungiamo il testo al centro del grafico */}
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize='14px'
              fill='#fff'
            >
              {`${completedWorkouts}/${totalWorkouts}`}
            </text>
          </PieChart>
        </ChartContainer>
      )}
      <div className='todayDate'>{getFormattedDate()}</div>

      <div className='workoutName'>
        {todayWorkout
          ? todayWorkout.name
          : 'Nessun allenamento programmato per oggi'}
      </div>
      {!todayWorkout && (
        <div
          className='addWorkout'
          onClick={() => {
            alert('apri form per aggiungere allenamento in data di oggi');
          }}
        >
          <MdAdd size={30} />
        </div>
      )}
    </Container>
  );
}

export default TodayWidget;

const Container = styled.div`
  position: relative;
  color: #d9d9d9;
  background-color: #d9d9d910;
  border: 1px solid #00c6be;
  box-shadow: 0 0 30px #00000075;
  border-radius: 20px;
  /* width: 45%; */
  flex: 1;
  aspect-ratio: 1;
  padding: 15px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  .todayDate {
  }
  .addWorkout {
    background-color: #d9d9d910;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 0 auto;
  }
  .workoutName {
    font-size: 0.8em;
    opacity: 60%;
  }
  .settingIcon {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 10px;
    opacity: 0.7;
  }
`;

const ChartContainer = styled.div``;
