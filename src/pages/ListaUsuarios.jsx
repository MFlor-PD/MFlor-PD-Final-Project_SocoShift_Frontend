import { Link } from "react-router-dom";
import UsuarioList from "../components/UsuarioList";
function ListaUsuarios() {
   return (
    <div>
      <h2>Lista de Usuarios</h2> 
        <Link to="/">
          <button>Home</button>
        </Link> 
        <Link to="/usuarios">
        <button>Atras</button></Link>
      <UsuarioList />
    </div>
  );
}

export default ListaUsuarios;
