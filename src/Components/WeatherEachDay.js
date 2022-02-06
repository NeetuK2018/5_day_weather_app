

const WeatherEachDay = ({maximum, minimum, outlook, weatherIcon, dayOfWeek}) => {
  return (

    <>
    {dayOfWeek}
    <img src= {`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}/>
    <div>Max: {maximum} Min: {minimum}</div>
    <div>Outlook: {outlook}</div>
    </>

  )
}

export default WeatherEachDay
