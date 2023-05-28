import { createContext, useContext, useState } from "react";

export const NotasContext = createContext();

export const useNotas = () => useContext(NotasContext);

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);

  const createNota = (uid, mesa) => {
    setNotas([...notas, { uid, mesa }]);
  };

  return (
    <NotasContext.Provider value={{ notas, createNota }}>
      {children}
    </NotasContext.Provider>
  );
};
