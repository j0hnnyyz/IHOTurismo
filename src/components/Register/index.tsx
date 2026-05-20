import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  FormControl,
  IconButton,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/authApi";
import { getNavigationState } from "../../utils/navigation";
import {
  hasSignUpErrors,
  sanitizeName,
  validateSignUpFields,
  type SignUpFieldErrors,
} from "../../utils/signUpValidation";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ddi, setDdi] = useState("+55");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(sanitizeName(e.target.value));
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

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
    setServerError(null);
    setSuccess(null);

    const fullPhone = phone.trim() ? `${ddi} ${phone.trim()}` : "";
    const payload = {
      email: email.trim(),
      password,
      name: name.trim(),
      phone: fullPhone,
    };

    const errors = validateSignUpFields(payload);
    setFieldErrors(errors);

    if (hasSignUpErrors(errors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(payload);
      setSuccess("Conta criada com sucesso! Faça login para continuar.");
      setTimeout(
        () => navigate("/login", { state: getNavigationState("back") }),
        1500,
      );
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Erro ao criar conta.");
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
        onClick={() => navigate("/login", { state: getNavigationState("back") })}
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
          {serverError && (
            <Alert severity="error" onClose={() => setServerError(null)}>
              {serverError}
            </Alert>
          )}
          {success && <Alert severity="success">{success}</Alert>}
          <Box>
            <Typography variant="body2" sx={labelStyles}>
              Email
            </Typography>
            <TextField
              type="text"
              inputMode="email"
              autoComplete="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              placeholder="exemplo@email.com"
              sx={textFieldStyles}
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email}
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={labelStyles}>
              Senha
            </Typography>
            <TextField
              type="password"
              autoComplete="new-password"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              placeholder="Mínimo 6 caracteres"
              sx={textFieldStyles}
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password}
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={labelStyles}>
              Nome
            </Typography>
            <TextField
              fullWidth
              value={name}
              onChange={handleNameChange}
              placeholder="Digite seu nome completo"
              sx={textFieldStyles}
              error={Boolean(fieldErrors.name)}
              helperText={fieldErrors.name}
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={labelStyles}>
              Telefone (com DDD)
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={ddi}
                  onChange={(e) => setDdi(e.target.value)}
                  sx={{
                    ...textFieldStyles,
                    "& .MuiSelect-select": {
                      color: "black",
                    },
                  }}
                >
                  <MenuItem value="+55">+55 (BR)</MenuItem>
                  <MenuItem value="+1">+1 (US/CA)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+33">+33 (FR)</MenuItem>
                  <MenuItem value="+49">+49 (DE)</MenuItem>
                  <MenuItem value="+34">+34 (ES)</MenuItem>
                  <MenuItem value="+39">+39 (IT)</MenuItem>
                  <MenuItem value="+351">+351 (PT)</MenuItem>
                  <MenuItem value="+54">+54 (AR)</MenuItem>
                  <MenuItem value="+52">+52 (MX)</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="tel"
                fullWidth
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={handlePhoneChange}
                sx={textFieldStyles}
                error={Boolean(fieldErrors.phone)}
                helperText={fieldErrors.phone}
              />
            </Box>
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
            {isSubmitting ? "Criando conta..." : "Criar Conta"}
          </Button>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "black",
              mt: 1,
            }}
          >
            Já tem uma conta?{" "}
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => navigate("/login", { state: getNavigationState("back") })}
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
              Faça login!
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
