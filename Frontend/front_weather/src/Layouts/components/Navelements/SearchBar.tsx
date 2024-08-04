import { useState, useEffect, useCallback } from "react";
import {
  Input,
  Flex,
  IconButton,
  InputGroup,
  useColorModeValue,
  Spinner,
  List,
  ListItem,
  InputRightElement,
} from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";
import { fetchAllCities } from "../../../Services/Allcities/Allcitiesservices";
import useSelectedCity from "../../../react-query/selectedCity";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  redirectPath: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ redirectPath }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const { setSelectedCity } = useSelectedCity();

  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debouncedFetchCities = useCallback(
    debounce(async (value: string) => {
      if (value) {
        setLoading(true);
        const fetchedCities = await fetchAllCities(value);
        setCities(fetchedCities);
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleInputFocus = () => {
    setIsFocus(true);
  };

  const handleInputBlur = () => {
    setIsFocus(false);
  };

  const handleCityClick = (city: string) => {
    setSelectedCity(city)
    setIsFocus(false); // Close the dropdown
    setQuery(city); // Optionally update the input with the selected city
  };

  useEffect(() => {
    if (query) {
      debouncedFetchCities(query);
    }

    return () => {
      debouncedFetchCities.cancel();
    };
  }, [query, debouncedFetchCities]);

  return (
    <Flex
      alignItems="center"
      gap={2}
      justifyContent="space-between"
      alignSelf={"center"}
      w="35%"
      position={"relative"}
    >
      <InputGroup bg="gray.60" borderRadius="md" alignItems={"center"}>
        <InputRightElement
          alignItems={"center"}
          marginRight={".5rem"}
          height={"100%"}
        >
          <IconButton
            alignSelf={"center"}
            aria-label="Toggle Search Menu"
            icon={<IoMdSearch />}
            onClick={() => navigate(redirectPath)}
            cursor="pointer"
            rounded="full"
          />
        </InputRightElement>
        <Input
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={query} // Ensure the input value is controlled
          type="search"
          placeholder="Search City"
          color="white"
          _placeholder={{ color: "gray.300" }}
          bg={useColorModeValue("white", "#111015")}
          _focus={{ boxShadow: "outline" }}
          padding={"1.5rem"}
          borderRadius={"1rem"}
        />
      </InputGroup>
      {isFocus && (
        <List
          borderRadius={"10px"}
          style={{
            position: "absolute",
            top: "60px",
            left: 0,
            zIndex: 1,
            width: "100%",
            backgroundColor: "white",
            padding: 0,
          }}
        >
          {loading ? (
            <Spinner />
          ) : cities.length > 0 ? (
            cities.map((city) => (
              <ListItem
                key={city}
                color={"black"}
                borderBottom="1px solid #ccc"
                padding="5px"
                cursor="pointer" // Make the list item look clickable
                onMouseDown={() => handleCityClick(city)} // Use onMouseDown to avoid input blur
              >
                {city}
              </ListItem>
            ))
          ) : (
            <ListItem color={"black"} padding="5px">
              No results found
            </ListItem>
          )}
        </List>
      )}
    </Flex>
  );
};

export { SearchBar };
