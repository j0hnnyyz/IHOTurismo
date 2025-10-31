import { Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import ThemesProvider from "./providers/ThemeProvider";
import Header from "./components/Header";
import SearchPackages from "./components/SearchPackages";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Login from "./components/Login/index";
import backgroundImg from "./imgs/IHObg.png";

function App() {
  return (
    <ThemesProvider>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <Box
              sx={{
                minHeight: "100vh",
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                pb: 3,
              }}
            >
              <Header />
              <SearchPackages />
              <Destinations />
              <Footer />
            </Box>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemesProvider>
  );
}

export default App;

