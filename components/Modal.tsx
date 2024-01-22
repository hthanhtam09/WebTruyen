import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ReactNode } from 'react';

interface ModalProps {
  childrenTrigger: ReactNode;
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onClick: () => void;
}

export default function Modal({
  childrenTrigger,
  title,
  content,
  confirmText,
  cancelText,
  onClick,
}: ModalProps) {
  return (
    <AlertDialog>
      {childrenTrigger}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClick}>{confirmText}</AlertDialogAction>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
