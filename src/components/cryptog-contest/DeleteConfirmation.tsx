
import { Trash2 } from "lucide-react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmationProps {
  onConfirm: () => void;
}

const DeleteConfirmation = ({ onConfirm }: DeleteConfirmationProps) => {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Contest</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this contest? This action cannot be
          undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};

export default DeleteConfirmation;
