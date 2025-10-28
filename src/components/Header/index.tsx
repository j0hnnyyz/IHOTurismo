import { AppBar, Container, Box, Button, Typography, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Search as SearchIcon } from "@mui/icons-material";
import LogoImg from "../../imgs/LogoIHO.png";

const Header = () => {
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
                    fontWeight: 500,
                    "&:hover": {
                      opacity: 0.8,
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
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#692176",
                borderColor: "#692176",
                borderRadius: 3,
                px: 3,
                py: 1.5,
                textTransform: "none",
                borderWidth: 2,
                "&:hover": {
                  backgroundColor: "white",
                  borderColor: "#692176",
                  opacity: 0.8,
                },
              }}
            >
              LOGIN
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </AppBar>
  );
};

export default Header;

