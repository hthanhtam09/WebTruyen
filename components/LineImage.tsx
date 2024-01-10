import React from 'react';
import ReactPlayer from 'react-player';

interface LineImageProps {
  numberImage: number;
  width: string;
  height: string;
  heightContainer?: number;
}

const LineImage = ({ numberImage, width, height, heightContainer = 10 }: LineImageProps) => {
  return (
    <section className={`relative -top-10 h-[${heightContainer}vh]`}>
      <img
        className={`w-[${width}] h-[${height}] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10`}
        src={`/images/cartoon${numberImage}.png`}
        alt="cartoon1"
      />
      {/* <ReactPlayer
        className="absolute top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] pointer-events-none w-full object-cover h-full z-0"
        url={`/images/bg-cartoon1.mp4`}
        width="100%"
        height="100%"
        playing
        controls={false}
        muted
      /> */}
    </section>
  );
};

export default LineImage;
