import Layout from "@/components/Layout";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNotas } from "@/context/notasContext";
import TabNotas from "@/components/TabNotas";

function index() {
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
      mesa: "",
    });
  };

  const [newNota, setNewNota] = useState({
    uid: uuidv4(),
    mesa: "",
  });

  const handleChangeNewNota = ({ target: { name, value } }) => {
    setNewNota({ ...newNota, [name]: value });
  };

  const handleSubmitNewNota = async () => {
    try {
      if (!newNota.mesa) {
        return toast.error("Debe insertar la mesa");
      }
      createNota(newNota.uid, newNota.mesa);
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
          <Grid item xs={12}>
            <TabNotas
              notas={notas}
            />
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