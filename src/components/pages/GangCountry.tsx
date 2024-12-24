import React, { useState, useEffect } from "react";
import { fetchGangCountryData } from "../../services/gangCountryService";
import { GangCountryData } from "../../types/gangCountryType";
import MapAndSearchSection from "./MapAndSearchSection";
import GraphSection from "./GraphSection";

const GangCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [topGroups, setTopGroups] = useState<GangCountryData[] | undefined>([]);
  const [isTop5, setIsTop5] = useState<boolean>(true);

  useEffect(() => {
    if (selectedCountry) {
      fetchGangCountryData(selectedCountry, isTop5 ? 5 : undefined).then((data) => {
        setTopGroups(data);
      });
    }
  }, [selectedCountry, isTop5]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };
  const handleMarkerClick = (country: string, _lat: number, _lng: number) => {
    setSelectedCountry(country);
  };

  return (
    <div className="flex">
      <MapAndSearchSection handleMarkerClick={handleMarkerClick} />
      <GraphSection
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
        handleSelectChange={handleSelectChange}
        topGroups={topGroups}
        isTop5={isTop5}
        setIsTop5={setIsTop5}
      />
    </div>
  );
};

export default GangCountry;
