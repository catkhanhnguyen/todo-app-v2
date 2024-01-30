import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { BorderColor, CheckBox, CheckBoxOutlineBlank, Delete } from '@mui/icons-material';
import React from 'react';
import Todo from '../../../model';

interface Props {
  todo: Todo
  handleEdit: () => void
}

const DetailForm = ({ todo, handleEdit }: Props) => {

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

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
              color: '#2C3A47',
              ml: 1,
            }}
          >
            <Typography>
              {`${capitalizeFirstLetter(fieldName)}: ${fieldValue}`}
            </Typography>
          </Box>

          <Box>
            <Tooltip className="tooltip_delete" title="Edit">
              <IconButton onClick={() => handleEdit()}>
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
  );
};

export default DetailForm;
