import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Input,
  Image,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    navigate(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8 }}
          py={{ base: 20 }}
        >
          <Box>
            <HStack justifyContent="center">
              <Image src={Logo} alt="logo" width={140} height={108} />
            </HStack>
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Welcome to <br />
              <Text as={"span"} color={"brand.orange"}>
                RecipeRadar
              </Text>
            </Heading>
          </Box>
          <Text color={"gray.500"}>
            Scan, Cook, Savor: Your Culinary Compass. Discover new recipes, cook
            with confidence, and join our vibrant culinary community.
          </Text>
          <form onSubmit={handleSearch}>
            <Stack
              direction={"column"}
              spacing={5}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Input
                name="search"
                placeholder={"Search for recipes..."}
                bg={useColorModeValue("gray.100", "gray.700")}
                border={0}
                _focus={{
                  bg: useColorModeValue("gray.200", "gray.800"),
                }}
              />
              <Button
                type="submit"
                colorScheme={"orange"}
                bg={"brand.orange"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "orange.500",
                }}
                textColor={"white"}
              >
                Search Recipes
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>

      <Container maxW={"5xl"}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={"3xl"}>Discover, Cook, Share</Heading>
          <Text color={"gray.600"} fontSize={"xl"}>
            RecipeRadar is your go-to platform for exploring new cuisines,
            mastering cooking techniques, and connecting with food enthusiasts
            around the world.
          </Text>
        </Stack>

        <Accordion defaultIndex={[0]} allowMultiple my={5}>
          <Feature
            icon={<Icon as={Lightning} w={10} h={10} />}
            title={"Instant Recipe Search"}
            text={
              "Find the perfect recipe in seconds with our powerful search engine."
            }
          />
          <Feature
            icon={<Icon as={ScaleMass} w={10} h={10} />}
            title={"Personalized Recommendations"}
            text={
              "Get recipe suggestions tailored to your taste preferences and dietary needs."
            }
          />
          <Feature
            icon={<Icon as={ChatTeam} w={10} h={10} />}
            title={"Community Interaction"}
            text={
              "Share your culinary creations and get inspired by other food lovers."
            }
          />
        </Accordion>
      </Container>
    </>
  );
}

const Feature = ({ title, text, icon }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          fontWeight={600}
          _expanded={{ bg: "brand.orange", color: "white" }}
        >
          <Box as="span" flex="1" textAlign="left" w={"full"}>
            {icon} {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} color={"gray.600"}>
        {text}
      </AccordionPanel>
    </AccordionItem>
  );
};

const Lightning = createIcon({
  displayName: "Lightning",
  viewBox: "0 0 32 32",
  path: (
    <path
      fill="currentColor"
      d="M11.61 29.92a1 1 0 0 1-.6-1.07L12.83 17H8a1 1 0 0 1-1-1.23l3-13A1 1 0 0 1 11 2h10a1 1 0 0 1 .78.37 1 1 0 0 1 .2.85L20.25 11H25a1 1 0 0 1 .9.56 1 1 0 0 1-.11 1l-13 17A1 1 0 0 1 12 30a1.09 1.09 0 0 1-.39-.08zM17.75 13l2-9H11.8l-2.61 11H15a1 1 0 0 1 1 1.23l-1.14 5.39 8.23-10.77h-4.56a1 1 0 0 1-1-.85z"
    />
  ),
});

const ScaleMass = createIcon({
  displayName: "ScaleMass",
  viewBox: "0 0 32 32",
  path: (
    <path
      fill="currentColor"
      d="M28 4H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 22H4V6h24v20z M7 23h18v2H7zm0-4h18v2H7z M16 11.5a4.5 4.5 0 1 1-4.5 4.5 4.49 4.49 0 0 1 4.5-4.5m0-2a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0-6.5-6.5z"
    />
  ),
});

const ChatTeam = createIcon({
  displayName: "ChatTeam",
  viewBox: "0 0 32 32",
  path: (
    <path
      fill="currentColor"
      d="M27 8H19V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2v4.84L13.16 18H17v2a2 2 0 0 0 2 2h3.84L28 27.16V22h1a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM13 16H6V6h11v10h-2.84zm15 4h-2v3.16L22.84 20H19v-8h9z"
    />
  ),
});
