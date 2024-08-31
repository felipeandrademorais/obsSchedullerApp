import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { StartTransmission } from './pages/StartTransmission';
import { SwitchScene } from './pages/SwitchScene';
import { EndTransmission } from './pages/EndTransmission';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-transmission" element={<StartTransmission />} />
        <Route path="/switch-scene" element={<SwitchScene />} />
        <Route path="/end-transmission" element={<EndTransmission />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
