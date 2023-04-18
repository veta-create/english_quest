import { Route, Routes } from 'react-router-dom';
import './App.css';
import ConstructorContainer from './components/Constructor/container';
import HomeContainer from './components/Home/container';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='/custom' element={<ConstructorContainer />} />
        <Route path='/' element={<HomeContainer />} />
      </Routes>
    </div>
  );
}

export default App;
