import React from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Heading,
  Collapse,
  useColorMode,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoCloseSharp, IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("brand.deepBlue", "gray.800")}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <IoCloseSharp w={3} h={3} />
              ) : (
                <GiHamburgerMenu w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Heading
            as={Link}
            to="/"
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("white", "white")}
            size="lg"
          >
            RecipeRadar
          </Heading>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <IoSunnySharp />}
          </Button>
          <Button
            as={Link}
            to="/login"
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            color={"white"}
            _hover={{
              textDecoration: "none",
              color: useColorModeValue("brand.orange", "orange.300"),
            }}
          >
            Sign In
          </Button>
          <Button
            as={Link}
            to="/signup"
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"brand.orange"}
            href={"#"}
            _hover={{
              bg: "orange.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("white", "gray.200");
  const linkHoverColor = useColorModeValue("brand.orange", "orange.300");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Button
            as={Link}
            p={2}
            to={navItem.href ?? "#"}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            variant="ghost"
          >
            {navItem.label}
          </Button>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack spacing={4}>
      <Box
        py={2}
        as={Link}
        to={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Box>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Recipes",
    href: "/dashboard",
  },
  {
    label: "Favorites",
    href: "/favorites",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default Navbar;
