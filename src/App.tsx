import { Route, Routes } from 'react-router-dom';
import './App.css';
import ConstructorContainer from './components/Constructor/container';
import GameContainer from './components/Game/container';
import HomeContainer from './components/Home/container';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/game' element={<GameContainer />} />
        <Route path='/custom' element={<ConstructorContainer />} />
        <Route path='/' element={<HomeContainer />} />
      </Routes>
   </div>
  );
}

export default App;
