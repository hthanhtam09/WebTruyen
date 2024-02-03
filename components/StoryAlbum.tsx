import React, { useCallback, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '@/pages/loading';
import StoriesList from './StoriesList';
import { useRouter } from 'next/router';
import { StoriesInterface } from '@/types';

interface StoryAlbumProps {
  title: string;
  storiesData: StoriesInterface[];
  isLoading: boolean;
  itemsPerPage?: number;
  isPagination?: boolean;
  isNavigate?: boolean;
}

const StoryAlbum: React.FC<StoryAlbumProps> = ({
  title,
  storiesData,
  isLoading,
  itemsPerPage = 24,
  isPagination = false,
  isNavigate = false,
}) => {
  const router = useRouter();
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentStory, setCurrentStory] = useState<StoriesInterface[]>([]);

  const pageCount =
    storiesData != null && storiesData.length > 0 ? Math.ceil(storiesData.length / itemsPerPage) : 1;
  const endOffset = itemOffset + itemsPerPage;

  const handlePaginationChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      const action = value > page ? 'next' : 'previous';
      const newPage = action === 'next' ? page + 1 : page - 1;

      setPage(newPage);
      const newOffset = (newPage - 1) * itemsPerPage;
      setItemOffset(newOffset);
    },
    [itemsPerPage, page],
  );
  
  const redirectToStoriesListNameScreen = useCallback(
    (currentStory: StoriesInterface[]) => {
      const queryObject = {
        movies: JSON.stringify(currentStory),
      };
      router.push({
        pathname: `/${title}`,
        query: queryObject,
      });
    },
    [router, title],
  );

  useEffect(() => {
    if (storiesData && storiesData.length > 0) {
      const currentItems = storiesData.slice(itemOffset, endOffset);
      setCurrentStory(currentItems);
    }
  }, [endOffset, itemOffset, storiesData, setCurrentStory]);

  return (
    <div className="h-full relative px-4 md:px-16 pt-20 pb-10">
      <div className="flex items-center justify-between">
        <p className="dark:text-white text-themeDark text-md md:text-xl lg:text-4xl font-semibold transition duration-500">
          {title}
        </p>
        {isNavigate && (
          <div
            onClick={() => redirectToStoriesListNameScreen(storiesData)}
            className="flex dark:text-white text-themeDark items-center cursor-pointer transition duration-500"
          >
            View all
            <img className="w-[30px] h-[30px] ml-2" src="/images/right-arrow-icon.png" alt="icon" />
          </div>
        )}
      </div>

      {!isLoading ? (
        currentStory.length > 0 ? (
          <>
            <StoriesList data={currentStory} style="mt-10 mb-10" />
            {isPagination && (
              <div className="w-full flex justify-center">
                <Pagination
                  count={pageCount}
                  variant="outlined"
                  color="primary"
                  page={page}
                  size="large"
                  onChange={handlePaginationChange}
                  className={classes.paginationItem}
                />
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
    '&.MuiPagination-root .MuiPagination-ul li > button': {
      color: '#fff',
    },
  },
});
