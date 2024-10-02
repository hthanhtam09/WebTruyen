import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Gloria_Hallelujah } from '@next/font/google';
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';
import { textVariant } from '@/lib/motion';

const mloria_Hallelujah = Gloria_Hallelujah({
  subsets: ['latin'],
  weight: '400',
});

const upperAnimation = keyframes`
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 0.99;
    text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.4;
    text-shadow: none;
  }
`;

const StyledDiv = styled.div<{ isMobile: boolean }>`
  font-size: ${(props) => (props.isMobile ? '20px' : '35px')};
  text-align: center;
  text-transform: capitalize;
  text-shadow: 0 0 80px red, 0 0 30px FireBrick, 0 0 6px DarkRed;
  color: #3984f3;
  display: flex;

  & p {
    margin: 0;
  }

  #textLightOne {
    color: #fff;
    text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;

    span:nth-of-type(1) {
      animation: ${upperAnimation} 11s linear infinite;
    }
    span:nth-of-type(2) {
      animation: ${upperAnimation} 30s linear infinite;
    }
    span:nth-of-type(3) {
      animation: ${upperAnimation} 50s linear infinite;
    }
  }

  #textLightTwo {
    color: #fff;
    text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;

    span:nth-of-type(1) {
      text-shadow: none;
      opacity: 0.4;
    }

    span:nth-of-type(2) {
      animation: ${upperAnimation} 5s linear infinite;
    }

    span:nth-of-type(3) {
      animation: ${upperAnimation} 20s linear infinite;
    }

    span:nth-of-type(4) {
      animation: ${upperAnimation} 44s linear infinite;
    }

    span:nth-of-type(5) {
      animation: ${upperAnimation} 70s linear infinite;
    }

    span:nth-of-type(6) {
      animation: ${upperAnimation} 105s linear infinite;
    }
  }
`;

const Logo = () => {
  return (
    <div className={mloria_Hallelujah.className}>
      <StyledDiv isMobile={isMobile}>
        <p id="textLightOne">
          <span>W</span>
          <span>e</span>
          <span>b</span>
        </p>
        <p id="textLightTwo">
          <span>T</span>
          <span>r</span>
          <span>u</span>
          <span>y</span>
          <span>e</span>
          <span>n</span>
        </p>
      </StyledDiv>
    </div>
  );
};

export default Logo;
