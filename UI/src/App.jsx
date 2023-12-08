import { useState } from "react";
import "./App.css";
import { FaArrowLeft, FaBluetooth } from "react-icons/fa";
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
      <div
        className="bg-gray-200 min-h-screen"
        style={{ backgroundColor: "seashell" }}
      >
        {screen === "AudioPlayback" && (
          <>
            <h1>Music Player</h1>
            <AudioPlayback />
            <button
              className="flex items-center justify-center w-24 h-24 rounded-full text-white focus:outline-none bg-blue-500"
              onClick={goToBlue}
              style={{ backgroundColor: "blue" }}
            >
              <FaBluetooth className="mr-2" size={20} />
              Bluetooth
            </button>
          </>
        )}
        {screen === "BluetoothDevices" && (
          <>
            <h1>Settings</h1>
            <BluetoothDevices />
            <button
              className="w-24 h-24 rounded-full text-white focus:outline-none"
              onClick={goToAudio}
              style={{ backgroundColor: "lightseagreen" }}
            >
              <FaArrowLeft className="text-white" size={32} />
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
