import { Box, CssBaseline } from "@mui/material";
import ThemesProvider from "./providers/ThemeProvider";
import Header from "./components/Header";
import SearchPackages from "./components/SearchPackages";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import backgroundImg from "./imgs/IHObg.png";

function App() {
  return (
    <ThemesProvider>
      <CssBaseline />
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
    </ThemesProvider>
  );
}

export default App;

