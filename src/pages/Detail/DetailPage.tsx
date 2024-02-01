import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from '../../model';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DetailForm from './components/DetailForm';

const DetailPage = () => {
  const baseUrl = '/todos';
  const { id } = useParams();
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setTodos(response.data);
        setSelectedTodo(response.data.find(todo => todo.id === id) || null);
      })
      .catch(error => console.error('Error fetching todos from the database:', error));
  }, [baseUrl, id]);

  const handleSave = async (fieldValues: { [key: string]: string }) => {
    try {
      if (selectedTodo) {
        const updatedTodo: Todo = { ...selectedTodo, ...fieldValues };

        // Update the todo on the UI
        setSelectedTodo(updatedTodo);

        // Make a PUT request to update the todo in the API
        await axios.put(`${baseUrl}/${selectedTodo.id}`, updatedTodo);

        navigate('/');
      }
    } catch (error) {
      console.error('Error saving todo:', error.message);
      // Handle the error, show an error message, etc.
    }
  };

  const handleBack = () => {
    navigate('/');
  };

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
          backgroundColor: '#3c6382',
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
        {selectedTodo && <DetailForm todo={selectedTodo} handleBack={handleBack} handleSave={handleSave} />}
      </Box>
    </Container>
  );
};

export default DetailPage;
