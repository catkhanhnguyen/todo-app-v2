import { Box, IconButton, Tooltip } from '@mui/material';
import { BorderColor, CheckBox, CheckBoxOutlineBlank, Delete } from '@mui/icons-material';
import React from 'react';
import Todo from '../../../model';

interface Props {
  todo: Todo;
}

const DetailForm = ({ todo }: Props) => {
  
  const handleCheck = (id: string, completed: boolean) => {
    // Xử lý khi check todo
  };

  const handleEdit = (todo: Todo) => {
    // Xử lý khi edit todo
  };

  const handleDelete = (id: string) => {
    // Xử lý khi delete todo
  };

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
      }}
    >
      {/* Dùng Object.entries để map qua các trường của todo */}
      {Object.entries(todo).map(([fieldName, fieldValue], index) => (
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
            {`${fieldName}: ${fieldValue}`}
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
  );
};

export default DetailForm;
