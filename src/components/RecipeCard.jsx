import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";

const RecipeCard = ({ meal, key }) => {
  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      key={key}
      p={4}
      _hover={{
        cursor: "pointer",
        transform: "scale(1.05)",
        animation: "pulse 3s infinite",
      }}
    >
      <Link href={`/recipe/${meal.idMeal}`} _hover={{ textDecoration: "none" }}>
        <Image src={meal.strMealThumb} alt={meal.strMeal} />
        <Heading size="md" mt={4}>
          {meal.strMeal}
        </Heading>
        <Flex justifyContent={"space-between"}>
          <Text mt={2}>{meal.strCategory}</Text>
          <Text mt={2}>{meal.strArea}</Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default RecipeCard;
