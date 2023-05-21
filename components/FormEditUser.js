import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import DoneIcon from "@mui/icons-material/Done";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { toast } from "react-toastify";

function FormEditUser() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "dependiente",
    enabled: "",
  });

  const [passw, setPassw] = useState("");

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
    setPassw("");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
    setPassw("");
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleChangePassw = ({ target: { value } }) => {
    setPassw(value);
  };

  useEffect(() => {
    if (router.query.id) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/" + router.query.id);
      setUser(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${router.query.id}`, user);
      toast.success("Se ha editado el usuario");
      setTimeout(() => router.push("/users"), 500);
      router.push("/users");
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const delUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("Se ha eliminado el usuario " + user.username);
      setTimeout(() => router.push("/users"), 500);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const changePassw = async (id) => {
    try {
      if (!passw) {
        return toast.error("Introduzca una contraseña");
      }
      await axios.post(`/api/users/${id}`, {
        passw: bcrypt.hashSync(passw, "$2a$10$CwTycUXWue0Thq9StjUM0u"),
      });
      handleClose2();
      toast.success("Se ha cambiado la contraseña");
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleReset = () => {
    if (router.query.id) {
      getUser();
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <Typography variant="h6" mb={2}>
            Username: <b>{user.username}</b>
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Nombre"
              value={user.name}
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
              value={user.email}
              onChange={handleChange}
              name="email"
              maxLength={35}
              required
              type="email"
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

            <FormControl fullWidth>
              <InputLabel id="enabled-label">Habilitado</InputLabel>
              <Select
                labelId="enabled-label"
                id="enabled"
                value={user.enabled}
                label="Habilitado"
                onChange={handleChange}
                name="enabled"
                sx={{ mb: "0.5rem" }}
              >
                <MenuItem value="1">Si</MenuItem>
                <MenuItem value="0">No</MenuItem>
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
              disabled={!user.name}
              startIcon={<DoneIcon />}
            >
              Actualizar
            </Button>
          </form>
        </Card>

        <Card sx={{ textAlign: "center", mt: "1.5rem", p: "1rem" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleClickOpen}
            startIcon={<DeleteIcon />}
            sx={{ mr: "0.5rem" }}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClickOpen2}
            startIcon={<KeyIcon />}
          >
            Cambiar Contraseña
          </Button>
        </Card>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirme para <strong>eliminar</strong> este usuario.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => delUser(user.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title2"
      >
        <DialogTitle>Cambiar contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            id="npassw"
            label="Nueva contraseña"
            onChange={handleChangePassw}
            sx={{ mt: "1rem" }}
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose2}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => changePassw(user.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormEditUser;
