import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home';
import { LandingPage } from './components/landingPage/LandingPage';
// import { Nav } from './components/nav/Nav';
import { About } from './components/about/About';
import { CreateGame } from './components/create/Create';
import { Details } from './components/details/Details';



function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateGame />} />
          <Route path='/game/:id' element={<Details />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
