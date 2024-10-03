import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import { API_BASE_URL } from "../utils";

const fetchRecipes = async (query) => {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  const { data, isLoading, error } = useQuery(
    ["recipes", searchQuery],
    () => fetchRecipes(searchQuery)
    // {
    //   enabled: !!searchQuery,
    // }
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  if (error) {
    toast({
      title: "An error occurred.",
      description: "Unable to fetch recipes.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading>All Recipes</Heading>
        <SearchBar
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {isLoading ? (
          <Text>Loading recipes...</Text>
        ) : data?.meals ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>
            {data.meals.map((meal) => (
              <RecipeCard key={meal.mealId} meal={meal} />
            ))}
          </SimpleGrid>
        ) : (
          <Text>No recipes found. Try a different search term.</Text>
        )}
      </VStack>
    </Box>
  );
}

export default Dashboard;
