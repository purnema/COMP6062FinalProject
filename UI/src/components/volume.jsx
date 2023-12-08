import { useEffect, useState } from "react";
import axios from "axios";
import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";

const Volume = () => {
  const [volume, setVolume] = useState(5);
  const [mute, setMute] = useState(0);

  useEffect(() => {
    axios.get("/api/volume").then((response) => {
      setVolume(response.data.volume);
    });
  }, []);

  useEffect(() => {
    axios
      .put("/api/volume", {
        volume: volume,
        mute: mute,
      })
      .then((response) => {
        console.log("System Muted", response.data.mute);
      });
  }, [volume, mute]);

  return (
    <div>
      <button
        className="mb-20 w-24 h-24 rounded-full text-white focus:outline-none bg-blue-500"
        onClick={() => {
          if (!mute && volume < 10) {
            setVolume(volume + 1);
          }
        }}
        style={{ backgroundColor: "	palegreen" }}
      >
        <FaVolumeUp className="mr-2" size={20} />
        Increase Volume
      </button>
      <button
        className="mb-20 w-24 h-24 rounded-full text-white focus:outline-none bg-blue-500"
        onClick={() => {
          if (!mute && volume > 0) {
            setVolume(volume - 1);
          }
        }}
        style={{ backgroundColor: "lavender" }}
      >
        <FaVolumeDown className="mr-2" size={20} />
        Dec Volume
      </button>
      <p>Volume: {mute ? "muted" : volume}</p>
      <button
        className="mb-20 w-24 h-24 rounded-full text-white focus:outline-none bg-blue-500"
        onClick={() => {
          setMute(!mute);
        }}
        style={{ backgroundColor: "turquoise" }}
      >
        {mute ? (
          <>
            <FaVolumeMute className="mr-2" size={20} />
            Unmute
          </>
        ) : (
          <>
            <FaVolumeUp className="mr-2" size={20} />
            Mute
          </>
        )}
      </button>
    </div>
  );
};

export default Volume;
