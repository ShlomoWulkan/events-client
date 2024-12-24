import { useEffect, useState } from "react";
import { fetchGangs } from "../../services/gangByYear";
import { fetchDeadliestGang } from "../../services/deadliestGangServise";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface GangData {
  country: string;
  totalVictims: number;
  latitude: number;
  longitude: number;
}

export default function DeadliestGangCountry() {
  const [gangs, setGangs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGang, setSelectedGang] = useState<string | null>(null);
  const [mapData, setMapData] = useState<GangData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGangs = async () => {
      try {
        const gangList = await fetchGangs();
        setGangs(gangList);
      } catch (error) {
        console.error("Error fetching gangs", error);
        setError("Failed to load gangs.");
      }
    };

    loadGangs();
  }, []);

  const handleSearch = async () => {
    if (!selectedGang) {
      setError("Please select a gang.");
      return;
    }

    try {
      const data = await fetchDeadliestGang(selectedGang);
      setMapData(data as any); 
      setError(null);
    } catch (error) {
      console.error("Error fetching map data", error);
      setError("Failed to fetch data for the selected gang.");
    }
  };

  const filteredGangs = gangs.filter((gang) =>
    gang.toLowerCase().startsWith(searchTerm.toLowerCase()) // התאמה לתחילת המילה בלבד
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="mb-4 w-full max-w-md">
        <label className="block mb-2">Search and Select Gang:</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // עדכון בזמן אמת
          className="w-full border px-2 py-1 rounded text-black mb-2"
        />
        <select
          value={selectedGang || ""}
          onChange={(e) => setSelectedGang(e.target.value)}
          className="w-full border px-2 py-1 rounded text-black"
        >
          <option value="">-- Select Gang --</option>
          {filteredGangs.map((gang) => (
            <option key={gang} value={gang}>
              {gang}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <div className="w-[70vw] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] xl:h-[70vh] max-w-6xl border border-gray-300 rounded-lg shadow-lg">
        <MapContainer
          center={[51.505, -0.09]} // מרכז ברירת המחדל
          zoom={2}
          scrollWheelZoom={true}
          className="h-full w-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mapData.map((location) =>
            location.latitude && location.longitude ? (
              <Marker
                key={location.country}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <strong>{location.country}</strong>
                  <br />
                  Total Victims: {location.totalVictims}
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}
