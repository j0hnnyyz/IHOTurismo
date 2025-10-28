import { Box, CssBaseline } from "@mui/material";
import ThemesProvider from "./providers/ThemeProvider";
import Header from "./components/Header";
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
        }}
      >
        <Header />
      </Box>
    </ThemesProvider>
  );
}

export default App;

