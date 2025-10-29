import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { LocationOn, ArrowDownward, CalendarToday } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const SearchPackages = () => {
  const theme = useTheme();
  const [destino, setDestino] = useState("Sydney, AUS");
  const [dataIda, setDataIda] = useState("");
  const [dataVolta, setDataVolta] = useState("");

  const destinos = [
    "Sydney, AUS",
    "Paris, FRA",
    "Tóquio, JPN",
    "Roma, ITA",
    "Barcelona, ESP",
    "Londres, UK",
    "New York, USA",
  ];

  const aplicarMascaraData = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, "");
    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    } else if (apenasNumeros.length <= 4) {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
    } else {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}/${apenasNumeros.slice(4, 8)}`;
    }
  };

  const handleDataChange = (value: string, setData: (value: string) => void) => {
    const valorFormatado = aplicarMascaraData(value);
    setData(valorFormatado);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, px: 4 }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, rgba(255, 105, 180, 0.3), rgba(255, 20, 147, 0.3))",
          backdropFilter: "blur(10px)",
          borderRadius: 6,
          p: 4,
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Grid2 container spacing={3} alignItems="center">
          <Grid2 xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 3,
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <LocationOn sx={{ color: theme.palette.primary.main }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "black",
                    display: "block",
                    fontSize: "0.7rem",
                  }}
                >
                  Destino
                </Typography>
                <Select
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  sx={{
                    border: "none",
                    boxShadow: "none",
                    "&:before, &:after": { display: "none" },
                    "& .MuiSelect-select": { padding: 0, py: 0.5 },
                    "& .MuiSelect-icon": { display: "none" },
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "black",
                  }}
                >
                  {destinos.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <ArrowDownward sx={{ color: "text.secondary", fontSize: 20 }} />
            </Box>
          </Grid2>

          <Grid2 xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 3,
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CalendarToday sx={{ color: theme.palette.primary.main }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "black",
                    display: "block",
                    fontSize: "0.7rem",
                  }}
                >
                  Ida
                </Typography>
                <input
                  type="text"
                  value={dataIda}
                  onChange={(e) => handleDataChange(e.target.value, setDataIda)}
                  placeholder="__/__/____"
                  maxLength={10}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "black",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                />
              </Box>
              <ArrowDownward sx={{ color: "text.secondary", fontSize: 20 }} />
            </Box>
          </Grid2>

          <Grid2 xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 3,
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CalendarToday sx={{ color: theme.palette.primary.main }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "black",
                    display: "block",
                    fontSize: "0.7rem",
                  }}
                >
                  Volta
                </Typography>
                <input
                  type="text"
                  value={dataVolta}
                  onChange={(e) => handleDataChange(e.target.value, setDataVolta)}
                  placeholder="__/__/____"
                  maxLength={10}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "black",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                />
              </Box>
              <ArrowDownward sx={{ color: "text.secondary", fontSize: 20 }} />
            </Box>
          </Grid2>

          <Grid2 xs={12} md={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: "white",
                borderRadius: 3,
                py: 1,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Ver pacotes
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default SearchPackages;

