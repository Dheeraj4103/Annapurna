import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Routes, Route, useLocation} from 'react-router-dom';
import About from './components/About/About';
import MenuPage from './components/MenuPage/MenuPage';
import Login from './components/Login/login';
import SignUp from './components/Login/signup';
import Cart from './components/Cart/Cart';
import ShippingInfo from './components/Cart/ShippingInfo';
import Profile from './components/Profile/Profile';

function App() {

  const location = useLocation();

  if (location.pathname === '/') {
    document.body.style.backgroundImage = 'url("https://res.cloudinary.com/dxn2tkapb/image/upload/v1695917485/Annapurna/assets/jfr1nhlgm1pv3hmsyldy.png")';
  } else {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dxn2tkapb/image/upload/v1697689474/Annapurna/assets/eqdzmjklfrlk45ppzvzy.png')"
  }

  // document.body.style.backgroundImage = 'url("https://res.cloudinary.com/dxn2tkapb/image/upload/v1695917485/Annapurna/assets/jfr1nhlgm1pv3hmsyldy.png")';

  return (
    <Routes>
      <Route exact={true} path='/' Component={HomePage} />
      {/* <Route exact={true} path='/home' Component={HomePage} /> */}
      <Route exact={true} path='/menu' Component={MenuPage} />
      <Route exact={true} path='/about' Component={About} />
      <Route exact={true} path='/login' Component={Login} />
      <Route exact={true} path='/signup' Component={SignUp} />
      <Route exact={true} path='/cart' Component={Cart} />
      <Route exact={true} path='/shippingInfo' Component={ShippingInfo} />
      <Route exact={true} path='/profile' Component={Profile} />
   </Routes>
  );
}

export default App;
