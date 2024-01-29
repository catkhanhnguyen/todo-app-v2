import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Box, Container, Typography } from '@mui/material'
import InputField from './components/inputField'
import Todo from './model'
import TodoList from './components/TodoList'
import pastelColors from './assets/color'

const App: React.FC = () => {

  const baseUrl = '/todos';

  const [input, setInput] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalText, setModalText] = useState<string>('')

  const generateRandomColor = () =>
    pastelColors[Math.floor(Math.random() * pastelColors.length)];

  useEffect(() => {
    axios.get(`${baseUrl}`)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error('Error fetching todos from the database:', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() !== '') {
      const existedTodo = todos.find((todo) => todo.text === input)

      if (existedTodo) {
        console.log('Already existed')
      } else {
        const randomColor = generateRandomColor();
        const newTodo = { id: Date.now(), text: input, color: randomColor, completed: false }

        axios.post(`${baseUrl}`, newTodo)
          .then((response) => {
            const createdTodo: Todo = response.data; // Extracting todo data from AxiosResponse
            setTodos([...todos, createdTodo]);
          })
          .catch(error => console.error('Error saving todo to database:', error))
      }
      setInput('')
    }

  }

  const handleEdit = (todo: Todo) => {

  }

  const handleDelete = (id: number) => {
    // Make the delete request to the server
    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        // If the deletion is successful, update the local state
        const updatedTodos: Todo[] = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
  
        console.log(`Todo with ID ${id} deleted successfully.`);
      })
      .catch(error => {
        // Handle errors, log to the console
        if (error.response && error.response.status === 404) {
          console.error(`Todo with ID ${id} not found on the server.`);
        } else {
          console.error(`Error deleting todo with ID ${id} from the database:`, error);
        }
      });
  };
  


  const handleCheck = (id: number, completed: boolean) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    const updateCurrentTodo = { id: id, text: currentTodo?.text, color: currentTodo?.color, completed: !completed };
    
    axios.put(`${baseUrl}/${id}`, updateCurrentTodo)
      .then(() => {
        const updatedTodos: Todo[] = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error(`Error updating todo with ID ${id} in the database:`, error.response);
      });
  };
  
  



  return (
    <Container disableGutters maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ee9ca7, #ffdde1)'
      }}>
      <Box
        sx={{
          backgroundColor: '#303952',
          color: 'white',
          borderRadius: '10px',
          boxShadow: 3,
          p: 4
        }}>
        {/* Title */}
        <Typography textAlign="center" m={2} variant="h5">
          TODO APP
        </Typography>

        {/* Input field */}
        <InputField input={input} setInput={setInput} handleSubmit={handleSubmit} />

        {/* Todo list */}
        <TodoList todos={todos} handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} />
      </Box>
    </Container>
  )
}

export default App
