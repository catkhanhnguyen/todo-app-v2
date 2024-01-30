import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from '../../model'
import pastelColors from '../../assets/color'
import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  const baseUrl = '/todos'
  const  { id } = useParams()


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
          TODO { id }
        </Typography>
        
      </Box>
    </Container>
  )
}

export default DetailPage