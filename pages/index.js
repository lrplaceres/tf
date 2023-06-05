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
  Fab,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import TabNotas from "@/components/TabNotas";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";

function index({notes}) {

  const router = useRouter();

  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setNewNota({ ...newNota, creator: session.uid });
  };
  const handleClose = () => {
    setOpen(false);
    setNewNota({
      uid: uuidv4(),
      name: "",
      status: "new",
      creator: "",
    });
  };

  const [newNota, setNewNota] = useState({
    uid: uuidv4(),
    name: "",
    status: "new",
    creator: "",
  });

  const handleChangeNewNota = ({ target: { name, value } }) => {
    setNewNota({ ...newNota, [name]: value });
  };

  const handleSubmitNewNota = async () => {
    try {
      if (!newNota.name) {
        return toast.error("Debe insertar la mesa");
      }
      await axios.post("/api/notes/", newNota);
      handleClose();
      toast.success(`Se ha creado con éxito la nota ${newNota.name}`);
      setTimeout(() => router.push("/"), 300);
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
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          sx={{ position: "fixed", bottom: 50, right: 10 }}
        >
          <AddIcon />
        </Fab>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TabNotas notas={notes} />
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
            name="name"
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
            color="success"
            onClick={handleSubmitNewNota}
            disabled={!newNota.name}
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
  const session = await getServerSession(context.req, context.res, authOptions);

  const { data: notes } = await axios.get(`http://localhost:3000/api/notes/byUser/${session.uid}`);  
  return {
    props: {
      notes,
    },
  };
}