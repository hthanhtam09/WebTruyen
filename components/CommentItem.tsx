import React, { useMemo } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

import { MovieDetailCommentInterface } from '@/types';
import { createTimelineString } from '@/utils/utils';
import Modal from './Modal';

interface CommentItemProps extends MovieDetailCommentInterface {
  allUserData: any[];
  onDelete: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  allUserData,
  content,
  createdAt,
  userId,
  onDelete,
}) => {
  const userAccount = useMemo(
    () => {
      return allUserData && allUserData.find((user: any) => user._id === userId)
    },
    [allUserData, userId],
  );

  return (
    <div className="flex items-start space-x-4 p-4 my-10 w-full border dark:border-white border-black rounded-lg">
      <img
        className="w-12 h-12 rounded-full"
        src={`${userAccount?.image ? userAccount.image : '/images/user.png'}`}
        alt="Avatar"
      />
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between py-2">
          <div>
            <span className="font-bold text-blue-500">{userAccount?.name}</span>
            <span className="dark:text-white text-themeDark pl-2">
              {createTimelineString(createdAt)}
            </span>
          </div>
          <Modal
            childrenTrigger={
              <AlertDialogTrigger>
                <TrashIcon className="w-[20px] cursor-pointer hover:opacity-70" />
              </AlertDialogTrigger>
            }
            content="Do you want to remove this comment?"
            title="Are you absolutely sure?"
            confirmText="Delete"
            cancelText="Cancel"
            onClick={onDelete}
          />
        </div>
        <p className="dark:text-white text-themeDark">{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
