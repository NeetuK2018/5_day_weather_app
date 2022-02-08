

const WeatherEachDay = ( {outlook, max, min, wind, icon}) => {
  return (
<div >
  <div>
      <img src={`Http://openweathermap.org/img/wn/${icon}@2x.png`}/></div>
      <h4>{outlook}</h4> 
      <h5>max: {max}℃ </h5> 
      <h5>min: {min}℃ </h5>
      <h5>wind:{wind}m/s </h5>
       </div>
     
  )
}

export default WeatherEachDay
