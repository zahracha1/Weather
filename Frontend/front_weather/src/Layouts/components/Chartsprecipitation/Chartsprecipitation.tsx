import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import useSelectedCity from "../../../react-query/selectedCity";

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip
);

interface PrecipitationDataPoint {
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

interface ChartDataset {
  label: string;
  data: number[];
  fill: boolean;
  backgroundColor: string[];
  tension: number;
  borderWidth: number;
  borderColor: string;
  hoverOffset: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const Chartsprecipitation: React.FC = () => {
  const { selectedCity } = useSelectedCity();

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/weather/protected/daily-probab-precipitation/${selectedCity}`;

      const response = await fetch(url);
      const data: PrecipitationDataPoint[] = await response.json();
      const labels = data.map((entry) => entry._time);
      const dataPoints = data.map((entry) => entry._value);

      setChartData({
        labels,
        datasets: [
          {
            label: "Daily Precipitation (%)",
            data: dataPoints,
            fill: false,
            backgroundColor: ["rgb(75, 192, 192)"],
            hoverOffset: 4,
            tension: 0.5,
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      setLoading(false);
    };
    fetchData();
  }, [selectedCity]);

  if (loading) return <p>Loading...</p>;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box
      bg="#21222D"
      width={"56%"}
      height={"40%"}
      padding={"1rem"}
      borderRadius="10px"
      flexDirection="row"
      justifyContent={"space-between"}
      as={motion.div}
      initial={{ x: "-50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Flex flexDirection={"row"} justifyContent={"center"}>
        <Text>Daily Precipitation Chart for {selectedCity}</Text>
      </Flex>
      <Bar
        style={{ minWidth: "100%", objectFit: "fill" }}
        data={chartData}
        options={options}
      />
    </Box>
  );
};

export default Chartsprecipitation;
