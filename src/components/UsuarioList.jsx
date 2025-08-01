import { useState, useEffect } from 'react';
import { getUsuarios, updateUsuario, deleteUsuario } from '../services/api';
import '../css/UsuarioList.css';

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const rolesPorColores = {
  coordinador: 'gray',
  adjunto: 'orange',
  patron: 'lightblue',
  socorrista: 'red',
  supervisor: 'green'
};

  const fetchUsuarios = async () => {
    try {
      const res = await getUsuarios();
      setUsuarios(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios', err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEditClick = (usuario) => {
    setEditId(usuario.id);
    setEditFormData({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email || '',
      rol: usuario.rol,
      playa: usuario.playa,
      dias_obligatorios:(usuario.dias_obligatorios || []).join(', '),
      auth: usuario.auth || '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditId(null);
    setEditFormData({});
  };

  const handleSave = async (id) => {
  try {
    const payload = {
      ...editFormData,
      dias_obligatorios: editFormData.dias_obligatorios
        ? editFormData.dias_obligatorios.split(',').map(d => d.trim())
        : [],
    };

    await updateUsuario(id, payload);
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...payload } : u))
    );
    setEditId(null);
    setEditFormData({});
  } catch (error) {
    console.error('Error al editar usuario:', error);
    alert('No se pudo actualizar el usuario');
  }
};


  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="usuario-list">
      <h2>Lista de Usuarios</h2>
      <table border="1" cellPadding={6} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Playa</th>
            <th>Días obligatorios</th>
            <th>Auth</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>

              {editId === u.id ? (
                <>
                  <td>
                    <input
                      name="nombre"
                      value={editFormData.nombre}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="apellido"
                      value={editFormData.apellido}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="rol"
                      value={editFormData.rol}
                      onChange={handleInputChange}
                      className={`usuario-rol rol-${editFormData.rol?.toLowerCase()}`}
                    />
                  </td>
                  <td>
                    <input
                      name="playa"
                      value={editFormData.playa}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="dias_obligatorios"
                      value={editFormData.dias_obligatorios}
                      onChange={handleInputChange}
                      placeholder="Ej: lunes, miércoles, viernes"
                    />
                  </td>
                  <td>
                    <input
                      name="auth"
                      value={editFormData.auth}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(u.id)}>Guardar</button>{' '}
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className='usuario-nombre'>{u.nombre}</td>
                  <td className='usuario-apellido'>{u.apellido}</td>
                  <td>{u.email || '-'}</td>
                  <td style={{ color: rolesPorColores[u.rol?.toLowerCase()] || 'black'}} >{u.rol}</td>
                  <td>{u.playa}</td>
                  <td>{u.dias_obligatorios || '-'}</td>
                  <td>{u.auth || '-'}</td>
                  <td>
                    <button onClick={() => handleEditClick(u)}>Editar</button>{' '}
                    <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuarioList;
