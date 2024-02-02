import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Container, Typography } from '@mui/material'
import InputField from './components/inputField'
import Todo from '../../model'
import TodoList from './components/TodoList'
import pastelColors from '../../assets/color'
import FormModal from './components/FormModal'
import Toast from './components/Toast'

const HomePage = () => {
  const baseUrl = '/todos';

  const [input, setInput] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<Todo>({ id: '', text: '', color: '', completed: false, location: '', member: [], time: '' })
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')


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
        openToast('Todo already exists! Fulfill it now?!')
      } else {
        const randomColor = generateRandomColor();
        const newTodo = { id: Date.now().toString(), text: input, color: randomColor, completed: false, location: '', member: [], time: '' }

        axios.post(`${baseUrl}`, newTodo)
          .then((response) => {
            const createdTodo: Todo = response.data;
            setTodos([...todos, createdTodo]);
          })
          .catch(error => console.error('Error saving todo to database:', error))
      }
      setInput('')
    } else {
      openToast('Todo is invalid: Please enter a non-empty string!!')
    }

  }

  const handleEdit = (todo: Todo) => {
    setIsOpenModal(true)
    setEditTodo({
      ...todo
    })
  }

  const handleSaveEditTodo = (text: string) => {
    const updatedTodo = { ...editTodo, text: text };

    axios.put(`${baseUrl}/${editTodo.id}`, updatedTodo)
      .then(() => {
        const updatedTodos: Todo[] = todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: text } : todo
        );
        setTodos(updatedTodos)
        setIsOpenModal(false)
      })
      .catch(error => console.error('Error updating todo:', error))
  }


  const handleDelete = (id: string) => {
    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        const updatedTodos: Todo[] = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error(`Error deleting todo with ID ${id} from the database:`, error)
      })
  };


  const handleCheck = (id: string, completed: boolean) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    const updateCurrentTodo = { 
      id: id,
      text: currentTodo?.text,
      color: currentTodo?.color,
      completed: !completed,
      location: currentTodo?.location,
      member: currentTodo?.member,
      time: currentTodo?.time
    };
  
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
  

  const openToast = (message: string) => {
    setIsOpenToast(true)
    setToastMessage(message)
  }

  const closeToast = () => {
    setIsOpenToast(false)
  }



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

        {/* Modal */}
        <FormModal
          key={editTodo?.id}
          open={isOpenModal}
          initialText={editTodo?.text}
          setIsOpenModal={setIsOpenModal}
          setHandleSaveEdit={handleSaveEditTodo}
        />

        {/* Toast */}
        <Toast
          isOpenToast={isOpenToast}
          toastMessage={toastMessage}
          closeToast={closeToast}
        />
      </Box>
    </Container>
  )
}

export default HomePage