import React from "react";
import WeatherEachDay from "../Components/WeatherEachDay";
import styles from "./styles.module.css"
import { useState, useEffect } from 'react'
import PostcodeSearch from "../Components/PostcodeSearch"



function App() {

const apiKey = 'unb5dD0MAF7zcGoKXBUX2kYAtkJeqP2k';


const [weatherInfo, setWeatherInfo] = useState();
const [locationKey, setLocationKey] = useState('');

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const iconNumber = (number) => {
const stringNumber = number.toString();
const stringLength = stringNumber.length;

if (stringLength === 1){
  return '0' + stringNumber;
}else{
  return stringNumber
}
};


useEffect (() => {
  
  if(locationKey){
    fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`
      )
      
      .then(res => res.json())
      .then(res => setWeatherInfo(res.DailyForecasts
        .map(w =>{
        return {
          maximum: w.Temperature.Maximum.Value,
          minimum: w.Temperature.Minimum.Value,
          outlook: w.Day.IconPhrase,
          weatherIcon: iconNumber(w.Day.Icon),
          dayOfWeek: daysOfWeek[new Date (w.Date).getDay()],
          
        }
      }
        )))};
    }, [locationKey], daysOfWeek);
  
    useEffect(()=>{
    },[weatherInfo], daysOfWeek);
    
    return (
      
      <div>
        <h1>{locationKey}</h1>
        <PostcodeSearch
        onWeatherFound = {cityInfo => {
          setLocationKey(cityInfo.key)
          setLocationKey(cityInfo.country)
          setLocationKey(cityInfo.cityName)
          
          
        }}/>
        
        <div className ={styles.main}>
        {!!weatherInfo && weatherInfo.map((i, index) => (
          <div  className ={styles.card}key={index}>
          <WeatherEachDay maximum={i.maximum} minimum={i.minimum} outlook={i.outlook} weatherIcon={i.weatherIcon} dayOfWeek ={i.dayOfWeek}/>
        </div>
        ))}
        </div>
      </div>
    );
  }

export default App;
