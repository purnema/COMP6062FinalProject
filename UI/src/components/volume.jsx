import { useEffect, useState } from 'react'
import axios from 'axios';

const Volume = () => {
    const[volume, setVolume]= useState(5);
    const[mute, setMute] = useState(0);
  
  useEffect(() =>{
    axios.get('/api/volume')
    .then(response => {setVolume(response.data.volume);
    });
  },[]);
  
  useEffect(() =>{
    axios.put('/api/volume', {
      volume: volume,
      mute: mute
    })
    .then(response => {
      console.log('System Muted', response.data.mute);
    });
  },[volume,mute]);
  
    return ( 
    <div> 
        <button className ="mb-20" onClick={() => {
            if(!mute)
            {
              if(volume >= 10)
              {
                setVolume(10);
              }
              else
              {
                setVolume(volume+1);
              }
            }
            
          }}>Inc Volume</button>
          <button className ="mb-20" onClick={() => {
            if(!mute)
            {
              if(volume <= 0)
              {
                setVolume(0);
              }
              else
              {
                setVolume(volume-1);
              }
            }
    
          }}>Dec Volume</button>
          <p>Volume: {mute?"muted":volume}</p>
          <button className ="mb-20" onClick={() => {
            setMute(!mute);
          }}>Mute</button>
          
    </div>
    );
}
 
export default Volume;