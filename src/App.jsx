import React, { Suspense } from "react";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/clerk-react";
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

import { PUBLISHABLE_KEY } from "./utils";

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

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  const RecipeDetails = React.lazy(() => import("./components/RecipeDetails"));
  const Dashboard = React.lazy(() => import("./components/Dashboard"));
  const Favorites = React.lazy(() => import("./components/Favorites"));

  return (
    <ChakraProvider theme={theme}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={<div style={{ textAlign: "center" }}>Loading...</div>}
          >
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              {/* TODO: Add error page and Footer */}
            </Router>
          </Suspense>
        </QueryClientProvider>
      </ClerkProvider>
    </ChakraProvider>
  );
}

export default App;
