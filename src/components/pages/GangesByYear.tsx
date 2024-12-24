import { useEffect, useState } from "react";
import { fetchGangs, fetchGangByYear } from "../../services/gangByYear";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GangesByYear() {
    const [gangs, setGangs] = useState<string[]>([]);
    const [year, setYear] = useState<number | undefined>(undefined);
    const [selectedGang, setSelectedGang] = useState<string | undefined>(undefined);
    const [chartData, setChartData] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const loadGangs = async () => {
            const allGangs = await fetchGangs();
            setGangs(allGangs);
        };
        loadGangs();
    }, []);

    const handleFetchData = async () => {
        const data = await fetchGangByYear(year, selectedGang);
        if (year) {
            setChartData({
                labels: data.map((item: any) => item._id.gname),
                datasets: [
                    {
                        label: "Number of Events",
                        data: data.map((item: any) => item.count),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                ],
            });
        } else if (selectedGang) {
            setChartData({
                labels: data.map((item: any) => item._id.year),
                datasets: [
                    {
                        label: "Number of Events",
                        data: data.map((item: any) => item.count),
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                    },
                ],
            });
        }
    };

    const filteredGangs = gangs.filter((gang) =>
        gang.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Groups by Year</h1>
            <div className="mb-4">
                <label className="block mb-2">Enter Year:</label>
                <input
                    type="number"
                    value={year || ""}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full border px-2 py-1 rounded text-black"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Search and Select Gang:</label>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
            </div>
            <button
                onClick={handleFetchData}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Fetch Data
            </button>
            {chartData && (
                <div className="mt-6">
                    <div className="w-full overflow-x-auto">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                            height={400} // גובה מותאם לגרף
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
