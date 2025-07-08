import { useState } from 'react';
import { createUsuario } from '../services/api';

function UsuarioForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rol: '',
    playa: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsuario(formData);
      alert('Usuario creado correctamente');
      
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Ocurrió un error al crear el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label>Nombre:</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} />
        </li>
        <li>
          <label>Apellido:</label>
          <input name="apellido" value={formData.apellido} onChange={handleChange} />
        </li>
        <li>
          <label>Rol:</label>
          <input name="rol" value={formData.rol} onChange={handleChange} />
        </li>
        <li>
          <label>Playa:</label>
          <input name="playa" value={formData.playa} onChange={handleChange} />
        </li>
      </ul>
      <button type="submit">Crear Usuario</button>
    </form>
  );
}

export default UsuarioForm;
