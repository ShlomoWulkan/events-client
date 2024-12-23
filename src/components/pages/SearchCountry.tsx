import React from "react";

interface SearchCountryProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  handleClearSearch: () => void;
}

const SearchCountry: React.FC<SearchCountryProps> = ({ searchTerm, setSearchTerm, handleSearch, handleClearSearch }) => {
  return (
    <div className="flex flex-col items-center mb-4 text-black p-10">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by country name"
        className="p-2 border rounded"
      />
      <div className="flex justify-center w-full h-full">
      <button onClick={handleClearSearch} className="mt-2 m-2 p-2 bg-gray-300 text-black rounded">
        Clear
      </button>
      <button onClick={handleSearch} className="mt-2 m-2 p-2 bg-blue-500 text-black rounded">
        Search
      </button>
      </div>
    </div>
  );
};

export default SearchCountry;
