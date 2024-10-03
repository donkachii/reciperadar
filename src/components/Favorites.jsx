import {
  //   AlertDialog,
  //   AlertDialogBody,
  //   AlertDialogContent,
  //   AlertDialogFooter,
  //   AlertDialogHeader,
  //   AlertDialogOverlay,
  Box,
  //   Button,
  //   Flex,
  Heading,
  //   Image,
  //   Link,
  SimpleGrid,
  Text,
  //   useColorModeValue,
  //   useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
// import { useRef } from "react";

// import { initializeApp } from "firebase/app";
// import { useAuth } from "@clerk/clerk-react";
// import { getAuth, signInWithCustomToken } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import RecipeCard from "./RecipeCard";

const Favorites = () => {
  const { data, isLoading } = useQuery(
    ["recipes"],
    () => JSON.parse(localStorage.getItem("favorites"))
    // {
    //   enabled: !!searchQuery,
    // }
  );

  //   const { getToken, userId } = useAuth();
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  //   const cancelRef = useRef();

  //   const btnBgColor = useColorModeValue("brand.deepBlue", "brand.orange");

  console.log(data);

  return (
    <Box p={8}>
      <VStack spacing={8}>
        {/* <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Log in / Sign up to add to favorites
              </AlertDialogHeader>

              <AlertDialogBody>
                You would need to log in to add this to your favorites.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={onClose}
                  ml={3}
                  bg={btnBgColor}
                  color={"white"}
                >
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog> */}
        <Heading>All Favorites</Heading>
        {isLoading ? (
          <Text>Loading recipes...</Text>
        ) : data ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>
            {data.map((meal) => (
              <RecipeCard key={meal.mealId} meal={meal} />
            ))}
          </SimpleGrid>
        ) : (
          <Text>No recipes found. Try a different search term.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Favorites;
