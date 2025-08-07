import React, { useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Icons } from '../../ui/icons';
import { Input } from '../../ui';

interface ChangePassDialogProps {
  onSubmit: (value: string) => void;
  isDigit?: boolean;
  maxLength?: number;
}

export const ChangePassDialog: React.FC<ChangePassDialogProps> = ({
  onSubmit,
  isDigit,
  maxLength,
}) => {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          setChangePasswordModalOpen(true);
        }}
        className="text-primary"
      >
        <p className="text-sm">Change Password</p>
      </Button>
      <Dialog open={changePasswordModalOpen}>
        <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
          <Flex justify={'between'} align={'center'} className="gap-2">
            <DialogTitle>Change Password</DialogTitle>
            <Button
              variant={'link'}
              className="p-0"
              onClick={() => setChangePasswordModalOpen(false)}
            >
              <Icons.Cross className="w-6 h-6 text-black" />
            </Button>
          </Flex>
          <Box className="space-y-4">
            <Input
              placeholder="Enter Password"
              type="password"
              value={password}
              maxLength={maxLength}
              onChange={(e) => {
                if (isDigit) {
                  const numericValue = e.target.value.replace(/\D/g, '');
                  setPassword(numericValue);
                } else {
                  setPassword(e.target.value);
                }
              }}
            />
            <Input
              placeholder="Enter Confirm Password"
              type="password"
              value={confirmPassword}
              maxLength={maxLength}
              onChange={(e) => {
                if (isDigit) {
                  const numericValue = e.target.value.replace(/\D/g, '');
                  setConfirmPassword(numericValue);
                } else {
                  setConfirmPassword(e.target.value);
                }
              }}
            />
          </Box>

          <DialogFooter>
            <Button
              type="button"
              variant="link"
              onClick={() => setChangePasswordModalOpen(false)}
              className="text-gray-700 font-semibold mr-4"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={
                password === '' ||
                confirmPassword === '' ||
                password !== confirmPassword
              }
              onClick={() => {
                onSubmit(password);
                setChangePasswordModalOpen(false);
              }}
              autoFocus
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
