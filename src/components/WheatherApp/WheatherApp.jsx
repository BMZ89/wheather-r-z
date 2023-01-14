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
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=uk&key=VJ3DZUDUFNBGMJT5A8CCQNU3B&contentType=json`
      )
        .then((response) => response.json())
        .then((result) => {
          setFetchedData(result);
        });
    }
    // console.log(fetchedData.days[0]);
    // console.log(fetchedData.days[0]);
  };
  // console.log(fetchedData.days[0].temp);
  // const Array = [fetchedData.days[0]];
  // console.log(Array);
  //   const daysArray = [
  //   fetchedData.days[2],
  //   fetchedData.days[3],
  //   fetchedData.days[4],
  //   fetchedData.days[5],
  // ];
  // console.log(Array);
  // console.log(fetchedData);
  // const date=
  //2) USING USEFFECT TO UPDATE THE INFOS WITH EVERY NEW SUBMIT OF THE USER
  useEffect(() => {
    if (startUpdate) {
      // NOWCAST : WEATHER OF TODAY:
      setTemp(fetchedData.currentConditions.temp);
      setDayDate(fetchedData.days[0].datetime);
      setIcons(fetchedData.currentConditions.icon);
      setDescription(fetchedData.currentConditions.conditions);
      console.log(fetchedData.days[0].datetime);
      console.log(fetchedData.days[0].temp);
      console.log(fetchedData.days[0]);
      // FORECAST
      // const boucle =()=> {
      //   for (i=1; i<6, i++) {
      //   setTemp(fetchedData.days[i].temp);
      //   console.log(temp);
      // }
      // };
      // console.log(fetchedData.days);
      setDaysArray(fetchedData.days);

      // array.map((day, index) =()=> {
      //   day = fetchedData.days[index]
      //   console.log(day);
      //     // return (
      //     //   fetchedData.days[index]
      //     // )
      // }
      // )

      // setTempForecast(fetchedData.days[1].temp);
      // setIconsForecast(fetchedData.days[1].icon);
      // setDescriptionForecast(fetchedData.days[1].decription);
    }
    // console.log(fetchedData.days[0].datetime);
    // console.log(fetchedData.days[0].temp);
    // console.log(fetchedData.days[0]);
  }, [fetchedData]);
  console.log(daysArray);
  // console.log(dayDate);
  // const daysArray = [
  //   fetchedData.days[2],
  //   fetchedData.days[3],
  //   fetchedData.days[4],
  //   fetchedData.days[5],
  // ];
  // console.log(daysArray);

  // console.log(daysArray);
  // console.log(daysArray[2]);

  return (
    <div className="weather-app-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search the city of your choice"
          onChange={handleInput}
          value={search}
        ></input>
        <button type="submit">Search</button>
      </form>

      <div className="days-container">
        <DayInfo
          city={search}
          temperature={temp}
          dayDate={dayDate}
          srcIcon={`icons/${icons}.png`}
          description={description}
        />
      </div>

      <div className="forecast-container">
        {daysArray.map((dayItem, index) => {
          return (
            <DayInfo
              temperature={daysArray[index].temp}
              srcIcon={`icons/${daysArray[index].icon}.png`}
              description={daysArray[index].description}
            />
          );
        })}
        ;
      </div>
    </div>
  );
}
