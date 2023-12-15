"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled, { keyframes } from 'styled-components';
import { EffectCards } from 'swiper/modules';

import 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #262626;
  min-height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(30px);
  border-radius: 20px;
  width: min(900px, 100%);
  box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.66) inset, 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  padding: 0 35px;
  text-align: justify;
`;

const MovieNight = styled.span`
  background: linear-gradient(225deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%);
`;

const gelatineAnimation = keyframes`
  0%, 100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
`;

const Button = styled.button`
  display: block;
  padding: 10px 40px;
  margin: 10px auto;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 4px;
  outline: none;
  text-decoration: none;
  color: #784ba0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;

  &:hover,
  &:focus,
  &:active,
  &:visited {
    transition-timing-function: cubic-bezier(0.6, 4, 0.3, 0.8);
    animation: ${gelatineAnimation} 0.5s 1;
  }
`;

const SwiperContainer = styled.div`
  width: 250px;
  height: 450px;
  padding: 50px 0;
`;

const SwiperWrapper = styled.div``;

// const SwiperSlide = styled.div`
//   position: relative;
//   box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
//   border-radius: 10px;

//   span {
//     position: absolute;
//     top: 0;
//     right: 0;
//     color: #fff;
//     padding: 7px 18px;
//     margin: 10px;
//     border-radius: 20px;
//     letter-spacing: 2px;
//     font-size: 0.8rem;
//     font-weight: 700;
//     font-family: inherit;
//     background: rgba(255, 255, 255, 0.095);
//     box-shadow: inset 2px -2px 20px rgba(214, 214, 214, 0.2),
//       inset -3px 3px 3px rgba(255, 255, 255, 0.4);
//     backdrop-filter: blur(74px);
//   }

//   h2 {
//     /* Styles for the h2 element inside SwiperSlide */
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     color: #fff;
//     font-weight: 400;
//     font-size: 1.1rem;
//     line-height: 1.4;
//     margin: 0 0 20px 20px;
//   }

//   &:nth-child(1n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2929f534-3bc3-4cbd-b84c-80df863d5a38')
//         no-repeat 50% 50% / cover;
//   }

//   &:nth-child(2n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b6f5eb64-887c-43b1-aaba-d52a4c59a379')
//         no-repeat 50% 50% / cover;
//   }

//   &:nth-child(3n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd')
//         no-repeat 50% 0% / cover;
//   }
//   &:nth-child(4n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/fc21e481-e28a-41a8-9db3-3b62c1ddc17e')
//         no-repeat 50% 50% / cover;
//   }
//   &:nth-child(5n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6b6ad966-79e1-4d3c-8f92-566d0fee8082')
//         no-repeat 50% 50% / cover;
//   }
//   &:nth-child(6n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2ad44f5d-2215-4416-9c9b-2bae3be51a67')
//         no-repeat 50% 50% / cover;
//   }
//   &:nth-child(7n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/aa8fe914-741f-4bf4-ad4a-24f19d1f4178')
//         no-repeat 50% 50% / cover;
//   }
//   &:nth-child(8n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d5f10b4f-7d34-45bd-bb5f-5f1530c2ac1c')
//         no-repeat 50% 0% / cover;
//   }
//   &:nth-child(9n) {
//     background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
//       url('https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7cbac263-7c55-4428-908e-31018dc1bce3')
//         no-repeat 50% 50% / cover;
//   }
// `;

const Circles = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background-color: #ff3cac;
    background-image: linear-gradient(225deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%);
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  &:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  &:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  &:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  &:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  &:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  &:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  &:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  &:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }
`;

const MovieEvent: React.FC = () => {

  return (
    <>
      <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="bg-white">
      <SwiperSlide>
                  123
                </SwiperSlide>
        <Section>
          <Content>
            <Info>
              <p className="text-base mb-1 font-medium text-white">
                Join us for a fantastic <MovieNight>movie night</MovieNight> filled with popcorn,
                laughter, and great company! Whether you a fan of thrilling action, heartwarming
                dramas, or side-splitting comedies, we got a film lineup to cater to all tastes.
                Save the date and bring your favorite snacks to make it a memorable evening.
              </p>
              <Button>Join</Button>
            </Info>
            <SwiperContainer>
              <SwiperWrapper>
                <SwiperSlide>
                  123
                </SwiperSlide>
               
              </SwiperWrapper>
            </SwiperContainer>
           
          </Content>
          <Circles>
            <li></li>
          </Circles>
        </Section>
      </Swiper>
    </>
  );
};

export default MovieEvent;
