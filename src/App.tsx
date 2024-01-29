import React, { useState } from 'react'
import './App.css'
import { Box, Container, Typography } from '@mui/material'
import InputField from './components/inputField'
import Todo from './model'
import TodoList from './components/TodoList'
import pastelColors from './assets/color'

const App: React.FC = () => {

  const [input, setInput] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input) {
      setTodos([...todos, {id: Date.now(), text: input, completed: false}])
      setInput('')
    }
  }

  const generateRandomColor = () =>
    pastelColors[Math.floor(Math.random() * pastelColors.length)];


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
            TODO APP
          </Typography>
          
          {/* Input field */}
          <InputField input={input} setInput={setInput} handleSubmit={handleSubmit} />
        
          {/* Todo list */}
          <TodoList todos={todos}/>
      </Box>
    </Container>
  )
}

export default App
