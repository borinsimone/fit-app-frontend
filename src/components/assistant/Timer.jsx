import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Md2kPlus,
  MdCancel,
  MdCloseFullscreen,
  MdOutlineClose,
  MdPause,
  MdPlayArrow,
} from 'react-icons/md';

// function Timer({ timer, restTime, clear }) {
//   const [timeLeft, setTimeLeft] = useState(restTime);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       clear();
//       return;
//     }

//     if (isPaused) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, isPaused]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs
//       .toString()
//       .padStart(2, '0')}`;
//   };

//   const [minutes, seconds] = formatTime(timeLeft).split(':');

//   return (
//     <Container
//       key='sxsaxa'
//       as={motion.div}
//       initial={{ gridTemplateRows: '0fr', opacity: 0 }}
//       animate={{ gridTemplateRows: '1fr', opacity: 1 }}
//       exit={{ gridTemplateRows: '0fr', opacity: 0 }}
//     >
//       <div className='utility'>
//         <TimeDisplay>
//           <AnimatePresence mode='wait'>
//             <motion.span
//               key={minutes}
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {minutes}
//             </motion.span>
//           </AnimatePresence>
//           :
//           <AnimatePresence mode='wait'>
//             <motion.span
//               key={seconds}
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {seconds}
//             </motion.span>
//           </AnimatePresence>
//         </TimeDisplay>
//         <div className='buttonContainer'>
//           <AnimatePresence mode='wait'>
//             <motion.div
//               key={isPaused ? 'play' : 'pause'}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <button onClick={() => setIsPaused(!isPaused)}>
//                 {isPaused ? <MdPlayArrow size={40} /> : <MdPause size={40} />}
//               </button>
//             </motion.div>
//           </AnimatePresence>
//           <button
//             className='close'
//             onClick={() => clear()}
//           >
//             <MdOutlineClose size={40} />
//           </button>
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default Timer;

// const Container = styled.div`
//   display: grid;

//   width: 100%;
//   grid-template-rows: 0fr;
//   padding: 20px;
//   transition: grid-template-rows 300ms;
//   .utility {
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     width: 100%;

//     .clear {
//       background-color: red !important;
//     }
//     .buttonContainer {
//       display: flex;
//       gap: 30px;
//       button {
//         all: unset;
//         border: 3px solid ${({ theme }) => theme.colors.light};
//         border-radius: 1000px;
//         height: 45px;
//         width: 45px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         svg {
//           path {
//             color: ${({ theme }) => theme.colors.light};
//           }
//         }
//       }
//       .close {
//         border: 3px solid red;
//         svg {
//           path {
//             color: red;
//           }
//         }
//       }
//     }
//   }
// `;

// const TimeDisplay = styled.div`
//   font-size: 100px;
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.light};
//   display: flex;
//   gap: 4px;
//   span {
//     display: inline-block;
//     /* width: 40px; */
//     text-align: center;
//     color: ${({ theme }) => theme.colors.light};
//   }
// `;

function Timer({ timer, restTime, clear }) {
  const [timeLeft, setTimeLeft] = useState(restTime);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      clear();
      return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const progress = (timeLeft / restTime) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  const [minutes, seconds] = formatTime(timeLeft).split(':');

  return (
    <Container
      as={motion.div}
      initial={{ gridTemplateRows: '0fr', opacity: 0 }}
      animate={{ gridTemplateRows: '1fr', opacity: 1 }}
      exit={{ gridTemplateRows: '0fr', opacity: 0 }}
    >
      <div className='utility'>
        <svg
          // width='150'
          // height='150'
          viewBox='0 0 150 150'
          className='progress-ring'
        >
          <circle
            className='progress-ring__background'
            cx='75'
            cy='75'
            r={radius}
            fill='none'
            stroke='#dddddd00'
            strokeWidth='5'
          />
          <circle
            className='progress-ring__circle'
            cx='75'
            cy='75'
            r={radius}
            fill='none'
            // stroke='#4caf50'
            strokeWidth='5'
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className='wrapper'>
          <TimeDisplay>
            <AnimatePresence mode='wait'>
              <motion.span
                key={minutes}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {minutes}
              </motion.span>
            </AnimatePresence>
            :
            <AnimatePresence mode='wait'>
              <motion.span
                key={seconds}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {seconds}
              </motion.span>
            </AnimatePresence>
          </TimeDisplay>
          <div className='buttonContainer'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={isPaused ? 'play' : 'pause'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? <MdPlayArrow size={40} /> : <MdPause size={40} />}
                </button>
              </motion.div>
            </AnimatePresence>
            <button
              className='close'
              onClick={() => clear()}
            >
              <MdOutlineClose size={40} />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Timer;
const Container = styled.div`
  display: grid;

  width: 100%;
  grid-template-rows: 0fr;
  padding: 20px;
  transition: grid-template-rows 300ms;
  .progress-ring {
    position: absolute;
    z-index: -1;
  }
  .progress-ring__background {
    stroke-linecap: round;
  }

  .progress-ring__circle {
    transition: stroke-dashoffset 0.5s linear;
    stroke-linecap: round;
    stroke: ${({ theme }) => theme.colors.light};
  }
  .utility {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .wrapper {
      height: 40vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .clear {
      background-color: red !important;
    }
    .buttonContainer {
      display: flex;
      gap: 30px;
      button {
        all: unset;
        border: 3px solid ${({ theme }) => theme.colors.light};
        border-radius: 1000px;
        height: 45px;
        width: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          path {
            color: ${({ theme }) => theme.colors.light};
          }
        }
      }
      .close {
        border: 3px solid red;
        svg {
          path {
            color: red;
          }
        }
      }
    }
  }
`;

const TimeDisplay = styled.div`
  font-size: 100px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  gap: 4px;
  span {
    display: inline-block;
    /* width: 40px; */
    text-align: center;
    color: ${({ theme }) => theme.colors.light};
  }
`;
