import axios from "axios";

export const fetchAllCities = async (searchTerm: string) => {
  try {
    const response = await axios.get(
      "/weather/allcities"
    );
    const cities = response.data;

    const filteredCities = cities.filter((city: any) =>
      city.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return filteredCities;
  } catch (error) {
    throw new Error("Failed to fetch cities");
  }
};
