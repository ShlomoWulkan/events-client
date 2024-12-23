import React from "react";

interface FilterOption {
  type: "range" | "specific" | "last5" | "last10";
  year?: number;
  fromYear?: number;
  toYear?: number;
  month?: number;
}

interface FilterProps {
  filter: FilterOption;
  setFilter: React.Dispatch<React.SetStateAction<FilterOption>>;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  const handleFilterChange = (type: string, value?: number | [number, number]) => {
    if (type === "last5") {
      setFilter({ type: "last5" });
    } else if (type === "last10") {
      setFilter({ type: "last10" });
    } else if (type === "range" && Array.isArray(value)) {
      setFilter({ type: "range", fromYear: value[0], toYear: value[1] });
    } else if (type === "specific" && typeof value === "number") {
      setFilter({ type: "specific", year: value });
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value ? parseInt(e.target.value) : undefined;
    setFilter((prevFilter) => ({
      ...prevFilter,
      month: month,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <button
          onClick={() => handleFilterChange("last5")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Last 5 Years
        </button>
        <button
          onClick={() => handleFilterChange("last10")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
        >
          Last 10 Years
        </button>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Range:</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="From Year"
            className="px-2 py-1 border rounded-md text-black"
            onBlur={(e) =>
              handleFilterChange("range", [
                parseInt(e.target.value),
                filter.toYear || 0,
              ])
            }
          />
          <input
            type="number"
            placeholder="To Year"
            className="px-2 py-1 border rounded-md text-black"
            onBlur={(e) =>
              handleFilterChange("range", [
                filter.fromYear || 0,
                parseInt(e.target.value),
              ])
            }
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Specific Year:</label>
        <input
          type="number"
          placeholder="Year"
          className="px-2 py-1 border rounded-md text-black"
          onBlur={(e) =>
            handleFilterChange("specific", parseInt(e.target.value))
          }
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Select Month (optional):</label>
        <select
          className="px-2 py-1 border rounded-md text-black"
          onChange={handleMonthChange}
          defaultValue=""
        >
          <option value="">All Months</option>
          {[...Array(12).keys()].map((month) => (
            <option key={month} value={month + 1}>
              {new Date(0, month).toLocaleString("en-US", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
