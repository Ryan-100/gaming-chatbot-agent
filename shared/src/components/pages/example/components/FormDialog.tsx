import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import EditExample from '../edit-example';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const FormDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Login</DialogTitle>
        <EditExample />
        <DialogFooter>
          <Button color="primary" onClick={onClose}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
