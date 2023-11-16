import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Routes, Route, useLocation} from 'react-router-dom';
import About from './components/About/About';
import MenuPage from './components/MenuPage/MenuPage';

function App() {

  const location = useLocation();

  if (location.pathname === '/') {
    document.body.style.backgroundImage = 'url("https://res.cloudinary.com/dxn2tkapb/image/upload/v1695917485/Annapurna/assets/jfr1nhlgm1pv3hmsyldy.png")';
  } else {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dxn2tkapb/image/upload/v1697689474/Annapurna/assets/eqdzmjklfrlk45ppzvzy.png')"
  }

  return (
    <Routes>
      <Route exact={true} path='/' Component={HomePage} />
      <Route exact={true} path='/menu' Component={MenuPage} />
      <Route exact={true} path='/about' Component={About} />
   </Routes>
  );
}

export default App;
