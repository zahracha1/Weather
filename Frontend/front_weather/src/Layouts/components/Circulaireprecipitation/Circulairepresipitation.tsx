import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import useSelectedCity from "../../../react-query/selectedCity";

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  ArcElement
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

const Circulairepresipitation: React.FC = () => {
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
            backgroundColor: [
              "#5CAFE7",
              "#FFBF66",
              "#FDF0E7",
              "#FF679D",
              "#D7572B",
              "#7FBBB2",
              "#74EC8D",
              "#DB617D",
              "#177C8B",
              "#FC9100",
              "#FE4B4B",
            ],
            hoverOffset: 4,
            tension: 0.7,
            borderColor: "#032030",
            borderWidth: 2,
          },
        ],
      });
      setLoading(false);
    };
    fetchData();
  }, [selectedCity]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Box
        bg="#21222D"
        width={"40%"}
        h={"30rem"}
        borderRadius="10px"
        p={"2rem"}
        as={motion.div}
        initial={{ x: "50px", opacity: 0 }}
        animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
      >
        <Flex justifyContent={"center"}>
          <h2>Daily Precipitation Pie for {selectedCity}</h2>
        </Flex>
        <Doughnut
          style={{ minWidth: "95%", objectFit: "fill" }}
          data={chartData}
        />
      </Box>
    </>
  );
};

export default Circulairepresipitation;
