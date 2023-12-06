import React, { useState, useEffect } from "react";
import axios from "axios";
import Volume from "../components/volume";

const fetchPlaylist = async () => {
  try {
    const response = await fetch("/api/playlist");
    if (!response.ok) {
      throw new Error("Failed to fetch playlist");
    }
    const data = await response.json();
    console.log("Fetched playlist:", data.playlist);
    return data.playlist;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw error;
  }
};

const AudioPlayback = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentdev, setCurrentDev] = useState({
    id: 0,
    name: "n/a",
    type: "n/a",
  });
  const audioRef = React.useRef(new Audio());

  useEffect(() => {
    axios
      .get("/api/bluetooth")
      .then((response) => {
        console.log(response.data);
        setCurrentDev(
          response.data.devices.find(
            (device) => device.id === response.data.connectedDevice
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching bluetooth", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/volume")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching volume:", error);
      });
  }, []);

  useEffect(() => {
    fetchPlaylist()
      .then((data) => {
        setPlaylist(data);
        setCurrentSong(data[currentSongIndex]);
      })
      .catch((error) => console.error("Error fetching playlist:", error));
  }, [currentSongIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopPlayback = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = isLooping;
  };

  const nextTrack = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const restartTrack = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  useEffect(() => {
    setCurrentSong(playlist[currentSongIndex]);
  }, [currentSongIndex, playlist]);

  useEffect(() => {
    if (playlist.length > 0) {
      audioRef.current.src = playlist[currentSongIndex].audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, playlist, isPlaying]);

  return (
    <>
      <div>
        <p>
          Currently connected to:
          {currentdev.name}
        </p>
        {currentSong ? (
          <>
            <p>Title: {currentSong.title}</p>
            <p>Artist: {currentSong.artist}</p>
            <img
              src={currentSong.albumArt}
              alt="Album Art"
              style={{ width: "100px", height: "100px" }}
            />
          </>
        ) : (
          <p>No Current Song</p>
        )}
        <Volume />
      </div>
      <div>
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={stopPlayback}>Stop</button>
        <button onClick={toggleLoop}>
          {isLooping ? "Disable Loop" : "Enable Loop"}
        </button>
        <button onClick={nextTrack}>Next Track</button>
        <button onClick={restartTrack}>Restart Track</button>
      </div>
    </>
  );
};

export default AudioPlayback;
