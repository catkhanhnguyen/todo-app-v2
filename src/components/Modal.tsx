import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput } from '@mui/material'
import React from 'react'

const Modal = () => {
  return (
    <Dialog open={}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <OutlinedInput
          placeholder="Todo Text"
          fullWidth
          value={''}
        />
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal