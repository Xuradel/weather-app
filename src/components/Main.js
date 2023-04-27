import axios from "axios";
import { useState, useEffect } from 'react';

const Main = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState("sunset");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b1629a0493b689f9d9641508c444f579`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
            })
            setLocation('')
            climateChecker()
            
        }
    }

    function climateChecker(){
        return data.weather ? setWeather(data.weather[0].main) : null
    }

    useEffect(()=>{
        climateChecker()
    })

    

    
    return (
        <div className="main-container">
            {weather === "sunset" ? <img src={require("../Images/sunset.jpg")} className="background-image"></img> : null}
            {weather === "Clear" ? <img src={require("../Images/clear.jpg")} className="background-image"></img> : null}
            {weather === "Rain" ? <img src={require("../Images/rain.jpeg")} className="background-image"></img> : null}
            {weather === "Clouds" ? <img src={require("../Images/clouds.jpg")} className="background-image"></img> : null}
            {weather === "Thunderstorm" ? <img src={require("../Images/thunderstorm.jpg")} className="background-image"></img> : null}
            {weather === "Drizzle" ? <img src={require("../Images/drizzle.jpeg")} className="background-image"></img> : null}
            {weather === "Snow" ? <img src={require("../Images/snow.jpg")} className="background-image"></img> : null}

            <div className="search">
                <input
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                    value={location}
                    type="text">
                </input>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                {data.name != undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °F</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default Main;