import { Box, Button, OutlinedInput } from '@mui/material'
import React from 'react'

interface Props{
    input: string
    setInput: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
}

const InputField = ({ input, setInput, handleSubmit }: Props) => {
  return (
    <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '@media (min-width: 600px)': {
              flexDirection: 'row',
            },
          }}
        >
          <OutlinedInput
            placeholder="Your activity here"
            value={input}
            sx={{ height: '40px', width: '250px', color: 'white' }}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundImage: 'linear-gradient(to right, #ee9ca7, #ffdde1)',
              color: 'white',
              height: '40px',
              '&:hover': {
                backgroundImage: 'linear-gradient(to right, #ee9ca7, #ffdde1)',
              },
            }}
          >
            Add
          </Button>
        </Box>
      </form>
  )
}

export default InputField