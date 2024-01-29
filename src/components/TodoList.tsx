import { Box } from '@mui/material'
import React from 'react'
import Todo from '../model'

interface Props{
  todos: Todo[]
}
const TodoList = ({ todos }: Props) => {
  return (
    <Box
      sx={{
        height: '300px',
        mt: 2,
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          background: "#888",
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'white'
        }
      }}>
        {todos.map((t) => (
          <li>{t.text}</li>
        ))}
    </Box>
  )
}

export default TodoList