import { Box, Container, Typography, IconButton, Grid } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import LogoImg from "../../imgs/LogoIHO.png";

const Footer = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 6,
          py: 3,
          px: 3,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
              <Box
                component="img"
                src={LogoImg}
                alt="IHO Turismo"
                sx={{
                  height: 60,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={(theme) => ({ color: theme.palette.common.white, fontSize: "0.9rem", textAlign: "center" })}>
                © Copyright 2025 - IHO Turismo • All Rights Reserved
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography sx={(theme) => ({ color: theme.palette.common.white, fontWeight: 600, mb: 1.5, textAlign: { xs: "center", md: "right" } })}>
                Redes Sociais
              </Typography>
              <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "center", md: "flex-end" } }}>
                <IconButton
                  sx={(theme) => ({
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: theme.palette.common.white,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  })}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={(theme) => ({
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: theme.palette.common.white,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  })}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  sx={(theme) => ({
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: theme.palette.common.white,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  })}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  sx={(theme) => ({
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: theme.palette.common.white,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  })}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Footer;

