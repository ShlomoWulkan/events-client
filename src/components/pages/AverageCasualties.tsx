import { useEffect, useState } from "react";
import { fetchCountryData, fetchCountryById } from "../../services/countryService";
import { CountryData } from "../../types/country";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchCountry from "./SearchCountry";

const CountryCasualties = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountryData();
      if (data) {
        setCountries(data);
      }
    };
    loadCountries();
  }, []);

  // פונקציה לחיפוש מדינה
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setErrorMessage(""); // אם לא הוזן חיפוש, מנקים את הודעת השגיאה
      setSelectedCountry(null); // מציגים את כל המדינות
      return;
    }

    const country = countries.find((country) => country.countryName.toLowerCase() === searchTerm.toLowerCase());

    if (country) {
      setSelectedCountry(country);
      setErrorMessage(""); // מנקים את הודעת השגיאה אם נמצא
    } else {
      const countryFromApi = await fetchCountryById(searchTerm);
      if (countryFromApi) {
        setSelectedCountry(countryFromApi);
        setErrorMessage(""); // מנקים את הודעת השגיאה אם מצאנו ב-API
      } else {
        setSelectedCountry(null);
        setErrorMessage("Country not found.");
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // ניקוי שדה החיפוש
    setSelectedCountry(null); // מנקים את המדינה שנבחרה
    setErrorMessage(""); // מנקים את הודעת השגיאה
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <SearchCountry 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch} 
        handleClearSearch={handleClearSearch}
      />

      {/* הצגת הודעת שגיאה אם לא נמצאה מדינה */}
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

      <div className="w-[70vw] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] xl:h-[70vh] max-w-6xl border border-gray-300 rounded-lg shadow-lg">
        <MapContainer
          center={
            selectedCountry
              ? [selectedCountry.latitude, selectedCountry.longitude]
              : [51.505, -0.09]
          }
          zoom={selectedCountry ? 10 : 2} // אם נבחרה מדינה, זום-אין חזק יותר
          scrollWheelZoom={true}
          className="h-full w-full rounded-lg"
        >
        
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* אם נבחרה מדינה אז מציגים אותה בלבד, אחרת מציגים את כל המדינות */}
          {selectedCountry && selectedCountry.latitude && selectedCountry.longitude ? (
            <Marker key={selectedCountry.countryName} position={[selectedCountry.latitude, selectedCountry.longitude]}>
              <Popup>
                <strong>{selectedCountry.countryName}</strong><br />
                Average Casualties: {selectedCountry.avg}
              </Popup>
            </Marker>
          ) : (
            countries.map((country) =>
              country.latitude && country.longitude ? (
                <Marker key={country.countryName} position={[country.latitude, country.longitude]}>
                  <Popup>
                    <strong>{country.countryName}</strong><br />
                    Average Casualties: {country.avg}
                  </Popup>
                </Marker>
              ) : null
            )
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default CountryCasualties;
