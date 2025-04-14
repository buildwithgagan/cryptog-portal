
import { Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";

interface FormFooterProps {
  isEditing: boolean;
  isValid: boolean;
  onCancel: () => void;
}

export function FormFooter({ isEditing, isValid, onCancel }: FormFooterProps) {
  return (
    <DialogFooter>
      {isEditing ? (
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
          >
            <Check className="mr-2 h-4 w-4" /> Update Contest
          </Button>
        </>
      ) : (
        <>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!isValid}
          >
            <Save className="mr-2 h-4 w-4" /> Create Contest
          </Button>
        </>
      )}
    </DialogFooter>
  );
}
