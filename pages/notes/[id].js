import Layout from "@/components/Layout";
import { Card, Button, Grid, Stack, Chip, Badge } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import {useRef } from "react";

function showNote({ categories, products }) {
  const ref = useRef(null);

  const searchProductXCategory = (category) => {    
   const divAll = document.querySelectorAll('[id^="_product"]')
   const div = document.getElementById(category.toString());
   divAll.forEach(element => {
    element.classList.remove("display-block")
    element.classList.add("display-none")
   });
      div.classList.add("display-block");
  };

  return (
    <>
      <Head>
        <title>TF | Nota</title>
      </Head>
      <Layout>
        <Card sx={{ p: "1rem" }}>
          <div className="text-center">
            {categories.map((category, i) => (
              <Button
                variant="text"
                color="inherit"
                onClick={async () =>
                  await searchProductXCategory(`_product`+category.name)
                }
                key={`bt${i.toString()}`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              {categories.map((category, i) => (
               
                  <div ref={ref} id={`_product${category.name}`} key={i.toString()} className={i>0 ? "display-none" :"display-block"}>
                    {products
                      .filter((prod) => prod.category == category.name)
                      .map((filtered,j) => (
                        <Button variant="contained" color="info" sx={{mb:".3rem",mr:".3rem"}} key={j.toString()}>
                          {filtered.name}
                        </Button>
                      ))}
                  </div>
               
              ))}
            </Grid>
            <Grid item xs={4}>
              Pedido
            </Grid>
          </Grid>
        </Card>
      </Layout>
    </>
  );
}

export default showNote;

export async function getServerSideProps(context) {
  const { data: categories } = await axios.get(
    "http://localhost:3000/api/products/categories"
  );

  const { data: products } = await axios.get(
    "http://localhost:3000/api/products/enabled"
  );

  return {
    props: {
      categories,
      products,
    },
  };
}
