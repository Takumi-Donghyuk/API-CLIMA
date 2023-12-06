import axios from "axios";
import { useEffect, useState } from "react";
import WeatherDetail from "./components/WeatherDetail";
import { changeBg } from "./utils/changeBg";
import { IconMoonFilled, IconSunHigh } from "@tabler/icons-react";

function App() {
  const [weather, setWeather] = useState(null);
  const [nameCountry, setNameCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("theme")) ?? false)
  const success = (pos) => {
    const {
      coords: { latitude, longitude },
    } = pos;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d246a137b87721a2fa1e0b248e43c668&lang=sp&units=metric`
      )
      .then(({ data }) => setWeather(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  let codeCountry = weather?.sys.country;
  useEffect(() => {
    if (codeCountry) {
      axios
        .get(`https://restcountries.com/v3.1/alpha/${codeCountry}`)
        .then(({ data }) => setNameCountry(data[0].translations.spa.common))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [codeCountry]);

  let background = changeBg(
    weather?.weather[0].description,
    weather?.weather[0].main,
    weather?.weather[0].icon
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameOfCity = e.target.nameCity.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '');
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&appid=d246a137b87721a2fa1e0b248e43c668&lang=sp&units=metric`
      )
      .then(({ data }) => setWeather(data))
      .catch((error) => {
        console.log(error);
        alert("Ciudad no encontrada");
      });
  };

  const handleToggleMode=()=>{
    setDarkMode(!darkMode)
  }

  useEffect(()=>{
  if(darkMode){
    document.documentElement.classList.add("dark")
  }
  else{
    document.documentElement.classList.remove("dark")
  }
  }, [darkMode])

  useEffect(()=>{
    localStorage.setItem("theme", JSON.stringify(darkMode))
  }, [darkMode])
  return (
    <>
      {weather ? (
        <main
          style={{ backgroundImage: `url(${background})`}}
          className="flex flex-col gap-7 justify-center items-center h-screen bg-cover bg-center bg-no-repeat brightness-105 text-black
          dark:brightness-[0.4]"
        >
          <button onClick={handleToggleMode} className="border-4 border-blue-950 rounded-md p-1 hover:bg-slate-200 transition-colors">
            <IconSunHigh className="text-blue-950 hover:text-blue-500 dark:block hidden"/>
            <IconMoonFilled className="text-yellow-600 hover:text-yellow-300 dark:hidden block"/>
          </button>
          <form
            className="flex justify-center items-center dark:text-black"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="nameCity"
              placeholder="Busca una ciudad"
              autoComplete="off"
              className="sm:w-[100%] p-2 rounded-xl border-2 border-black dark:border-7 dark:border-blue-950"
            />
            <div className="bg-black p-2 m-1 rounded-[50%] hover:bg-blue-950 active:bg-red-700 hover:cursor-pointer flex justify-center items-center">
              <button type="submit">
                <img className="w-8" src="/lupa.png" alt="" />
              </button>
            </div>
          </form>
          <WeatherDetail weather={weather} nameCountry={nameCountry} />
        </main>
      ) : (
        <main className="h-screen bg-[url(/fondoLoading.svg)] bg-center bg-cover sm:bg-contain"></main>
      )}
    </>
  );
}
export default App;
