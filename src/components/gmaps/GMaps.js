import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import { BiMap } from "react-icons/bi";
function GMaps({ lat, lng, name }) {
  const [selected, setSelected] = useState();
  const libraries = ["places"];
  const mapContainerStyle = { height: "60vh" };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBiZY_BbBZk0Hf0bDuJhi-8kmR9MotWqzk",
    libraries,
  });
  const center = {
    lat: lat,
    lng: lng,
  };
  const options = {
    style: [
      {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            hue: "#ff0000",
          },
        ],
      },
    ],
    disableDefaultUI: true,
    zoomControl: true,
  };
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Load Maps";

  return (
    <>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={17}
          center={center}
          options={options}
        >
          <Marker
            onClick={() => setSelected(true)}
            position={{ lat: lat, lng: lng }}
          />
          {/* 
          <InfoWindow >
            <p>{name}</p>
            <p>
              {lat} {lng}
            </p>
          </InfoWindow> */}
        </GoogleMap>
      </div>
    </>
  );
}

export default GMaps;
