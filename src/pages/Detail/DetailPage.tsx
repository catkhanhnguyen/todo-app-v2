import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from '../../model'
import pastelColors from '../../assets/color'
import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import DetailForm from './components/DetailForm'

const DetailPage = () => {
  const baseUrl = '/todos'
  const  { id } = useParams()

  const [todos, setTodos] = useState<Todo[]>([])

  const selectedTodo = todos.find(todo => todo.id === id) 

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error('Error fetching todos from the database:', error))
  }, [baseUrl])


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
          backgroundColor: '#303952',
          color: 'white',
          borderRadius: '10px',
          boxShadow: 3,
          p: 4
        }}>
        {/* Title */}
        <Typography textAlign="center" m={2} variant="h5">
          TODO { id }
        </Typography>
        {selectedTodo && <DetailForm todo={selectedTodo} />}
      </Box>
    </Container>
  )
}

export default DetailPage