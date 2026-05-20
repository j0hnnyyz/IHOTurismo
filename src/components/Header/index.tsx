import { useState } from "react";
import {
  AppBar,
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Fade,
  Snackbar,
  Alert,
  Zoom,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../imgs/LogoIHO.png";
import { useAuth } from "../../contexts/AuthContext";
import { getNavigationState } from "../../utils/navigation";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [logoutSnackOpen, setLogoutSnackOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    window.setTimeout(() => {
      signOut();
      setIsSigningOut(false);
      setLogoutSnackOpen(true);
    }, 450);
  };

  const handleLoginClick = () => {
    navigate("/login", { state: getNavigationState("forward") });
  };

  const menuItems = ["Pacotes", "Sobre nós", "Contato"];
  const showGreeting = Boolean(isAuthenticated && user?.name && !isSigningOut);
  const authButtonLabel = isSigningOut ? "Saindo..." : isAuthenticated ? "Sair" : "Login";

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          backgroundImage: "none",
          py: 1.5,
          display: { xs: "none", md: "block" },
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
                {menuItems.map((item) => (
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

            <Grid2 xs={3} display="flex" justifyContent="flex-end" alignItems="center" gap={3}>
              <Fade in={showGreeting} timeout={400} unmountOnExit>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: 500, display: { xs: "none", lg: "block" } }}
                >
                  Olá, {user?.name?.split(" ")[0]}
                </Typography>
              </Fade>
              <Zoom in={!isSigningOut} timeout={300}>
                <Button
                  variant="contained"
                  disabled={isSigningOut}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: "white",
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                    "&.Mui-disabled": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: "white",
                      opacity: 0.7,
                    },
                  }}
                  onClick={() => (isAuthenticated ? handleSignOut() : handleLoginClick())}
                >
                  {authButtonLabel}
                </Button>
              </Zoom>
            </Grid2>
          </Grid2>
        </Container>
      </AppBar>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          backgroundImage: "none",
          py: 1.5,
          display: { xs: "block", md: "none" },
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src={LogoImg}
            alt="IHO Turismo"
            sx={{
              height: 40,
              mr: 2,
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item} button>
                <ListItemText
                  primary={item}
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItem>
            ))}
            <ListItem>
              <Button
                variant="contained"
                fullWidth
                disabled={isSigningOut}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                onClick={() => {
                  if (isAuthenticated) {
                    handleSignOut();
                  } else {
                    handleLoginClick();
                  }
                  handleDrawerToggle();
                }}
              >
                {authButtonLabel}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Snackbar
        open={logoutSnackOpen}
        autoHideDuration={3000}
        onClose={() => setLogoutSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setLogoutSnackOpen(false)}
          sx={{ width: "100%" }}
        >
          Você saiu da sua conta. Até breve!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
