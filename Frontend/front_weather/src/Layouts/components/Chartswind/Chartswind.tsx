import { Box, Text } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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

const Chartswind: React.FC = () => {
  const { selectedCity } = useSelectedCity();

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const url = `/weather/protected/daily-max-wind_speed/${selectedCity}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: TemperatureDataPoint[] = await response.json();
        const labels = data.map((entry) => entry._time);
        const dataPoints = data.map((entry) => entry._value);

        setChartData({
          labels,
          datasets: [
            {
              label: "Daily Wind speed (°KM/H)",
              data: dataPoints,
              fill: false,
              borderColor: "#C686F8",
              tension: 0.3,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      bg="#21222D"
      w="65%"
      h="100%"
      m={"2"}
      borderRadius="10px"
      p="4"
      as={motion.div}
      initial={{ x: "50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Text>Daily Wind Speed Chart for {selectedCity}</Text>
      <Line style={{ minWidth: "100%", objectFit: "fill" }} data={chartData} />
    </Box>
  );
};

export default Chartswind;
