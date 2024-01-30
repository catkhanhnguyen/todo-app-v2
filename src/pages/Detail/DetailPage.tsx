import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from '../../model'
import pastelColors from '../../assets/color'
import { Box, Container, Modal, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import DetailForm from './components/DetailForm'
import FormModal from './components/FormModal'

const DetailPage = () => {
  const baseUrl = '/todos'
  const  { id } = useParams()

  const [todos, setTodos] = useState<Todo[]>([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [editModal, setEditedModal] = useState<string>('')
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);



  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setTodos(response.data)
        setSelectedTodo(response.data.find(todo => todo.id === id) || null)
      })
      .catch(error => console.error('Error fetching todos from the database:', error))
  }, [baseUrl])

  const handleEdit = () => {
    setIsOpenModal(true)
    if (selectedTodo) {
      setEditedModal(selectedTodo.text || ''); 
    }
  }

  const handleSaveEdit = (text: string) => {
    if (selectedTodo) {
      const updatedTodo: Todo = { ...selectedTodo, text }

      axios.put(`${baseUrl}/${selectedTodo?.id}`, updatedTodo)

      setSelectedTodo(updatedTodo);
    }
    
    setIsOpenModal(false)
  };

  return (
    <Container disableGutters maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ee9ca7, #ffdde1)'
      }}>
      <Box
        sx={{
          backgroundColor: '#b8e994',
          color: '#222f3e',
          borderRadius: '10px',
          boxShadow: 3,
          p: 4
        }}>
        {/* Title */}
        <Typography textAlign="center" m={2} variant="h5">
          TODO { id }
        </Typography>

        {/* Detail Form */}
        {selectedTodo && <DetailForm todo={selectedTodo} handleEdit={handleEdit} />}

        {/* Modal */}
        <FormModal open={isOpenModal} setIsOpenModal={setIsOpenModal} handleSaveEdit={handleSaveEdit}/>
      </Box>
    </Container>
  )
}

export default DetailPage