import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import About from './components/About/About';
import MenuPage from './components/MenuPage/MenuPage';

function App() {
  return (
    <Routes>
      <Route exact={true} path='/' Component={HomePage} />
      <Route exact={true} path='/menu' Component={MenuPage} />
      <Route exact={true} path='/about' Component={About} />
   </Routes>
  );
}

export default App;
