import React from "react";
import {
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import mapStyles from "../../mapStyles";

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const defaultMapOptions = {
  styles: mapStyles,
  fullscreenControl: false,
};

const libs = ["places"];
const MapComponent = ({
  venues,
  defaultCenter,
  selectedMarker,
  onMarkerSelect,
  onInfoWindowClose,
  infoWindowRender,
}) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBiEy0YFwB7M0Ft-hphy0QHsJs--X8YIIk"
      libraries={libs}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={defaultCenter}
        options={defaultMapOptions}
      >
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
