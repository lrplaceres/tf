import Layout from "@/components/Layout";
import { Card, Container, Typography, Grid, Alert, Stack, Button } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function index({ users }) {
const router = useRouter();

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return (
    <>
      <Head>
        <title>TF | Usuarios</title>
      </Head>
      <Layout>
        <Button variant="contained" color="primary" onClick={()=>router.push("/users/new")}>
          Nuevo usuario
        </Button>
        <Container maxWidth="xl">
          {users.length === 0 ? (
            <Card sx={{ p: "1rem", mb: "0.5rem" }}>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="info">No hay usuarios disponibles</Alert>
              </Stack>
            </Card>
          ) : (
            <>
              {users.map((user, i) => (
                <Card sx={{ p: "1rem", mb: "0.5rem" }} key={i.toString()}>
                  <Grid container spacing={2}>
                    <Grid item xs={windowSize.width < 767 ? 6 : 2} className="item-center-left">                      
                      <Typography variant="button"><Link href={`/users/${user.uid}`} className="decoration-none">{user.username}</Link></Typography>
                    </Grid>
                    <Grid item xs={windowSize.width < 767 ? 6 : 2}>
                      <Typography variant="h6">Rol</Typography>
                      <Typography variant="overline">{user.role}</Typography>
                    </Grid>
                    <Grid item xs={4} className="only-pc">
                      <Typography variant="h6">Nombre</Typography>
                      <Typography variant="overline">{user.name}</Typography>
                    </Grid>
                    <Grid item xs={4} className="only-pc">
                      <Typography variant="h6">Correo Electrónico</Typography>
                      <Typography variant="overline">{user.email}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { data: users } = await axios.get("http://localhost:3000/api/users");
  return {
    props: {
      users,
    },
  };
}
