import React from 'react';
import { Box, IconButton, Tooltip, Typography, TextField } from '@mui/material';
import { BorderColor, Delete } from '@mui/icons-material';
import Todo from '../../../model';

interface Props {
  todo: Todo;
  handleEdit: () => void;
}

const DetailForm = ({ todo, handleEdit }: Props) => {
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <Box
      sx={{
        height: '300px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          background: '#888',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'white',
        },
      }}
    >
      <form>
        {Object.entries(todo).map(([fieldName, fieldValue], index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              mt: 2,
            }}
          >
            <TextField
              label={capitalizeFirstLetter(fieldName)}
              variant="outlined"
              value={fieldValue?.toString() || ''}
              fullWidth
              sx={{ mr: 2, color: 'white' }}
            />
          </Box>
        ))}

      </form>
    </Box>
  );
};

export default DetailForm;
