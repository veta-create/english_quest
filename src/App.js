import './App.css';
import ConstructorContainer from './components/Constructor/container';
import GameContainer from './components/Game/container';
import SettingsContainer from './components/Settings/container';

function App() {
  return (
    <div className="App">
      {/* <GameContainer /> */}
      {/* <ConstructorContainer /> */}
      <SettingsContainer />
    </div>
  );
}

export default App;
