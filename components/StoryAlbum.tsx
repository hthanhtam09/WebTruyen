import React, { useCallback } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import Loading from '@/pages/loading';
import StoriesList from './StoriesList';
import { StoriesInterface } from '@/types';
import { convertToSnakeCase } from '@/utils/utils';
import { EStoryType, EThemes } from '@/enum';

interface StoryAlbumProps {
  title: string;
  storiesData: StoriesInterface[];
  isLoading: boolean;
  isPagination?: boolean;
  isNavigate?: boolean;
  totalPages?: number;
  page?: number;
  storyType?: EStoryType;
  handlePaginationChange?: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined;
}

const StoryAlbum: React.FC<StoryAlbumProps> = ({
  title,
  storiesData,
  isLoading,
  totalPages,
  page = 1,
  isPagination = false,
  isNavigate = false,
  storyType,
  handlePaginationChange,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const { theme } = useTheme();

  const redirectToStoriesListNameScreen = useCallback(() => {
    const path = `/storiesViewAll/${convertToSnakeCase(title)}`;
    router.push({
      pathname: path,
      query: { title, storyType },
    });
  }, [router, title, storyType]);

  return (
    <div className="h-full relative px-4 md:px-16 pt-20 pb-10">
      <div className="flex items-center justify-between">
        <p className="dark:text-white text-themeDark text-md md:text-xl lg:text-4xl font-semibold transition duration-500">
          {title}
        </p>
        {isNavigate && (
          <div
            onClick={redirectToStoriesListNameScreen}
            className="flex dark:text-white text-themeDark items-center cursor-pointer transition duration-500"
          >
            Xem tất cả
            <img className="w-[30px] h-[30px] ml-2" src="/images/right-arrow-icon.png" alt="icon" />
          </div>
        )}
      </div>

      {!isLoading ? (
        storiesData?.length > 0 ? (
          <>
            <StoriesList data={storiesData} style="my-10" />
            {isPagination && (
              <div className="w-full flex justify-center mb-32">
                {totalPages === 1 ? null : (
                  <Pagination
                    count={totalPages}
                    variant="outlined"
                    color="primary"
                    page={page}
                    size={`${isMobile ? 'medium' : 'large'}`}
                    onChange={handlePaginationChange}
                    className={
                      theme === EThemes.DARK ? classes.paginationItem : classes.paginationItemLight
                    }
                  />
                )}
              </div>
            )}
          </>
        ) : null
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default StoryAlbum;

const useStyles = makeStyles({
  paginationItem: {
    '&.MuiPagination-root .MuiPagination-ul li > button, &.MuiPagination-root .MuiPagination-ul li > div':
      {
        color: '#fff',
      },
  },
  paginationItemLight: {
    '&.MuiPagination-root .MuiPagination-ul li > button, &.MuiPagination-root .MuiPagination-ul li > div':
      {
        color: '#000',
      },
  },
});
