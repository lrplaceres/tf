import Layout from "@/components/Layout";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNotas } from "@/context/notasContext";
import axios from "axios";
import TabNotas from "@/components/TabNotas";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function index({ categories }) {
  const { createNota } = useNotas();
  const { notas } = useNotas();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewNota({
      uid: uuidv4(),
      cuenta: "",
      pago: "",
    });
  };

  const [newNota, setNewNota] = useState({
    uid: uuidv4(),
    mesa: "",
    cuenta: "",
    pago: "",
  });

  const handleChangeNewNota = ({ target: { name, value } }) => {
    setNewNota({ ...newNota, [name]: value });
  };

  const handleSubmitNewNota = async () => {
    try {
      if (!newNota.mesa) {
        return toast.error("Debe insertar la mesa");
      }
      createNota(newNota.uid, newNota.mesa, newNota.cuenta, newNota.pago);
      handleClose();
      toast.success(`Se ha creado con éxito la nota ${newNota.mesa}`);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>TF</title>
      </Head>
      <Layout>
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Crear Nota
        </Button>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            {categories.length === 0 ? (
              <Card sx={{ p: "1rem", mb: "0.5rem" }}>
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="info">No hay Categorías disponibles</Alert>
                </Stack>
              </Card>
            ) : (
              <>
                {categories.map((category, i) => (
                  <Accordion
                    key={i.toString()}
                    onChange={() => console.log(category.name)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{category.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            )}
          </Grid>

          <Grid item xs={7}>
            <TabNotas notas={notas} />
          </Grid>
        </Grid>
      </Layout>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Crear Nota</DialogTitle>
        <DialogContent>
          <TextField
            id="mesa"
            label="Mesa"
            name="mesa"
            sx={{ mt: "0.5rem", mb: "0.5rem" }}
            fullWidth
            onChange={handleChangeNewNota}
          />
          <TextField
            id="cuenta"
            label="Tipo de cuenta"
            name="cuenta"
            fullWidth
            sx={{ mb: "0.5rem" }}
            onChange={handleChangeNewNota}
          />
          <TextField
            id="pago"
            label="Tipo de pago"
            name="pago"
            fullWidth
            sx={{ mb: "0.5rem" }}
            onChange={handleChangeNewNota}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmitNewNota}
            disabled={!newNota.mesa}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { data: categories } = await axios.get(
    "http://localhost:3000/api/products/categories"
  );

  return {
    props: {
      categories,
    },
  };
}
