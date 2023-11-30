import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  // Position par défaut (par exemple, Paris)
  const position = [51.505, -0.09]
  return (
    <div style={{border: "1px black solid"}} id="map">

    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </div>
  );
};

export default Map;
