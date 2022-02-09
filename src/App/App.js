import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
import styles from "./styles.module.css"
import WeatherEachDay from "../Components/WeatherEachDay";



function App() {

  const[latitude, setLatitude] = useState(0);
  const[longitude, setLongitude] = useState(0);

  const[cityName, setCityName] = useState('');
  const[weather, setWeather] = useState();

  
  const[currentTemp, setCurrentTemp]= useState(0);
  const[currentWind, setCurrentWind]= useState(0);
  const[currentIcon, setCurrentIcon]= useState();
  const[currentday, setCurrentDay]= useState('');
   const[currentWeather, setCurrentWeather]= useState('');

  const currentPosition = (position)=> {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

const apiKey = '91af7880fda38f058a7884146522ab72';
const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
// current weather has city name
const fetchCityName = async () => {
  try{
    const l = window.navigator.geolocation.getCurrentPosition(currentPosition);
    const res = await axios.get(
      API
    )
    setCityName(res.data.name)
    }catch(err){
    console.log("err")
  }
};


//one call has 5 days forcast
const fetchDailyWeather= async () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  try{
   const location=  window.navigator.geolocation.getCurrentPosition(currentPosition);
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
    )

  
     setCurrentTemp(res.data.current.temp)
     setCurrentWind(res.data.current.wind_speed)
    setCurrentIcon(res.data.current.weather[0].icon)
    setCurrentWeather(res.data.current.weather[0].description)
    setCurrentDay(daysOfWeek[new Date(res.data.current.dt).getDay()])
    
    // map through daily array and return object and only need next 5 day forecast
    const daily = res.data.daily;
    const size = 5;
    
    const five = daily.slice(0,size);

    setWeather(five.map(i => {
      return {
        max: i.temp.max,
        min: i.temp.min,
        outlook: i.weather[0].description,
        wind: i.wind_speed,
        icon: i.weather[0].icon,
        dayOfWeek: daysOfWeek[new Date(i.dt).getDay()]
        
      }
    }))
    
    
  }catch(err){
    console.log("error2")
  }
};

// uncomment for timed refresh and comment out below useEffect
// useEffect(() => {
//   const interval = setInterval(() => {
//     console.log('This will run every second!')
//     fetchCityName();
//   fetchDailyWeather();
//   }, 900000);
//   return () => clearInterval(interval);
// }, []);
useEffect(() => {
 
     fetchCityName();
    fetchDailyWeather();

  
  }, []);
  

  

    
    return (
      <div className={styles.current}>
        <h2>{cityName}</h2>
        <img alt= "weather" src={`Http://openweathermap.org/img/wn/${currentIcon}@2x.png`}/>
        <h3>{currentday}</h3>
        <h3>{currentWeather}</h3>
        <h3>Temp: {currentTemp}℃</h3>
        <h5>wind:{currentWind}m/s </h5>
        <h2>Next Five Day Forecast</h2>
        <div className ={styles.main}>
          {!!weather && weather.map((i, index) => (
            <WeatherEachDay key={index} icon = {i.icon} outlook ={i.outlook} wind={i.wind} min={i.min} max={i.max}/>
            
          ))}
        </div>

      </div>
    
    
    
    )}
  

export default App;
