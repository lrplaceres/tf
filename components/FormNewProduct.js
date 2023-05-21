import { useState } from "react";
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
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

function FormNewProduct() {
  const router = useRouter();

  const [product, setProduct] = useState({
    uid: uuidv4(),
    name: "",
    photo: "",
    description: "",
    price: "",
    cost: "",
    category: "Shots",
    enabled: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", product);
      router.push("/products");
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleReset = ()=>{
    setProduct({
      name: "",
    photo: "",
    description: "",
    price: "",
    cost: "",
    category: "Shots",
    enabled: 0,
    })
  }

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
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: "0.5rem" }}
            >
              Seleccione la imagen
              <input type="file" hidden onChange={handleChange} name="photo" />
            </Button>

            <TextField
              id="description"
              label="Descripción"
              onChange={handleChange}
              name="description"
              fullWidth
              sx={{ mb: "0.5rem" }}
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
            />

            <TextField
              type="number"
              id="cost"
              label="Costo"
              onChange={handleChange}
              fullWidth
              sx={{ mb: "0.5rem" }}
              name="cost"
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
                <MenuItem value="Cocteleria">Cocteler&iacute;a</MenuItem>
                <MenuItem value="Cremas">Cremas</MenuItem>
                <MenuItem value="Licores">Licores</MenuItem>
                <MenuItem value="Cognac">Cognac</MenuItem>
                <MenuItem value="Brandy">Brandy</MenuItem>
                <MenuItem value="Whisky">Whisky</MenuItem>
                <MenuItem value="Rones">Rones</MenuItem>
                <MenuItem value="Premium">Premium</MenuItem>
                <MenuItem value="Ofertas">Ofertas especiales</MenuItem>
                <MenuItem value="Cervezas">Cervezas</MenuItem>
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
      </Container>
    </>
  );
}

export default FormNewProduct;
