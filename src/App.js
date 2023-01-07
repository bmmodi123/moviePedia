import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Favorite from './Components/Favorite';
import {Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/favorite" element={ <Favorite /> } />
      </Routes>
    </div>
  );
}

export default App;
