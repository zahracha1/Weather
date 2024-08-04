import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useSelectedCity from "../../../react-query/selectedCity";

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TemperatureDataPoint {
  result: string;
  table: number;
  _start: string;
  _stop: string;
  _time: string;
  _value: number;
  _field: string;
  _measurement: string;
  city: string;
}

// Define the structure of the data in a dataset
interface ChartDataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}

// Define the structure of the chart data
interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const Chartstemperature: React.FC = () => {
  const { selectedCity } = useSelectedCity();

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/weather/protected/daily-max-temperatures/${selectedCity}`;
      const response = await fetch(url);
      const data: TemperatureDataPoint[] = await response.json();
      const labels = data.map((entry) => entry._time);
      const dataPoints = data.map((entry) => entry._value);

      setChartData({
        labels,
        datasets: [
          {
            label: "Daily Max Temperature (°C)",
            data: dataPoints,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.3,
          },
        ],
      });

      setLoading(false);
    };

    fetchData();
  }, [selectedCity]);

  if (loading) return <p>Loading...</p>;

  const options = {
    animation: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      x: {
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    },
  };
  

  return (
    <Box
      height={"50%"}
      width="100%"
      bg="#21222D"
      borderRadius="10px"
      p="5"
      as={motion.div}
      initial={{ x: "50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <h2>Daily Temperature Chart for {selectedCity}</h2>
      <Line
        style={{ minWidth: "100%", objectFit: "fill" }}
        data={chartData}
        options={options}
      />
    </Box>
  );
};

export default Chartstemperature;
