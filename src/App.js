import React from 'react';
import Weather from "./Weather";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
      <Weather />
      <footer>
        This project was coded by <a href='https://www.mariyadotkova.com/' target='_blank' > Mariya Dotkova</a> and is {" "}
        <a href='https://github.com/Mariya369/weather-react-app' target='_blank' rel="noreferrer">
          open-sourced on GitHub.
        </a>
      </footer>
      </div>
    </div>
  );
}

export default App;
