import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface ChartProps {
  data: any[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) =>
      item._id.month ? `${item._id.year}-${item._id.month}` : item._id.year
    ),
    datasets: [
      {
        label: "Incidents",
        data: data.map((item) => item.count),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
