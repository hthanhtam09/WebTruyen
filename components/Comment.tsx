import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { FiCommand } from 'react-icons/fi';
import CommentItem from './CommentItem';
import { MovieDetailCommentInterface } from '@/types';
import useGetAllComment from '@/hooks/useGetAllComment';
import useAddComment from '@/hooks/useAddComment';
import useDeleteComment from '@/hooks/useDeleteComment';

interface CommentProps {
  movieId: string;
}

const Comment = ({ movieId }: CommentProps) => {
  const { data: comments = [], mutate: getAllComments } = useGetAllComment();
  const { addComment } = useAddComment();
  const { deleteComment } = useDeleteComment();
  const [newComment, setNewComment] = useState<string>('');
  const [visibleComments, setVisibleComments] = useState<number>(5);
  const [isLoadmore, setIsLoadmore] = useState<boolean>(false);

  const handleAddComment = useCallback(async () => {
    if (!newComment) {
      return;
    }

    const params = {
      movieId: movieId,
      content: newComment,
      nameUser: 'John Doe',
      userId: '609ac7621c342a001f61eb28',
      createdAt: new Date().getTime(),
    };

    await addComment(params);
    setNewComment('');
    getAllComments();
  }, [movieId, newComment]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAddComment();
      }
    },
    [handleAddComment],
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      await deleteComment({ id: commentId });
      getAllComments();
    },
    [deleteComment],
  );


  const onChangeComment = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  }, []);

  const handleLoadMore = useCallback(async () => {
    setIsLoadmore(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
    setIsLoadmore(false);
  }, []);

  useEffect(() => {
    // Reset visible comments when the movieId changes
    setVisibleComments(5);
  }, [movieId]);

  return (
    <div className="w-full min-h-[50vh] px-16">
      <p className="dark:text-white text-themeDark text-2xl font-bold transition duration-500 pt-10">
        Comment:
      </p>
      <input
        className="h-[8vh] w-[100%] mt-4 outline-none text-sm rounded-lg text-white px-4"
        type="text"
        id="search"
        placeholder="Add your comment here..."
        value={newComment}
        onChange={onChangeComment}
        onKeyDown={onKeyDown}
      />
      {[...comments]
        .reverse()
        .slice(0, visibleComments)
        .map((item: MovieDetailCommentInterface) => (
          <CommentItem key={item._id} onDelete={() => handleDeleteComment(item._id)} {...item} />
        ))}
      {visibleComments < comments.length ? (
        <div className="mt-4 mb-10 text-center">
          <button
            onClick={handleLoadMore}
            className={`${
              isLoadmore ? '' : 'border rounded-lg hover:opacity-70'
            } text-white inline-block p-4`}
          >
            {isLoadmore ? (
              <div className="flex items-center">
                <FiCommand className="loading-icon mr-2" />
                <p>Loading more...</p>
              </div>
            ) : (
              'Load More...'
            )}
          </button>
        </div>
      ) : (
        <div className="mt-4 mb-10 text-center">
          <p className="text-white">You’ve reached the end of the list</p>
        </div>
      )}

    

      {/* <Modal title="Warning !!!" content="Do you want to remove this comment ?" open={isConfirmDeleteComment} handleOpen={confirmDeleteComment} /> */}
    </div>
  );
};

export default Comment;
