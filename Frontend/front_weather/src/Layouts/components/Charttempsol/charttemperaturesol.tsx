import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { format, addDays } from 'date-fns';
import { Box, Flex, Text } from "@chakra-ui/react";
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
import useSelectedCity from "../../../react-query/selectedCity"; // Import the custom hook

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

const Charttemperaturesol: React.FC = () => {
  const { selectedCity } = useSelectedCity(); // Get the selected city

  const [, setStartDate] = useState<string>("");
  const [, setEndDate] = useState<string>("");
  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today, 3);

    setStartDate(format(today, "yyyy-MM-dd"));
    setEndDate(format(nextWeek, "yyyy-MM-dd"));
  }, []);

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const url = `/weather/protected/Uv_index/${selectedCity}`; // Use selectedCity instead of cityName
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
              label: "Daily UV index ",
              data: dataPoints,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
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
  }, [selectedCity]); // Update when selectedCity changes

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      height={"65%"}
      width="75%"
      bg="#21222D"
      borderRadius="10px"
      p="4"
      as={motion.div}
      initial={{ x: "50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Flex flexDirection={"row"} justifyContent={"center"}>
        <Text>Daily UV index Chart for {selectedCity}</Text>
      </Flex>
      <Line
        style={{ minWidth: "100%", objectFit: "fill" }}
        data={chartData}
      />
    </Box>
  );
};

export default Charttemperaturesol;
