import { CssBaseline } from "@mui/material";
import ThemesProvider from "./providers/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import AnimatedRoutes from "./routes/AnimatedRoutes";

function App() {
  return (
    <ThemesProvider>
      <AuthProvider>
        <CssBaseline />
        <AnimatedRoutes />
      </AuthProvider>
    </ThemesProvider>
  );
}

export default App;
