import React from "react";
import "./DayInfo.css";

/*https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/casablanca?unitGroup=uk&key=VJ3DZUDUFNBGMJT5A8CCQNU3B&contentType=json*/

export default function DayInfo(props) {
  return (
    <div>
      <div className="day-container">
        <div className="city-date">
          <h1>{props.city}</h1>
          <h2>{props.dayDate}</h2>
        </div>

        <div className="previsions">
          <img
            src={props.srcIcon}
            className="weatherIcon"
            onError={(event) => {
              event.target.src = "icons/cloudy.png";
            }}
          ></img>
          <h3>{props.temperature}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}
