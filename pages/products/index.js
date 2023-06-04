import Layout from "@/components/Layout";
import { Stack, Card, Container, Alert, Button, Fab } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import AddIcon from "@mui/icons-material/Add";

function index({ products }) {
  const router = useRouter();

  const columns = [
    {
      field: "Link",
      headerName: "Nombre",
      flex: 1,
      renderCell: (params) => (
        <Link href={`/products/${params.row.id}`} className="decoration-none">
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "price",
      headerName: "Precio",
    },
    {
      field: "category",
      headerName: "Categoría",
    },
  ];

  return (
    <>
      <Head>
        <title>TF | Productos</title>
      </Head>
      <Layout>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => router.push("/products/new")}
          sx={{ position: "fixed", bottom: 50, right: 10 }}
        >
          <AddIcon />
        </Fab>
        {products.length === 0 ? (
          <Card sx={{ p: "1rem", mb: "0.5rem" }}>
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">No hay productos disponibles</Alert>
            </Stack>
          </Card>
        ) : (
          <Container maxWidth="sm">
            <Card sx={{ p: "0.5rem" }}>
              <DataGrid
                rows={products}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
              />
            </Card>
          </Container>
        )}
      </Layout>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session.role != "administrador") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: products } = await axios.get(
    "http://localhost:3000/api/products"
  );
  return {
    props: {
      products,
    },
  };
}
