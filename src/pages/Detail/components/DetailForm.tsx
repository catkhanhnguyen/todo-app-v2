import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Radio, RadioGroup, FormControlLabel, FormGroup } from '@mui/material';
import Todo from '../../../model'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

interface Props {
  todo: Todo;
  handleBack: () => void;
  handleSave: (fieldValues: { [key: string]: string }) => void;
}

const DetailForm = ({ todo, handleBack, handleSave }: Props) => {
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    const initialFieldValues: { [key: string]: string } = {};
    Object.entries(todo).forEach(([fieldName, fieldValue]) => {
      initialFieldValues[fieldName] = fieldValue?.toString() || '';
    });
    setFieldValues(initialFieldValues);
  }, [todo]);

  const handleChange = (fieldName: string, value: string) => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [fieldName]: value,
    }));
  };

  return (
    <Box
      sx={{
        height: '300px',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
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
            {/* Completed */}
            {fieldName === 'completed' ? (
              <FormControl>
              <FormLabel >Completed</FormLabel>
              <RadioGroup 
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={fieldValue}
                onChange={(e) => handleChange(fieldName, e.target.value)}
              >
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
              </RadioGroup>
            </FormControl>
            ) : 
              // DateTime
              fieldName.includes('time') ? (
              <TextField
                type="datetime-local"
                variant="outlined"
                value={fieldValue}
                fullWidth
                sx={{ mr: 2, color: 'white' }}
                onChange={(e) => handleChange(fieldName, e.target.value)}
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
        <Button variant="contained" onClick={() => handleSave(fieldValues)}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default DetailForm;
