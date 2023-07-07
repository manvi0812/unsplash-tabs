/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const ConfirmationDialog = ({ toggle, setToggle, data, setShouldChange }) => {
  const handleCancel = () => {
    setToggle(false);
  };

  const handleOk = () => {
    setShouldChange(true);
    setToggle(false);
  };

  return (
    <div>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth='xs'
        // TransitionProps={{ onEntering: handleEntering }}
        open={toggle}
        keepMounted
      >
        <DialogTitle>{data.title}</DialogTitle>
        <DialogContent dividers>{data.content}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
