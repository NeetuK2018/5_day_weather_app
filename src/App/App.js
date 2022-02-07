import React from "react";
import axios from "axios";
import WeatherEachDay from "../Components/WeatherEachDay";
import styles from "./styles.module.css"
import { useState, useEffect } from 'react'
import PostcodeSearch from "../Components/PostcodeSearch"



function App() {

  const[latitude, setLatitude] = useState(0);
  const[longitude, setLongitude] = useState(0);
  const[cityName, setCityName] = useState('');
  const[maxTemp, setMaxTemp] = useState(0);
  const[minTemp, setMinTemp] = useState(0);
  const[weather, setWeather] = useState('');
  const[wind, setWind] = useState(0);
  const[humidity, setHumidity]= useState(0);

  const currentPosition = (position)=> {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

const apiKey = '91af7880fda38f058a7884146522ab72';

// current weather has city name
const fetchWeather = async () => {
  try{
    await window.navigator.geolocation.getCurrentPosition(currentPosition);
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
    setCityName(res.data.name)
    }catch(err){
    console.log(err)
  }
};

// 

//one call has 5 days forcast
const fetchMore = async () => {
  try{
    await window.navigator.geolocation.getCurrentPosition(currentPosition);
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
    )
    setMaxTemp(res.data.daily[0].temp.max)
    setMinTemp(res.data.daily[0].temp.min)
  
  }catch(err){
    console.log(err)
  }
};

useEffect(() =>{
  fetchWeather();
   
  
}, [])

    
    return <div className="app">

      <h2>{cityName}</h2>
      <h3>image</h3>
      <h4>{weather}</h4>
      <h1>max:{maxTemp}℃ min:{minTemp}</h1>℃℃℃
      <h5>{wind} {humidity}</h5>

    </div>;
      
  
  }
  
export default App;
