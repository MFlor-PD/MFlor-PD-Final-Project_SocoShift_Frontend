import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACK_URL

const API = axios.create({
  baseURL: BACKEND_URL
});


export const getUsuarios = () => API.get('/usuarios');
export const getUsuarioById = (id) => API.get(`/usuarios/${id}`);
export const createUsuario = (data) => API.post('/usuarios', data);
export const updateUsuario = (id, data) => API.put(`/usuarios/${id}`, data);
export const deleteUsuario = (id) => API.delete(`/usuarios/${id}`);

export const getCuadranteByMes = (mes) => API.get(`/cuadrante`, { params: { mes } });//req.params
export const createAsignacion = (data) => API.post('/cuadrante', data);//req.body
export const generarCuadrante = (data) => API.post('/cuadrante/generar', data);
export const editarAsignaciones = (data) => API.put('/cuadrante/editar', data);
export const eliminarAsignaciones = (data) => API.delete('/cuadrante/eliminar', { data });

export const getConfiguracionPorMes = (mes) => {
  if (!mes) {
    return API.get('/configuracion-cuadrante'); // sin query para traer todas
  }
  return API.get('/configuracion-cuadrante', { params: { mes } });
};
export const updateConfiguracionCuadrante = (data) => API.put('/configuracion-cuadrante', data);
export const deleteConfiguracionCuadrante = (mes) => API.delete(`/configuracion-cuadrante/${mes}`);
