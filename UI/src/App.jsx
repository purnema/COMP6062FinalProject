import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AudioPlayback from './screens/AudioPlayback';


function App() {
  return (
    <>
      <div>
      <h1>Music Player</h1>
      <Router>
        <Routes>
          <Route path="/" element={<AudioPlayback />} />
        </Routes>
      </Router>

      </div>
    </>
  );
};

export default App;
