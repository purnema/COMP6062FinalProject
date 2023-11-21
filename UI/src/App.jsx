import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const[volume, setVolume]= useState(5);

useEffect(() =>{
  axios.get('/api/volume')
  .then(response => {setVolume(response.data.volume);
  });

},[]);
const handleVolumeChange = (newVolume) => {

    axios.put('/api/volume',{ volume: newVolume })
    .then(response => {
      console.log(response.data.message);
      setVolume(newVolume);
    });
  };
  return (
    <>
      <div>
      <h1>Settings</h1>
      <p>Volume: {volume}</p>
       </div>
    </>
  );
};

export default App;
