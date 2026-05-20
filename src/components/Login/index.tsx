import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  LinearProgress,
  FormControlLabel,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signIn } from "../../services/authApi";
import { getNavigationState } from "../../utils/navigation";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      color: "black",
      backgroundColor: "white",
      "& fieldset": {
        borderColor: "#ddd",
      },
      "&:hover fieldset": {
        borderColor: "#bbb",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#999",
      opacity: 1,
    },
  };

  const labelStyles = {
    color: "black",
    mb: 0.5,
    fontWeight: 500,
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { user } = await signIn({
        email: email.trim(),
        password,
      });
      setUser(user);
      navigate("/", { state: getNavigationState("forward") });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
        px: 2,
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => navigate("/", { state: getNavigationState("back") })}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "black",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <ArrowBack />
      </IconButton>
      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            position: "relative",
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            overflow: "hidden",
          }}
        >
          {isSubmitting && (
            <LinearProgress
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                borderRadius: "12px 12px 0 0",
              }}
            />
          )}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Box>
            <Typography variant="body2" sx={labelStyles}>
              E-mail
            </Typography>
            <TextField
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              sx={textFieldStyles}
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={labelStyles}>
              Senha
            </Typography>
            <TextField
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              sx={textFieldStyles}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#999",
                    "&.Mui-checked": {
                      color: theme.palette.secondary.main,
                    },
                    "& .MuiSvgIcon-root": {
                      borderColor: "#ddd",
                    },
                  }}
                />
              }
              label="Lembrar senha"
              sx={{
                color: "black",
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.9rem",
                },
              }}
            />
            <Link
              component="button"
              type="button"
              variant="body2"
              sx={{
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Esqueci minha senha
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "white",
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              minHeight: 48,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
              "&.Mui-disabled": {
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                opacity: 0.85,
              },
            }}
          >
            {isSubmitting && (
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
            )}
            {isSubmitting ? "Entrando..." : "Login"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            disabled
            sx={{
              borderColor: "#dadce0",
              backgroundColor: "#f8f9fa",
              color: "#3c4043",
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              "&.Mui-disabled": {
                backgroundColor: "#f8f9fa",
                color: "#5f6368",
                borderColor: "#dadce0",
                opacity: 1,
              },
            }}
            startIcon={
              <Box
                component="svg"
                sx={{ width: 20, height: 20 }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </Box>
            }
          >
            Login com Google (em breve)
          </Button>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "black",
              mt: 1,
            }}
          >
            Não tem uma conta?{" "}
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => navigate("/register", { state: getNavigationState("forward") })}
              sx={{
                color: theme.palette.secondary.main,
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Crie agora!
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
