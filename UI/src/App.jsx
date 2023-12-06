import { useState } from "react";
import "./App.css";
import AudioPlayback from "./screens/AudioPlayback";
import BluetoothDevices from "./screens/BluetoothDevices";

function App() {
  const [screen, setScreen] = useState("AudioPlayback");

  const goToBlue = () => {
    setScreen("BluetoothDevices");
  };
  const goToAudio = () => {
    setScreen("AudioPlayback");
  };

  return (
    <>
      <div>
        {screen === "AudioPlayback" && (
          <>
            <h1>Music Player</h1>
            <AudioPlayback />
            <button onClick={goToBlue}>Bluetooth</button>
          </>
        )}
        {screen === "BluetoothDevices" && (
          <>
            <h1>Settings</h1>
            <BluetoothDevices />
            <button onClick={goToAudio}>Back</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
