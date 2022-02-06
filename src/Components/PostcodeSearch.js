import { useState } from 'react'
import styles from "./styles.module.css"

const PostcodeSearch= ({onWeatherFound}) => {

    const apiKey = 'unb5dD0MAF7zcGoKXBUX2kYAtkJeqP2k';
    const [postcode, setPostcode]= useState('');

    const getPostcodeLocation = (p) => {

        const url =  `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${p}`
       fetch (url)
       .then(res => res.json())
       .then(res => onWeatherFound({
           
        cityName: res[0].LocalizedName,
        key: res[0].Key,
        country: res[0].Country.LocalizedName
       }));
       setPostcode('');
    };
  
  return (
     <div className={styles.main}>
        <input
        placeholder='enter postcode here'
        value = {postcode}
        onChange={e => setPostcode(e.target.value)}/>
        <button onClick={() => getPostcodeLocation(postcode)}>Search</button>
    </div>
    
  )
}

export default PostcodeSearch
