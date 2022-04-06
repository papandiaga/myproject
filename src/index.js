import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import StationMap from "./components/StationMap";
import { makeStyles } from "@material-ui/styles";
import { Popup, Circle } from "react-leaflet";
import { StationData } from "./services/station-data";
import { useInterval } from "./hooks/useInterval";

function App() {
  const zoom = 13;
  const mapCenter = [40.75081, -73.97354];

  const [stations, setStations] = useState([]);

  useEffect(() => {
    async function getStations() {
      const stations = await StationData.getStations();
      setStations(stations);
    }
    getStations();
  }, []);

  useInterval(async () => {
    const stations = await StationData.getStations();
    setStations(stations);
  }, 30000);

  const useStyles = makeStyles({ App: { height: "100vh" } });
  const classes = useStyles();

  const getColor = (available, capacity) => {
    const pct = available / capacity;
    if (pct === 0) return "#ef3c42";
    if (0 < pct < 0.1) return "#f25e40";
    if (0.1 < pct < 0.2) return "#f2823a";
    if (0.2 < pct < 0.3) return "#f69537";
    if (0.3 < pct < 0.4) return "#ff4aa2f";
    if (0.4 < pct < 0.5) return "#f6c137";
    if (0.5 < pct < 0.6) return "#fad435";
    if (0.6 < pct < 0.7) return "#fdf32f";
    if (0.7 < pct < 0.8) return "#ffff2d";
    if (0.8 < pct < 0.9) return "#fdff429";
    if (0.9 < pct < 1) return "#a7d52a";
    if (pct === 1) return "#79c725";
  };

  return (
    <div className={classes.App}>
      <StationMap stations={stations} zoom={zoom} mapCenter={mapCenter}>
        {stations.length
          ? stations.map(
              ({
                name,
                lat,
                lon,
                num_bikes_available,
                num_docks_available,
                capacity
              }) => (
                <Circle
                  weight="10"
                  color={getColor(num_bikes_available, capacity)}
                  key={name}
                  center={[lat, lon]}
                  radius={5}
                >
                  <Popup>
                    <div>Location: {name}</div>
                    <div>
                      Available Bikes: {num_bikes_available} / {capacity}
                    </div>
                    <div>Available Docks: {num_docks_available}</div>
                  </Popup>
                </Circle>
              )
            )
          : "loading..."}
      </StationMap>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
