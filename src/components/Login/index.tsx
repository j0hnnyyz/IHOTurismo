import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", color: "black" }}>
            Entrar
          </Typography>
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Senha" type="password" fullWidth />
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: theme.palette.primary.contrastText,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;


