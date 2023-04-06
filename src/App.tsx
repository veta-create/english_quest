import { Route, Routes } from 'react-router-dom';
import './App.css';
import ConstructorContainer from './components/Constructor/container';
import GameContainer from './components/Game/container';
import Home from './components/Home';
import SettingsContainer from './components/Settings/container';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<GameContainer />} />
        <Route path='/custom' element={<ConstructorContainer />} />
        <Route path='/settings' element={<SettingsContainer />} />
      </Routes>
   </div>
  );
}

export default App;
