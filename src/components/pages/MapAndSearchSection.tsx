import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import countries from "../../../data/countries_coordinates.json";

interface MapAndSearchSectionProps {
  handleMarkerClick: (country: string, lat: number, lng: number) => void;
}

const MapAndSearchSection: React.FC<MapAndSearchSectionProps> = ({ handleMarkerClick }) => {
  return (
    <div className="w-1/2 relative pt-24 h-full">
      {/* Map Section - adjust height and make it responsive */}
      <div className="absolute top-12 left-0 right-0 bottom-0 m-8 h-[50vh] sm:h-[60vh] md:h-[50vh] lg:h-[50vh] xl:h-[60vh] max-w-6xl border border-gray-300 rounded-lg shadow-lg">
        <MapContainer center={[34.802075, 40.1792]} zoom={2} style={{ height: "calc(100vh - 8rem)", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countries.map((countryData) => (
            <Marker
              key={countryData.country}
              position={[countryData.lat, countryData.lng]}
              eventHandlers={{
                click: () => handleMarkerClick(countryData.country, countryData.lat, countryData.lng),
              }}
            >
              <Popup>
                <div>
                  <h4>{countryData.country}</h4>
                  <button onClick={() => handleMarkerClick(countryData.country, countryData.lat, countryData.lng)}>
                    Show Top Groups
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapAndSearchSection;
