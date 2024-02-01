import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from '../../model';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DetailForm from './components/DetailForm';

const DetailPage = () => {
  const baseUrl = '/todos'
  const { id } = useParams()
  const navigate = useNavigate()

  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setTodos(response.data);
        setSelectedTodo(response.data.find(todo => todo.id === id) || null)
      })
      .catch(error => console.error('Error fetching todos from the database:', error))
  }, [baseUrl, id])

  useEffect(() => {
    const initialFieldValues: { [key: string]: string } = {}
    Object.entries(selectedTodo || {}).forEach(([fieldName, fieldValue]) => {
      initialFieldValues[fieldName] = fieldValue?.toString()
    });
    setFieldValues(initialFieldValues);
  }, [selectedTodo])

  const handleChange = (fieldName: string, value: string) => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [fieldName]: value,
    }))
  }

  

  const handleSave = (fieldValues: { [key: string]: string }) => {
    if (selectedTodo) {
      const updatedTodo: Todo = { ...selectedTodo, ...fieldValues }
  
      setSelectedTodo(updatedTodo)
  
      axios
        .put(`${baseUrl}/${selectedTodo.id}`, updatedTodo)
        .then(() => {
          navigate('/')
        })
        .catch((error) => {
          console.error('Error saving todo:', error.message)
        })
    }
  }
  

  const handleBack = () => {
    navigate('/')
  }

  return (
    <Container disableGutters maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ee9ca7, #ffdde1)',
      }}>
      <Box
        sx={{
          backgroundColor: '#FFE1B6',
          color: '#222f3e',
          borderRadius: '10px',
          boxShadow: 3,
          p: 4,
        }}>
        {/* Title */}
        <Typography textAlign="center" m={2} variant="h5">
          TODO {id}
        </Typography>

        {/* Detail Form */}
        {selectedTodo &&
        <DetailForm
          fieldValues={fieldValues}
          handleChange={handleChange}
          handleBack={handleBack}
          handleSave={handleSave}
        />}
      </Box>
    </Container>
  );
};

export default DetailPage;
