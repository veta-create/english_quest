import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeContainer from './components/Home/container';
import Game from './components/Game';
import Constructor from './components/Constructor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='/custom' element={<Constructor />} />
        <Route path='/' element={<HomeContainer />} />
      </Routes>
    </div>
  );
}

export default App;
