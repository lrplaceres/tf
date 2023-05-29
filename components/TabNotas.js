import {
  Alert,
  Stack,
  Card, Typography,
} from "@mui/material";
import Link from "next/link";

function TabNotas({ notas}) {

  return (
    <>
      {notas.length === 0 ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">No hay Notas activas</Alert>
        </Stack>
      ) : (
        <>
          {notas.map((nota, i) => (
            <Link href={`/notes/${nota.uid}`} className="decoration-none" key={`a${i.toString()}`}>
            <Card sx={{ p: "1rem" ,mb:".5rem"}} key={`b${i.toString()}`}>
              <Typography variant="button" color="initial"><b>Mesa: </b>{nota.mesa}</Typography>              
            </Card>
            </Link>
       
          ))}
        </>
      )}
    </>
  );
}

export default TabNotas;
