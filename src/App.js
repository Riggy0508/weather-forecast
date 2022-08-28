import cold from './assets/winter-snowfall-5120x2880.jpeg';
import sunset from './assets/hot-summer-day-on-the-field-4K-wallpaper.jpg';
import Description from './components/Description';
import { getFormattedWeatherData } from './weatherService';
import { useEffect, useState } from 'react';
function App() {
  const [city, setCity] = useState('Los Angeles');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(sunset);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //setting the background dynamically
      const threshold = units == 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(cold);
      else setBg(sunset);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    //console.log(currentUnit);

    const isCelsius = currentUnit == 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <div className='app' style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {weather && (
          <div className='container'>
            <div className='section section__inputs'>
              <input
                onKeyDown={enterKeyPressed}
                type='text'
                name='city'
                placeholder=' Enter City Name here...'
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt='weatherIcon' />
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()}°${
                  units === 'metric' ? 'C' : 'F'
                }`}</h1>
              </div>
            </div>
            {/*dscription*/}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
