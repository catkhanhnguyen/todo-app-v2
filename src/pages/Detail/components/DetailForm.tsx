import React, { useState, useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material'
import Todo from '../../../model'
import { DatePicker } from '@mui/x-date-pickers'

interface Props {
  todo: Todo
  handleBack: () => void
  handleSave: (fieldValues: { [key: string]: string }) => void
}

const DetailForm = ({ todo, handleBack, handleSave }: Props) => {
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({})

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  useEffect(() => {
    const initialFieldValues: { [key: string]: string } = {};
    Object.entries(todo).forEach(([fieldName, fieldValue]) => {
      initialFieldValues[fieldName] = fieldValue?.toString() || ''
    });
    setFieldValues(initialFieldValues);
  }, [todo]);

  const handleChange = (fieldName: string, value: string) => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [fieldName]: value,
    }));
  };

  const handleSaveClick = () => {
    handleSave(fieldValues);
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
        {Object.entries(fieldValues).map(([fieldName, fieldValue], index) => (
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
            {/* Use DatePicker for date input */}
            {fieldName.toLowerCase().includes('date') ? (
              <DatePicker
                label={capitalizeFirstLetter(fieldName)}
                value={new Date(fieldValue)} // Assuming fieldValue is a valid date string
                onChange={(date) => handleChange(fieldName, date?.toISOString() || '')}
                sx={{ mr: 2 }}
              />
            ) : (
              <TextField
                label={capitalizeFirstLetter(fieldName)}
                variant="outlined"
                value={fieldValue}
                fullWidth
                sx={{ mr: 2, color: 'white' }}
                onChange={(e) => handleChange(fieldName, e.target.value)}
              />
            )}
          </Box>
        ))}
      </form>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSaveClick}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default DetailForm;
