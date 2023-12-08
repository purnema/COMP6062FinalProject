import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaSyncAlt,
  FaBan,
  FaStepForward,
  FaUndo,
} from "react-icons/fa";
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
  const audioRef = React.useRef(new Audio());

  useEffect(() => {
    axios
      .get("http://localhost:5173/api/volume")
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
        <button
          className="w-24 h-24 rounded-full focus:outline-none"
          onClick={togglePlayPause}
          style={{ backgroundColor: "yellow" }}
        >
          {isPlaying ? (
            <FaPause className="text-white" size={32} />
          ) : (
            <FaPlay className="text-white" size={32} />
          )}
        </button>
        <button
          className="w-24 h-24 rounded-full focus:outline-none"
          onClick={stopPlayback}
          style={{ backgroundColor: "lightsalmon" }}
        >
          <FaStop className="text-white" size={32} />
        </button>
        <button
          className=" text-white px-4 py-2 rounded"
          onClick={toggleLoop}
          style={{ backgroundColor: "moccasin" }}
        >
          {isLooping ? (
            <>
              <FaBan className="mr-2" /> Disable Loop
            </>
          ) : (
            <>
              <FaSyncAlt className="mr-2" /> Enable Loop
            </>
          )}
        </button>
        <button
          className=" text-white px-4 py-2 rounded"
          onClick={nextTrack}
          style={{ backgroundColor: "cornflowerblue" }}
        >
          <FaStepForward className="mr-2" /> Next Track
        </button>

        <button
          className=" text-white px-4 py-2 rounded"
          onClick={restartTrack}
          style={{ backgroundColor: "deeppink" }}
        >
          <FaUndo className="mr-2" /> Restart Track
        </button>
      </div>
    </>
  );
};

export default AudioPlayback;
