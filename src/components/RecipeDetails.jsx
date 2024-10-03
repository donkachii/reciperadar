import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Skeleton,
  Tag,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { API_BASE_URL } from "../utils";

const RecipeDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");

  const toast = useToast();

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }, [id]);

  const { data, isLoading, error } = useQuery(["recipe", id], fetchData);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(storedFavorites.some((fav) => fav.idMeal === id));
  }, [id]);

  const handleFavorites = useCallback(() => {
    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      const meal = data?.meals[0];

      if (!meal) {
        throw new Error("Meal data not available");
      }

      const favoriteIndex = storedFavorites.findIndex(
        (fav) => fav.idMeal === meal.idMeal
      );
      const newIsFavorite = favoriteIndex === -1;

      setIsFavorite(newIsFavorite);

      if (newIsFavorite) {
        storedFavorites.push(meal);
        toast({
          title: `${meal.strMeal} added to favorites!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        storedFavorites.splice(favoriteIndex, 1);
        toast({
          title: `${meal.strMeal} removed from favorites!`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }

      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast({
        title: "Error updating favorites!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [data, toast]);

  if (isLoading) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack spacing={4} align="stretch">
          <Skeleton height="200px" />
          <Skeleton height="40px" />
          <Skeleton height="20px" count={3} />
        </VStack>
      </Container>
    );
  }

  if (error) {
    return <Text>An error occurred: {error.message}</Text>;
  }

  const recipe = data?.meals[0];

  if (!recipe) {
    return <Text>Recipe not found.</Text>;
  }

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith("strIngredient") && value)
    .map(([key, ingredient]) => ({
      ingredient,
      measure: recipe[`strMeasure${key.slice(13)}`],
    }));

  return (
    <Container maxW="4xl" py={8}>
      <Box bg={bgColor} shadow="md" borderRadius="lg" p={6}>
        <VStack spacing={6} align="stretch">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            borderRadius="lg"
            objectFit="cover"
            maxH="400px"
            w="100%"
          />
          <Heading as="h1" size="2xl">
            {recipe.strMeal}
          </Heading>
          <Flex justify="space-between" align="center">
            <HStack>
              <Tag colorScheme="orange">{recipe.strCategory}</Tag>
              <Tag colorScheme="blue">{recipe.strArea}</Tag>
            </HStack>
            <Icon
              as={MdOutlineFavorite}
              w={5}
              h={5}
              _hover={{ cursor: "pointer", color: "brand.deepBlue" }}
              color={isFavorite ? "brand.orange" : "brand.cream"}
              onClick={handleFavorites}
            />
          </Flex>
          <RecipeSection title="Ingredients">
            <List spacing={2}>
              {ingredients.map(({ ingredient, measure }, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {measure} {ingredient}
                </ListItem>
              ))}
            </List>
          </RecipeSection>
          <RecipeSection title="Instructions">
            <OrderedList spacing={2}>
              {recipe.strInstructions
                .split(".")
                .filter(Boolean)
                .map((instruction, index) => (
                  <ListItem key={index}>{instruction.trim()}.</ListItem>
                ))}
            </OrderedList>
          </RecipeSection>
          {recipe.strYoutube && (
            <RecipeSection title="Video Tutorial">
              <Box
                as="iframe"
                src={`https://www.youtube.com/embed/${
                  recipe.strYoutube.split("v=")[1]
                }`}
                width="100%"
                height="315px"
                allowFullScreen
              />
            </RecipeSection>
          )}
          {recipe.strTags && (
            <RecipeSection title="Tags">
              <List spacing={2}>
                {recipe.strTags.split(",").map((tag, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {tag}
                  </ListItem>
                ))}
              </List>
            </RecipeSection>
          )}
          <RecipeSection title="Source Link">
            <Link href={recipe.strSource} isExternal>
              {recipe.strSource}
            </Link>
          </RecipeSection>
        </VStack>
      </Box>
    </Container>
  );
};

const RecipeSection = ({ title, children }) => (
  <>
    <Divider />
    <VStack align="stretch" spacing={4}>
      <Heading as="h2" size="lg">
        {title}
      </Heading>
      {children}
    </VStack>
  </>
);

export default RecipeDetails;
