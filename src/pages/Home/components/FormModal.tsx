import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import Todo from '../../../model'

interface Props {
  open: boolean
  initialText: string
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setHandleSaveEdit: (text: string) => void
}

const FormModal = ({ open, initialText, setIsOpenModal, setHandleSaveEdit}: Props) => {
  const [modalText, setModalText] = useState<string>(initialText)
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
        <Button onClick={(e) => setHandleSaveEdit(modalText)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormModal