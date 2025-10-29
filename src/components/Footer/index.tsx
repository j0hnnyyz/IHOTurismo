import { Box, Container, Typography, IconButton } from "@mui/material";
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={LogoImg}
              alt="IHO Turismo"
              sx={{
                height: 60,
              }}
            />
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
              © Copyright 2025 - IHO Turismo • All Rights Reserved
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "white", fontWeight: 600, mb: 1.5, textAlign: "center" }}>
              Redes Sociais
            </Typography>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;

