import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Line from '@/components/Line';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Helmet } from 'react-helmet-async';

const formatContent = (content: string) => {
  return content && content.replace(/\./g, '.<br /><br />');
};

const ChapterDetailScreen = () => {
  const router = useRouter();
  const classes = useStyles();
  const { theme } = useTheme();

  const { title, author, stories, chapter } = router.query;
  const [page, setPage] = useState(Number(chapter));

  const handlePaginationChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      router.push({
        pathname: router.pathname,
        query: { stories, chapter: value },
      });

      setPage(value);
    },
    [stories],
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>{`${title} - Chapter ${chapter}`}</title>
        <meta name="description" content={(stories as string[])[chapter as any]} />
        <meta name="keywords" content="" />
        <meta name="author" content={author?.toString()} />
        <meta property="og:title" content={title?.toString()} />
        <meta property="og:description" content={title?.toString()} />
        <meta property="og:image" content={title?.toString()} />
        <meta property="og:url" content="WebTruyen" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title?.toString()} />
        <meta name="twitter:description" content={title?.toString()} />
        <meta name="twitter:image" content={title?.toString()} />
      </Helmet>
      <div className="mt-[150px] mb-40 px-16">
        <h1 className="text-center font-bold text-[40px]">Chương: {Number(chapter) + 1}</h1>
        <div className="my-8">
          <Line />
        </div>
        {(stories as string[])[chapter as any] != null ? (
          <p
            className="tracking-wider leading-loose text-2xl text-justify min-h-screen"
            dangerouslySetInnerHTML={{
              __html: formatContent((stories as string[])[chapter as any]),
            }}
          />
        ) : (
          <p className='tracking-wider leading-loose text-2xl min-h-screen pt-40 text-center'>Chương này chưa có, vui lòng thử lại chương khác!!!</p>
        )}

        <div className="flex justify-center">
          <Pagination
            count={stories?.length}
            variant="outlined"
            color="primary"
            page={page}
            size="large"
            onChange={handlePaginationChange}
            className={clsx(
              theme === 'light' && classes.paginationItemLightTheme,
              theme === 'dark' && classes.paginationItem,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailScreen;

const useStyles = makeStyles({
  paginationItem: {
    '&.MuiPagination-root .MuiPagination-ul li > button': {
      color: '#fff',
    },
  },
  paginationItemLightTheme: {
    '&.MuiPagination-root .MuiPagination-ul li > button': {
      color: '#000',
    },
  },
});
