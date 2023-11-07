import React from 'react';
import { Metadata, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Billboard from '@/components/Billboard';
import MovieAlbum from '@/components/MovieAlbum';

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

export const metadata: Metadata = {
  title: 'CineShin',
  description: 'CineShin and Chill',
};

const Home = () => {
  return (
    <>
      <Billboard />
      <div className="pb-40">
        <MovieAlbum />
      </div>
    </>
  );
};

export default Home;
