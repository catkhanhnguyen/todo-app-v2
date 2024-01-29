import { Box, IconButton, Tooltip } from '@mui/material'
import { BorderColor, CheckBox, CheckBoxOutlineBlank, Delete } from '@mui/icons-material'
import React from 'react'
import Todo from '../model'

interface Props {
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
              <IconButton>
                {todo.completed ? (
                  <CheckBox sx={{ fontSize: '18px' }} />
                ) : (
                  <CheckBoxOutlineBlank sx={{ fontSize: '18px' }} />
                )}
              </IconButton>
            </Tooltip>
            {todo.text}
          </Box>

          <Box>
            <Tooltip className="tooltip_delete" title="Edit">
              <IconButton>
                <BorderColor sx={{ fontSize: '18px', color: '' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
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