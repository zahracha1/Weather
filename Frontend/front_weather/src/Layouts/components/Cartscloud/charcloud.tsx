import { Box, Text } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns"; // Import de format
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
import { motion } from "framer-motion";
import useSelectedCity from "../../../react-query/selectedCity"; // Import du hook personnalisé

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
  days: any;
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
  maxBarThickness:number,
}

// Define the structure of the chart data
interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const Charcloud: React.FC = () => {
  const { selectedCity } = useSelectedCity(); // Obtention de la ville sélectionnée

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    setStartDate(format(today, "yyyy-MM-dd")); 
    setEndDate(format(today, "yyyy-MM-dd")); 
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const url = `/weather/protected/cloud/${selectedCity}/${startDate}/${endDate}`; 
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
        const labels = data.map((entry) => entry.days);
        const dataPoints = data.map((entry) => entry._value);

        setChartData({
          labels,
          datasets: [
            {
              data: dataPoints,
              fill: false,
              borderColor: "#C686F8",
              tension: 0.1,
              maxBarThickness: 2,
              label: ""
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
  }, [selectedCity, startDate, endDate]);

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
        grid: {
          color:  'rgba(201, 203, 207, 0.2)', // Color of the grid lines
    
        },
        ticks: {
          color: 'black', // Color of the tick labels
        },
      },
      y: {
        grid: {
          color:  'rgba(201, 203, 207, 0.2)', // Color of the grid lines
        },
        ticks: {
          color: 'black', // Color of the tick labels
        },
      },

    },
  };

  return (
    <Box
      w="41%"
      h="100%"
      padding={"1rem"}
      bg={"rgba(255, 255, 255, 0.26)"}
      borderRadius="20px"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      as={motion.div}
      initial={{ x: "50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Text>Daily cloud for {selectedCity}</Text>
      <Line style={{ minWidth: "105%", minHeight:"95%", objectFit: "fill" }} data={chartData}  options={options} />
    </Box>
  );
};

export default Charcloud;
