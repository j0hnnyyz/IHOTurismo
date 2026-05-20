import { Box } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";
import Packages from "../components/Packages";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <HomePage />
            </AnimatedPage>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <Login />
            </AnimatedPage>
          }
        />
        <Route
          path="/register"
          element={
            <AnimatedPage>
              <Register />
            </AnimatedPage>
          }
        />
        <Route
          path="/packages"
          element={
            <AnimatedPage>
              <Packages />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
    </Box>
  );
};

export default AnimatedRoutes;
