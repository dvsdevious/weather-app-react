import React from "react"
import Weather from "./Weather"
import "./App.css"

function App() {
  return (
   <div className="App">
     <div className="container"></div>
     <Weather/>
     <footer>
       This project was coded by Daria S. and is open-sourced {""}
     <a href="https://github.com/dvsdevious/weather-app-react.git" target="_blank"> on Github.
     </a>
     </footer>
    </div>)
}

export default App;
