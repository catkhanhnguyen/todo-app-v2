import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { BorderColor, CheckBox, CheckBoxOutlineBlank, Delete } from '@mui/icons-material'
import React from 'react'
import Todo from '../../../model'
import { Link } from 'react-router-dom'

interface Props {
  todos: Todo[]
  handleCheck: (id: string, completed: boolean) => void
  handleDelete: (id: string) => void
  handleEdit: (todo: Todo) => void
}
const TodoList = ({ todos, handleCheck, handleEdit, handleDelete }: Props) => {
  return (
    <Box
      sx={{
        height: '300px',
        mt: 2,
        overflow:"auto",
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          background: "#f1f1f1",
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555'
        }
      }}>
      {todos.map((todo, index) => (
        <Box
          key={index}
          sx={{
            padding: '8px',
            margin: '4px',
            backgroundColor: todo.color,
            color: '#303952',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Tooltip title={todo.completed ? 'true' : 'false'}>
              <IconButton onClick={() => handleCheck(todo.id, todo.completed)}>
                {todo.completed ? (
                  <CheckBox sx={{ fontSize: '18px' }} />
                ) : (
                  <CheckBoxOutlineBlank sx={{ fontSize: '18px' }} />
                )}
              </IconButton>
            </Tooltip>
            
            <Link to={`/todo/${todo.id}`} style={{ color: '#2C3A47', textDecoration: 'none' }}>
              <Typography>{todo.text}</Typography>
            </Link>
          </Box>

          <Box>
            <Tooltip className="tooltip_delete" title="Edit">
              <IconButton onClick={() => handleEdit(todo)}>
                <BorderColor sx={{ fontSize: '18px', color: '' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(todo.id)}>
                <Delete sx={{ fontSize: '18px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default TodoList