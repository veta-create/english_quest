import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import ConstructorContainer from './components/Constructor/container';
import GameContainer from './components/Game/container';
import Home from './components/Home';
import SettingsContainer from './components/Settings/container';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Routes>
          <Route path="/game" render={() => <GameContainer />} />
          <Route path="/custom" render={() => <ConstructorContainer />} />
          <Route path="/settings" render={() => <SettingsContainer />} />
      </Routes> */}
      <GameContainer />
      {/* <ConstructorContainer /> */}
      {/* <SettingsContainer /> */}
   </div>
  );
}

export default App;
