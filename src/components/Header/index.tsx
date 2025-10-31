import { AppBar, Container, Box, Button, Typography, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../imgs/LogoIHO.png";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        backgroundImage: "none",
        py: 1.5,
      }}
    >
      <Container maxWidth="xl">
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 xs={3}>
            <Box
              component="img"
              src={LogoImg}
              alt="IHO Turismo"
              sx={{
                height: 60,
              }}
            />
          </Grid2>

          <Grid2 xs={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: 4,
                px: 4,
                py: 2,
              }}
            >
              <IconButton
                size="small"
                sx={{
                  color: "white",
                }}
              >
                <SearchIcon />
              </IconButton>
              {["Pacotes", "Sobre nós", "Contato"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid2>

          <Grid2 xs={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: "white",
                borderRadius: 3,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </AppBar>
  );
};

export default Header;

