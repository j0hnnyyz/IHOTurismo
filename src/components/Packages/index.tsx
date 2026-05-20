import { Box, Button, Typography, Container, Grid, IconButton } from "@mui/material";
import {
  ArrowBack,
  Favorite,
  AccessTime,
  CheckCircle,
  LocalFireDepartment,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { getNavigationState } from "../../utils/navigation";
import backgroundImg from "../../imgs/IHObg.png";

const Packages = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
    {
      titulo: "Santorini",
      preco: "12.500,00",
      avaliacao: "4.9",
      avaliacoes: "15k",
      dias: "7",
      cancelamento: "Cancelamento grátis",
      local: "Grécia",
      imagem: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400",
    },
    {
      titulo: "Machu Picchu",
      preco: "8.900,00",
      avaliacao: "4.7",
      avaliacoes: "9k",
      dias: "12",
      cancelamento: "Cancelamento grátis",
      local: "Peru",
      imagem: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    },
    {
      titulo: "Bali Paradise",
      preco: "11.200,00",
      avaliacao: "4.9",
      avaliacoes: "18k",
      dias: "8",
      cancelamento: "Cancelamento grátis",
      local: "Indonésia",
      imagem: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        py: 8,
        px: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
          opacity: 0.85,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/", { state: getNavigationState("back") })}
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
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
            }}
          >
            Nossos Pacotes
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {pacotes.map((pacote, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
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
                  {index === 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backgroundColor: theme.palette.secondary.main,
                        color: "white",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <LocalFireDepartment sx={{ fontSize: 18 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Popular
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CheckCircle sx={{ color: "#4CAF50", fontSize: 18 }} />
                    <Typography sx={{ color: "#666666" }}>{pacote.cancelamento}</Typography>
                  </Box>
                  <Typography sx={{ mt: "auto", color: "#333333", fontWeight: 500 }}>
                    {pacote.local}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                      color: "white",
                      borderRadius: 2,
                      py: 1.5,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    Ver detalhes
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Packages;

