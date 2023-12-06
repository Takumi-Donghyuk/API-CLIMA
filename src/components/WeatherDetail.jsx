import axios from "axios";
import { useEffect, useState } from "react";
const WeatherDetail = ({ weather, nameCountry }) => {
  let [temp, setTemp] = useState(`${weather.main.temp} °C`);
  const [button, setButton] = useState("Cambiar a °F");
  const [clicado, setClicado] = useState(false)
  useEffect(()=>{
    setTemp(`${weather.main.temp} °C`)
    setButton("Cambiar a °F")
    setClicado(false)
  },[weather])  
let typeOfWeather = `${weather.weather[0].description[0].toUpperCase()}${weather.weather[0].description.slice(
    1
  )}`;
  const handleChangeTempe = () => {
    let tempF = (weather.main.temp * (9 / 5) + 32).toFixed(2);
    let tempC = ((tempF - 32) / (9 / 5)).toFixed(2);
   
    if (clicado === false) {
      setTemp(`${tempF} °F`);
      setButton("Cambiar a °C");
    } else{
      setTemp(`${tempC} °C`);
      setButton("Cambiar a °F");
    }
    setClicado(!clicado)
  };



  return (
    <article className="text-center grid gap-12">
      

      <h3 className="text-2xl font-bold">
        {weather.name}
        {weather.name && nameCountry ? ", " : ""}
        {nameCountry}
      </h3>

      <div className="text-black dark:text-white grid gap-10 sm:grid sm:grid-cols-3">
        <section className="bg-white bg-opacity-50 p-1 rounded-xl grid grid-cols-4 justify-center items-center sm:col-span-2 sm:grid sm:grid-rows-[30px-30px-30px]
        dark:bg-blue-950">
          <h3 className="col-span-4 sm:row-span-1 text-xl">{typeOfWeather}</h3>
          <span className="col-span-2 text-4xl p-5 sm:row-span-3">{temp}</span>
          <div className="col-span-2 sm:row-span-3">
            <img
              className="block mx-auto"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </section>

        <section className="font-bold bg-white bg-opacity-50 p-1 rounded-xl grid grid-cols-3 grid-rows-2 justify-center items-center sm:col-span-1 sm:grid sm:grid-cols-1 sm:grid-rows-[30px-30px-30px] dark:bg-blue-950">
          <div className="col-span-1 row-span-2 gap-1 border-r-2 border-gray-500 sm:row-span-1 sm:border-b-2 sm:border-r-0 p-4 sm:flex justify-center items-center">
            <div>
              <img src="/wind.svg" alt=""/>
            </div>
            <span>{weather.wind.speed} m/s</span>
          </div>
          <div
            className="col-span-1 row-span-2 gap-1  border-r-2 border-gray-500 sm:row-span-1
          sm:border-b-2 sm:border-r-0 p-4 sm:flex justify-center items-center"
          >
            <div>
              <img src="/humidity.svg" alt=""/>
            </div>
            <span>{weather.main.humidity} %</span>
          </div>
          <div className="col-span-1 row-span-2 gap-1 sm:row-span-1  sm:flex justify-center items-center p-4">
            <div>
              <img src="/pressure.svg" alt=""/>
            </div>
            <span>{weather.main.pressure} hPa</span>
          </div>
        </section>
      </div>

      <button
        onClick={handleChangeTempe}
        className="bg-white bg-opacity-100 rounded-3xl font-medium text-black w-40 py-1 px-2 mx-auto hover:bg-red-500 hover:text-white hover:cursor-pointer active:bg-orange-700 active:cursor-pointer active:text-white dark:text-white dark:bg-blue-950 
        dark:hover:bg-blue-500 dark:active:bg-purple-950"
      >
        {button}
      </button>

    </article>
  );
};
export default WeatherDetail;
