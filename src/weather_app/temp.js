import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Meerut");
  const [tempInfo, setTempInfo] = useState({}); 

  const getWeatherInfo = async () => { // when we use asyn we have to use the try-catch block
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=72aa8c5d500083ee405f7324713949f3`;

      let res = await fetch(url);
      let data = await res.json(); // converting data into json

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0]; // changing the name main to weathermood in parenthesis
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = { // creting the object
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo); // data is stored in tempInfo
    } catch (error) {
      console.log(error);
    }
  };

  // page refresh hotein h kuch kaam ho therefore we use useEffect
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // storing the get value and storing in searchValue
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      {/* Passing tempInfo as a prop to Weathercard component */}
     <Weathercard tempInfo = {tempInfo}/>  
    </>
  );
};

export default Temp;