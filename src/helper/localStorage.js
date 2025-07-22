const STORAGE_KEY = 'cuadrantesGenerados';

export const guardarCuadranteEnLocal = (mes, data) => {
  const almacenados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const index = almacenados.findIndex(c => c.mes === mes);
  if (index >= 0) {
    almacenados[index] = { mes, data };
  } else {
    almacenados.push({ mes, data });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(almacenados));
};

export const obtenerCuadrantesLocales = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const obtenerCuadrantePorMes = (mes) => {
  const todos = obtenerCuadrantesLocales();
  return todos.find(c => c.mes === mes);
};

export const eliminarCuadranteLocal = (mes) => {
  const todos = obtenerCuadrantesLocales();
  const filtrados = todos.filter(c => c.mes !== mes);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
};
