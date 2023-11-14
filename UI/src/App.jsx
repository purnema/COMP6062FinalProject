import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const[message, setMessage]= useState('');

useEffect(() =>{
  axios.get('/api')
  .then((response) =>{
    console.log(response);
  })

},[])


  return (
    <>
      
    </>
  )
}

export default App
