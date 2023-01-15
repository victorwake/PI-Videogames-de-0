import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/landingPage/LandingPage';
import { Home } from './components/home/Home';
import { About } from './components/about/About';
import { GameDetail } from './components/gameDetail/GameDetail';
import { CreateGame } from './components/create/Create';
import { Error } from './components/error/Error'
import { SetGame } from './components/setGame/SetGame';




function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateGame />} />
          <Route path='/game/:id' element={<GameDetail />} />
          <Route path='/setgame' element={<SetGame />} />
          <Route path='*' element={ <Error /> } />
      </Routes>
    </div>
  );
}

export default App;
