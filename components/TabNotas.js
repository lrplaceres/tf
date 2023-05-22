import {
  Alert,
  Box,
  Card,
  Button,
  Tabs,
  Tab,
  Typography,
  Stack,
} from "@mui/material";

import PropTypes from "prop-types";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabNotas({ notas }) {
  const [value, setValue] = useState(0);


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Card>
      {notas.length === 0 ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">No hay Notas activas</Alert>
        </Stack>
      ) : (
        <>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChangeTab}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              {notas.map((nota, i) => (
                <Tab
                  label={nota.mesa}
                  {...a11yProps(i)}
                  key={`t${i.toString()}`}
                />
              ))}
            </Tabs>
            {notas.map((nota, i) => (
              <TabPanel value={value} index={i} key={`tc${i.toString()}`}>
                <Button variant="contained" color="warning">
                  Cerrar {nota.mesa}
                </Button>
              </TabPanel>
            ))}
          </Box>
        </>
      )}
    </Card>
  );
}

export default TabNotas;
