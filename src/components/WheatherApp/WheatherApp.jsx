import React, { useEffect, useState } from "react";
import "./WheatherApp.css";
import DayInfo from "../DayInfo/DayInfo";

export default function WheatherApp() {
  // LISTE DES VARIABLES
  const [search, setSearch] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [startUpdate, setStartUpdate] = useState(false);
  const [temp, setTemp] = useState(null);
  const [icons, setIcons] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [dayDate, setDayDate] = useState("");
  const [daysArray, setDaysArray] = useState([]);

  // HANDLE THE INPUT OF THE USER'S SEARCH
  const handleInput = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  // 1)FETCHING THE DATA FROM THE API AFTER THE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setStartUpdate(true);
      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}/next7days?unitGroup=uk&key=VJ3DZUDUFNBGMJT5A8CCQNU3B&contentType=json`
      )
        .then((response) => response.json())
        .then((result) => {
          setFetchedData(result);
        });
    }
  };

  //2) USING USEFFECT TO UPDATE THE INFOS WITH EVERY NEW SUBMIT OF THE USER
  useEffect(() => {
    if (startUpdate) {
      // NOWCAST : WEATHER OF TODAY:
      setTemp(fetchedData.currentConditions.temp);
      setDayDate(fetchedData.days[0].datetime);
      setIcons(fetchedData.currentConditions.icon);
      setDescription(fetchedData.currentConditions.conditions);
      setAdress(fetchedData.resolvedAddress);
      console.log(fetchedData.days[0].datetime);
      console.log(fetchedData.days[0].temp);
      console.log(fetchedData.days[0]);

      // FORECAST
      setDaysArray(fetchedData.days);
    }
  }, [fetchedData]);
  console.log(fetchedData);

  // HANDLE CLICK:
  const handleNextClick = (e) => {};

  return (
    <div className="weather-app-container">
      <div className="top-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search your city's weather"
            onChange={handleInput}
            value={search}
          ></input>
          <button type="submit" className="searchBtn">
            Search
          </button>
        </form>

        <div className="city-temp">
          <h1>{adress}</h1>
          <h1>{temp}</h1>
        </div>
      </div>

      <div className="forecast-container">
        <div className="forecast-items">
          {daysArray.map((dayItem, index) => {
            return (
              <div className="dayInfos">
                <DayInfo
                  dayDate={daysArray[index].datetime}
                  temperature={daysArray[index].temp}
                  srcIcon={`icons/${daysArray[index].icon}.png`}
                  description={daysArray[index].description}
                />
              </div>
            );
          })}
        </div>

        {/* <button onClick={handleNextClick} className="nextBtn">
          Next day
        </button> */}
      </div>
    </div>
  );
}
