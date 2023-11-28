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

useEffect(() =>{
  axios.put('/api/volume', {
    volume: volume
  })
  .then(response => {
    console.log('Volume saved succeffuly:', response.data.volume);
  });
},[volume]);

  return (
    <>
      <div>
      <h1>Settings</h1>
      <button className ="mb-20" onClick={() => {

        if(volume >= 10)
        {
          setVolume(10);
        }
        else
        {
          setVolume(volume+1);
        }
      }}>Inc Volume</button>
        <button className ="mb-20" onClick={() => {
        if(volume <= 0)
        {
          setVolume(0);
        }

        else
        {
          setVolume(volume-1);
        }
      }}>Dec Volume</button>
      <p>Volume: {volume}</p>
      </div>
    </>
  );
};

export default App;

