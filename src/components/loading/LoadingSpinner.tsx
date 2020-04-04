import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
`;

const SpinnerAnimation = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  display: inline-block;
    width: 80px;
    height: 80px;
    
    &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #2fa38d;
    border-color: #2fa38d transparent #2fa38d transparent;
    animation: ${SpinnerAnimation} 1.2s linear infinite;
`;

const LoadingSpinner = () => {
  return (
    <LoadingSpinnerContainer data-testid={'loading-spinner'}>
      <Spinner />
    </LoadingSpinnerContainer>
  );
};

export default LoadingSpinner;
