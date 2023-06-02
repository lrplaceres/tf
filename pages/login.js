import { getCsrfToken } from "next-auth/react";
import Container from "@mui/material/Container";
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import Head from "next/head";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <Head>
        <title>TF | Entrar</title>
      </Head>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            p: "1rem",
            width: 300,
            backgroundColor: "grey.200",
          }}
        >
          <Typography variant="overline" color="initial" align="center" component="p">Ingrese sus credenciales</Typography>
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField
              id="username"
              label="Usuario"
              name="username"
              fullWidth
              required
              sx={{ mb: "0.5rem" }}
            />
            <TextField
              id="password"
              label="Contraseña"
              name="password"
              type="password"
              fullWidth
              required
              sx={{ mb: "0.5rem" }}
            />
            <Button variant="contained" color="primary" type="submit">
              Aceptar
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
