import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Container,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import DeleteIcon from "@mui/icons-material/Delete";

function FormNewProduct() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [product, setProduct] = useState({
    uid: uuidv4(),
    name: "",
    description: "",
    price: "",
    category: "Shots",
    enabled: 1,
  });

  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put(`/api/products/${router.query.id}`, product);
        toast.success("Se ha editado el producto");
      } else {
        await axios.post("/api/products", product);
        toast.success("Se ha creado el producto");
        setTimeout(() => router.push("/products"), 250);
      }
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleReset = () => {
    if (router.query.id) {
      getProducts();
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "Shots",
        enabled: 1,
      });
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getProducts();
    }
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/products/" + router.query.id);
      setProduct(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const delProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Se ha eliminado el producto " + product.name);
      setTimeout(() => router.push("/products"), 500);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
        <Typography variant="overline" color="initial" align="center" component="p">{router.query.id ? "Edite" : "Ingrese"} las características del producto</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Nombre"
              onChange={handleChange}
              name="name"
              minLength={3}
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
              value={product.name}
            />
            <TextField
              id="description"
              label="Descripción"
              onChange={handleChange}
              name="description"
              fullWidth
              sx={{ mb: "0.5rem" }}
              value={product.description}
            />

            <TextField
              type="number"
              id="price"
              label="Precio"
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
              name="price"
              value={product.price}
            />

            <FormControl fullWidth>
              <InputLabel id="categorias-label">Categorías</InputLabel>
              <Select
                labelId="categorias-label"
                id="categorias"
                name="category"
                label="Categorías"
                onChange={handleChange}
                sx={{ mb: "0.5rem" }}
                value={product.category}
              >
                <MenuItem value="Shots">Shots</MenuItem>
                <MenuItem value="Cigarros">Tabacos y Cigarros</MenuItem>
                <MenuItem value="Coctelería">Cocteler&iacute;a</MenuItem>
                <MenuItem value="Cremas">Cremas</MenuItem>
                <MenuItem value="Licores">Licores</MenuItem>
                <MenuItem value="Cognac">Cognac</MenuItem>
                <MenuItem value="Brandy">Brandy</MenuItem>
                <MenuItem value="Whisky">Whisky</MenuItem>
                <MenuItem value="Rones">Rones</MenuItem>
                <MenuItem value="Premium">Premium</MenuItem>
                <MenuItem value="Ofertas">Ofertas especiales</MenuItem>
                <MenuItem value="Cervezas">Cervezas</MenuItem>
                <MenuItem value="Tapas">Tapas</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="enabled-label">Habilitado</InputLabel>
              <Select
                labelId="enabled-label"
                id="enabled"
                value={product.enabled}
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
              sx={{ mr: "0.5rem" }}
              onClick={handleReset}
            >
              Limpiar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={!product.name || !product.price}
              startIcon={<DoneIcon />}
            >
              Aceptar
            </Button>
          </form>
        </Card>

        {router.query.id && (
          <Card sx={{ textAlign: "center", mt: "1.5rem", p: "1rem" }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              Eliminar
            </Button>
          </Card>
        )}
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirme para <strong>eliminar</strong> este producto.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => delProduct(product.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormNewProduct;
