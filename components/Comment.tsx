import React, { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FiCommand } from 'react-icons/fi';
import { useRouter } from 'next/router';

import CommentItem from './CommentItem';
import { commentInterface } from '@/types';
import useGetAllComment from '@/hooks/useGetAllComment';
import useAddComment from '@/hooks/useAddComment';
import useDeleteComment from '@/hooks/useDeleteComment';
import { useToast } from '@/components/ui/use-toast';
import useCurrentUser from '@/hooks/useCurrentUser';
import Modal from './Modal';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import useGetAllUser from '@/hooks/useGetAllUser';

interface CommentProps {
  storyId: string;
  storySlug: string;
}

const Comment = ({ storyId, storySlug }: CommentProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: comments = [], mutate: getAllComments } = useGetAllComment();
  const { addComment } = useAddComment();
  const { deleteComment } = useDeleteComment();
  const { data: userData } = useCurrentUser();
  const { data: allUserData = [] } = useGetAllUser();

  const [newComment, setNewComment] = useState<string>('');
  const [visibleComments, setVisibleComments] = useState<number>(5);
  const [isLoadmore, setIsLoadmore] = useState<boolean>(false);

  const filteredCommentsData = useMemo(
    () => comments.filter((comment: any) => comment.storyId === storyId),
    [comments, storyId],
  );

  const handleAddComment = useCallback(async () => {
    if (!newComment) {
      return;
    }

    if (userData && storyId) {
      const params = {
        storyId: storyId,
        content: newComment,
        nameUser: userData.name,
        userId: userData._id,
        createdAt: new Date().getTime(),
      };

      await addComment(params);
      getAllComments();
      toast({
        title: 'Successfully !!!',
        description: 'The comment has been added successfully',
      });
      setNewComment('');
    }
  }, [storyId, newComment]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAddComment();
      }
    },
    [handleAddComment],
  );

  const onRedirectLogin = useCallback(() => {
    router.push(`/auth?redirect=${encodeURIComponent(router.pathname)}?${storySlug}`);
  }, [router, storySlug]);
  
  const handleDeleteComment = useCallback(
    async (commentId: string, userId: string) => {
      const isMatchingUserExists = comments.filter((comment: any) => comment.userId === userId);
      const isFindCommentId = isMatchingUserExists.find((comment: any) => comment._id === commentId);
      if (isFindCommentId) {
        await deleteComment({ id: isFindCommentId._id });
        toast({
          title: 'Successfully !!!',
          description: 'The comment has been successfully deleted',
        });
        getAllComments();
      }
    },
    [deleteComment, comments, userData?._id, getAllComments, toast]
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
    // Reset visible comments when the storyId changes
    setVisibleComments(5);
  }, [storyId]);

  return (
    <div className="w-full min-h-[30vh] px-4 md:px-16">
      <p className="dark:text-white text-themeDark text-2xl font-bold transition duration-500 pt-10">
        Bình luận:
      </p>
      {userData ? (
        <input
          className="h-[8vh] w-[100%] mt-4 outline-none text-sm rounded-lg dark:text-white text-themeDark px-4"
          type="text"
          id="search"
          placeholder="Thêm bình luận của bạn ở đây..."
          value={newComment}
          onChange={onChangeComment}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Modal
          childrenTrigger={
            <AlertDialogTrigger>
              <input
                className="h-[8vh] w-[92vw] mt-4 outline-none text-sm rounded-lg dark:text-white text-themeDark px-4"
                type="text"
                id="search"
                placeholder="Thêm bình luận của bạn ở đây..."
              />
            </AlertDialogTrigger>
          }
          content="Vui lòng đăng nhập để bình luận..."
          title="Bạn chưa đăng nhập?"
          confirmText="Đăng nhập"
          cancelText="Huỷ"
          onClick={onRedirectLogin}
        />
      )}

      {[...filteredCommentsData]
        .reverse()
        .slice(0, visibleComments)
        .map((item: commentInterface) => (
          <CommentItem
            key={item._id}
            onDelete={() => handleDeleteComment(item._id, userData._id)}
            allUserData={allUserData}
            userData={userData}
            {...item}
          />
        ))}
      {visibleComments < filteredCommentsData.length ? (
        <div className="mt-4 mb-10 text-center">
          <button
            onClick={handleLoadMore}
            className={`${
              isLoadmore ? '' : 'border rounded-lg hover:opacity-70'
            } dark:text-white text-themeDark inline-block p-4 dark:border-white border-black`}
          >
            {isLoadmore ? (
              <div className="flex items-center">
                <FiCommand className="loading-icon mr-2 dark:text-white text-themeDark" />
                <p>Đang tải...</p>
              </div>
            ) : (
              'Tải thêm...'
            )}
          </button>
        </div>
      ) : (
        <div className="mt-4 mb-10 text-center">
          <p className="dark:text-white text-themeDark">
            {filteredCommentsData.length > 5
              ? 'Bạn đã ở cuối danh sách rồi!!!'
              : filteredCommentsData.length === 0
              ? 'Thêm bình luận của bạn ở đây!!!'
              : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default Comment;
