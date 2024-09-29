import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

const fetchRecipes = async (query) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
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
    () => fetchRecipes(searchQuery),
    {
      enabled: !!searchQuery,
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // The query will automatically run due to the dependency array in useQuery
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
        <Heading>Recipe Dashboard</Heading>
        <form onSubmit={handleSearch} style={{ width: "100%" }}>
          <SimpleGrid columns={[1, 1, 3]} spacing={4} width="100%">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for recipes..."
            />
            <Button type="submit" colorScheme="orange">
              Search
            </Button>
          </SimpleGrid>
        </form>
        {isLoading ? (
          <Text>Loading recipes...</Text>
        ) : data?.meals ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>
            {data.meals.map((meal) => (
              <Box key={meal.idMeal} borderWidth={1} borderRadius="lg" p={4}>
                <Heading size="md">{meal.strMeal}</Heading>
                <Text mt={2}>{meal.strCategory}</Text>
              </Box>
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
