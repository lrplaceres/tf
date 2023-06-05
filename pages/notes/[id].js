import Layout from "@/components/Layout";
import { Card, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function showNote({ categories, products, note }) {
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);

  const searchProductXCategory = (category) => {
    const divAll = document.querySelectorAll('[id^="_product"]');
    const div = document.getElementById(category.toString());
    divAll.forEach((element) => {
      element.classList.remove("display-block");
      element.classList.add("display-none");
    });
    div.classList.add("display-block");
  };

  const handleClicProduct = (nameProduct, precio) => {
    if (pedido.find(({ name }) => name === nameProduct)) {
      var index = pedido.findIndex(({ name }) => name === nameProduct);
      let copyOfPedido = [].concat(pedido);
      copyOfPedido[index].cantidad++;
      setPedido(copyOfPedido);
    } else {
      setPedido([...pedido, { name: nameProduct, cantidad: 1, precio }]);
    }
    setTotal(total + precio);
  };

  const handleClicPedido = (nameProduct, precio) => {
    if (
      pedido.find(({ name, cantidad }) => name === nameProduct && cantidad > 1)
    ) {
      var index = pedido.findIndex(({ name }) => name === nameProduct);
      let copyOfPedido = [].concat(pedido);
      copyOfPedido[index].cantidad--;
      setPedido(copyOfPedido);
    } else {
      let copyOfPedido = [].concat(pedido);
      setPedido(copyOfPedido.filter(({ name }) => name != nameProduct));
    }
    setTotal(total - precio);
  };

  return (
    <>
      <Head>
        <title>TF | {note.name}</title>
      </Head>
      <Layout>
        <Card sx={{ p: "1rem" }}>
          <div className="text-center">
            {categories.map((category, i) => (
              <Button
                variant="text"
                color="inherit"
                onClick={async () =>
                  await searchProductXCategory(`_product` + category.name)
                }
                key={`bt${i.toString()}`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              {categories.map((category, i) => (
                <div
                  id={`_product${category.name}`}
                  key={i.toString()}
                  className={i > 0 ? "display-none" : "display-block"}
                >
                  {products
                    .filter((prod) => prod.category == category.name)
                    .map((filtered, j) => (
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ mb: ".3rem", mr: ".3rem" }}
                        key={j.toString()}
                        onClick={() =>
                          handleClicProduct(filtered.name, filtered.price)
                        }
                      >
                        {filtered.name}
                      </Button>
                    ))}
                </div>
              ))}
            </Grid>
            <Grid item xs={6}>
              {pedido.length === 0
                ? ""
                : pedido.map((ped, i) => (
                    <div
                      key={i.toString()}
                      className="pedido"
                      onClick={() => handleClicPedido(ped.name, ped.precio)}
                    >
                      <Grid container spacing={0}>
                        <Grid item xs={2} className="text-center">
                          <b>
                            <Typography variant="button" color="initial">
                              {ped.cantidad}
                            </Typography>
                          </b>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="button" color="GrayText">
                            {ped.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="button" color="GrayText">
                            ${ped.precio * ped.cantidad}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
              {total > 0 && (
                <Grid item xs={12} className="pedido-total">
                  <Typography variant="button">
                    MONTO ${total.toLocaleString()}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Card>
      </Layout>
    </>
  );
}

export default showNote;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: categories } = await axios.get(
    "http://localhost:3000/api/products/categories"
  );

  const { data: products } = await axios.get(
    "http://localhost:3000/api/products/enabled"
  );

  const { id } = context.query;

  const { data: note } = await axios.get(
    `http://localhost:3000/api/notes/${id}`
  );

  return {
    props: {
      categories,
      products,
      note,
    },
  };
}
