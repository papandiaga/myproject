import React from "react";
import { Map, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/styles";

const StationMap = ({ zoom, mapCenter, children }) => {
  const useStyles = makeStyles({ map: { height: "100vh" } });
  const classes = useStyles();

  return (
    <Map center={mapCenter} zoom={zoom} className={classes.map}>
      <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      {children}
    </Map>
  );
};

export default StationMap;
