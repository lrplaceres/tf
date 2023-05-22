import { createContext, useContext, useState } from "react";

export const NotasContext = createContext();

export const useNotas = () => useContext(NotasContext);

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);

  const createNota = (uid, mesa, cuenta, pago) => {
    setNotas([...notas, { uid, mesa, cuenta, pago }]);
  };

  return (
    <NotasContext.Provider value={{ notas, createNota }}>
      {children}
    </NotasContext.Provider>
  );
};
