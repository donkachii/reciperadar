import { Button, Container, Input, Stack } from "@chakra-ui/react";

const SearchBar = ({ handleSearch, searchQuery, setSearchQuery }) => {
  return (
    <form onSubmit={handleSearch} style={{ width: "100%" }}>
      <Container maxWidth={{ md: "3xl" }} p={[1, 0]}>
        <Stack spacing={4} width="100%">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for recipes by nane..."
          />
          <Button type="submit" colorScheme="orange">
            Search
          </Button>
        </Stack>
      </Container>
    </form>
  );
};

export default SearchBar;
