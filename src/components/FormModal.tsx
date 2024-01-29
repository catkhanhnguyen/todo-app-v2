import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput } from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
}

const FormModal = ({ open }: Props) => {
  return (
    <Dialog open={open}>
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

export default FormModal