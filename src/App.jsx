import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Container,
  extendTheme,
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";

function App() {
  const theme = extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    colors: {
      brand: {
        orange: "#F47216",
        deepBlue: "#1B3A57",
        teal: "#39A2AE",
        cream: "#FFF2E6",
      },
    },
  });

  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
