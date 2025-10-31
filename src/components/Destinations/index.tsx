import { useState } from "react";
import { Box, Button, Typography, Container, IconButton, Grid } from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  Favorite,
  AccessTime,
  CheckCircle,
  ArrowRight,
  LocalFireDepartment,
  TravelExplore,
  ConfirmationNumber,
  Map,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Destinations = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const pacotes = [
    {
      titulo: "White Heaven",
      preco: "9.570,00",
      avaliacao: "4.8",
      avaliacoes: "11k",
      dias: "10",
      cancelamento: "Cancelamento grátis",
      local: "Australia",
      imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    },
    {
      titulo: "Angkor Wat",
      preco: "10.950,00",
      avaliacao: "4.8",
      avaliacoes: "11k",
      dias: "10",
      cancelamento: "Cancelamento grátis",
      local: "Cambodia",
      imagem: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop&q=80",
    },
    {
      titulo: "La Concha",
      preco: "15.000,00",
      avaliacao: "4.8",
      avaliacoes: "11k",
      dias: "10",
      cancelamento: "Cancelamento grátis",
      local: "Espanha",
      imagem: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pacotes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pacotes.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
        borderRadius: 0,
        py: 8,
        px: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  px: 4,
                  py: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  height: "100%",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <TravelExplore sx={{ fontSize: 48, color: theme.palette.primary.main }} />
                <Typography sx={{ color: "black", fontWeight: 600, textAlign: "center" }}>
                  Procure seu destino
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  px: 4,
                  py: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  height: "100%",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <ConfirmationNumber sx={{ fontSize: 48, color: theme.palette.primary.main }} />
                <Typography sx={{ color: "black", fontWeight: 600, textAlign: "center" }}>
                  Compre seu pacote
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  px: 4,
                  py: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  height: "100%",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Map sx={{ fontSize: 48, color: theme.palette.primary.main }} />
                <Typography sx={{ color: "black", fontWeight: 600, textAlign: "center" }}>
                  Viaje ao redor do mundo
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 700,
              }}
            >
              Destinos mais vistos
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={handlePrev}
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              transform: `translateX(-${currentIndex * 424}px)`,
              transition: "transform 0.5s ease",
            }}
          >
            {pacotes.map((pacote, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: "400px",
                  backgroundColor: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "240px",
                    backgroundImage: `url(${pacote.imagem})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  >
                    <Favorite />
                  </IconButton>
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "black" }}>
                    {pacote.titulo}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 0.5 }}>
                    A partir de: R${pacote.preco}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", mb: 2 }}>
                    *Preço inicial
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Typography key={i} sx={{ color: "#FF4444", fontSize: 16 }}>
                        ★
                      </Typography>
                    ))}
                    <Typography sx={{ ml: 1, color: "#666666", fontWeight: 500 }}>
                      {pacote.avaliacao} ({pacote.avaliacoes})
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <AccessTime sx={{ color: "#666666", fontSize: 18 }} />
                    <Typography sx={{ color: "#666666" }}>{pacote.dias} dias</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle sx={{ color: "#4CAF50", fontSize: 18 }} />
                    <Typography sx={{ color: "#666666" }}>{pacote.cancelamento}</Typography>
                  </Box>
                  <Typography sx={{ mt: 1, color: "#333333", fontWeight: 500 }}>
                    {pacote.local}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            variant="contained"
            sx={{
              background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
              color: "white",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Ver pacotes
            <ArrowRight />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Destinations;

