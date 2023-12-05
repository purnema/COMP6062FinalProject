import { useState } from 'react';
import './App.css'
import AudioPlayback from './screens/AudioPlayback';
import BluetoothDevices from './screens/BluetoothDevices';


function App() {
  const [screen, setScreen]=useState('AudioPlayback');

  const goToBlue = () => {
    setScreen('BluetoothDevices');
  };
  const goToAudio = () => {
    setScreen('AudioPlayback');
  };


  return (
    <>
      <div>
      <h1>Settings</h1>
      {screen === 'AudioPlayback' && (
        <>
          <AudioPlayback/>
          <button onClick={goToBlue}>Bluetooth</button>
        </>
      )}
      {screen === 'BluetoothDevices' && (
        <>
          <BluetoothDevices/>
          <button onClick={goToAudio}>Back</button>
        </>
      )}
      </div>
    </>
  );
};

export default App;
