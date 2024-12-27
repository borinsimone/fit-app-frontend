import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

function Loading() {
  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
        width='200'
        height='200'
        // style='shape-rendering: auto; display: block; background: transparent; --darkreader-inline-bgimage: initial; --darkreader-inline-bgcolor: #181a1b;'
        data-darkreader-inline-bgimage=''
        data-darkreader-inline-bgcolor=''
      >
        <g>
          <circle
            stroke-width='11'
            stroke='#00c6be'
            fill='none'
            r='0'
            cy='50'
            cx='50'
          >
            <animate
              begin='0s'
              calcMode='spline'
              keySplines='0 0.2 0.8 1'
              keyTimes='0;1'
              values='0;42'
              dur='2.380952380952381s'
              repeatCount='indefinite'
              attributeName='r'
            ></animate>
            <animate
              begin='0s'
              calcMode='spline'
              keySplines='0.2 0 0.8 1'
              keyTimes='0;1'
              values='1;0'
              dur='2.380952380952381s'
              repeatCount='indefinite'
              attributeName='opacity'
            ></animate>
          </circle>
          <circle
            stroke-width='11'
            stroke='#00c6be'
            fill='none'
            r='0'
            cy='50'
            cx='50'
          >
            <animate
              begin='-1.1904761904761905s'
              calcMode='spline'
              keySplines='0 0.2 0.8 1'
              keyTimes='0;1'
              values='0;42'
              dur='2.380952380952381s'
              repeatCount='indefinite'
              attributeName='r'
            ></animate>
            <animate
              begin='-1.1904761904761905s'
              calcMode='spline'
              keySplines='0.2 0 0.8 1'
              keyTimes='0;1'
              values='1;0'
              dur='2.380952380952381s'
              repeatCount='indefinite'
              attributeName='opacity'
            ></animate>
          </circle>
          <g></g>
        </g>
      </svg>
    </Container>
  );
}

export default Loading;
const Container = styled.div`
  position: absolute;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;
