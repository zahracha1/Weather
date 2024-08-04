import { useQueryClient } from "react-query";

const useSelectedCity = () => {
  const queryClient = useQueryClient();
  const selectedCityQueryKey = 'selectedCity';

  const selectedCity = queryClient.getQueryData<string>(selectedCityQueryKey) ?? '';

  const setSelectedCity = (newCity: string) => {
    queryClient.setQueryData(selectedCityQueryKey, newCity);
  };

  return {
    selectedCity,
    setSelectedCity,
  };
};

export default useSelectedCity;
