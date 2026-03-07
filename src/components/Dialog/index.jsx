import './index.css';
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '../Button';

const Dialog = ({
  open,
  onClose,
  title,
  description,
  children,
  onConfirm,
  confirm = { message: "Confirmar", type: "primary", disabled: false },
  cancel = { message: "Cancelar", type: "secondary", disabled: false },
  disableEscapeKeyDown = false
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      fullWidth
      maxWidth="md"
      className="dialog-container"
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      {title && (
        <DialogTitle className="dialog-title">
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        {description && (
          <DialogContentText className="dialog-description" sx={{ mb: 2 }}>
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} type={cancel.type} text={cancel.message} disabled={cancel.disabled} />
        <Button onClick={onConfirm} type={confirm.type} text={confirm.message} disabled={confirm.disabled} />
      </DialogActions>
    </MuiDialog>
  )
}

export default Dialog;