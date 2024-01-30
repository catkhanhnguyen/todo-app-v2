import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import Todo from '../../../model'

interface Props {
  open: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  handleSaveEdit
}

const FormModal = ({ open, setIsOpenModal, handleSaveEdit }: Props) => {
  const [modalText, setModalText] = useState<string>('')
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>Edit Todo</DialogTitle>
      <DialogContent>
        <OutlinedInput
          placeholder="Todo Text"
          fullWidth
          value={modalText}
          onChange={(e) => setModalText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => setIsOpenModal(false)}>Cancel</Button>
        <Button onClick={() => handleSaveEdit(modalText)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormModal