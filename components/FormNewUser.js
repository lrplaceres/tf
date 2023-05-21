import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  Container,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { toast } from "react-toastify";

function FormNewUser() {
  const router = useRouter();

  const [user, setUser] = useState({
    uid: uuidv4(),
    name: "",
    email: "",
    username: "",
    password: "",
    retype: "",
    role: "dependiente",
    enabled: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO:validar usuario antes de enviar
    try {
      if (user.password != user.retype) {
        return toast.error("Las contraseñas deben coincidir");
      }

      user.password = bcrypt.hashSync(
        user.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );

      const res = await axios.post("/api/users", user);
      toast.success("Se ha creado el usuario");
      setTimeout(() => router.push("/users"), 500);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleReset = () => {
    setUser({
      name: "",
      email: "",
      username: "",
      password: "",
      retype: "",
      role: "dependiente",
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Nombre"
              onChange={handleChange}
              name="name"
              minLength={3}
              maxLength={35}
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
            />
            <TextField
              id="email"
              label="Correo Electrónico"
              onChange={handleChange}
              name="email"
              maxLength={35}
              required
              type="email"
              fullWidth
              sx={{ mb: "0.5rem" }}
            />
            <TextField
              id="username"
              label="Usuario"
              onChange={handleChange}
              name="username"
              minLength={3}
              maxLength={35}
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
            />
            <TextField
              id="password"
              label="Constraseña"
              onChange={handleChange}
              type="password"
              name="password"
              minLength={6}
              maxLength={35}
              autoComplete="off"
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
            />
            <TextField
              id="retype"
              label="Repite Constraseña"
              onChange={handleChange}
              type="password"
              name="retype"
              minLength={6}
              maxLength={35}
              autoComplete="off"
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
            />

            <FormControl fullWidth>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={user.role}
                label="Rol"
                onChange={handleChange}
                name="role"
                sx={{ mb: "0.5rem" }}
              >
                <MenuItem value="dependiente">Dependiente</MenuItem>
                <MenuItem value="cantinero">Cantinero</MenuItem>
                <MenuItem value="cocinero">Cocinero</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="inherit"
              type="reset"
              startIcon={<CleaningServicesIcon />}
              onClick={handleReset}
              sx={{ mr: "0.5rem" }}
            >
              Limpiar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={
                !user.name || !user.username || !user.password || !user.retype
              }
              startIcon={<DoneIcon />}
            >
              Aceptar
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default FormNewUser;
