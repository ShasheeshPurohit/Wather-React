import logo from './logo.svg';
import {useState} from 'react';
import sunLogo from './sun.svg';
import cloudLogo from './clouds.svg';
import snowFlake from './snowflake.svg';
import rainLogo from './rain.svg';
import './App.css';

const api = {
  key: "ff27400b69f75694604ddba810397053",
  base: "https://api.openweathermap.org/data/2.5/"
}

function SearchBox({search, placeholder}){
  return(
    <div>
      <input type="text" 
      onKeyPress={search} placeholder={placeholder}
      className="userInputField"></input>
    </div>
  );
}

function App() {
  const [weather, setWeather] = useState({});
  
  function search(event){
    if(event.key === "Enter"){
      fetch(`${api.base}weather?q=${event.target.value}&units=metric&appid=${api.key}`)
      .then(response => response.json())
      .then(weatherData => {
        setWeather(weatherData);
    })
   
  }
  }
 

  function getLogo(){
    let condition = weather.weather.[0].main;
    
    if(condition==="Clouds" || condition==="Fog"){
      return (<img src={cloudLogo} className="App-logo-cloud" alt="logo" />)
    }
    else if(condition==="Snow"){
      return (<img src={snowFlake} className="App-logo" alt="logo" />)
    }
    else if(condition==="Rain"){
      return (<img src={rainLogo} className="App-logo-cloud" alt="logo" />)
    }
    else{
      return (<img src={sunLogo} className="App-logo" alt="logo" />)
    }
  }

  return (
    <div className={(typeof weather.sys != 'undefined')?((weather.main.temp < 10)? 'App cold':'App'):'App'}>
      <SearchBox  search={search} placeholder={"Enter a city and 'ENTER'"}/>
      {(typeof weather.sys != "undefined")?(
        <header className="App-header">
        
        <div className="weather-data">
          <h1>{weather.name},{weather.sys['country']}</h1>
          <h2 className="temp">{Math.round(weather.main.temp)}°</h2>
        </div>
        {getLogo()}
        
        
      </header>
      ):('')}
      
    </div>
  );
}

export default App;
