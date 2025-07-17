import { Link } from "react-router-dom";
import UsuarioList from "../components/UsuarioList";
function ListaUsuarios() {
   return (
    <div>
      <Link to="/"><button className="boton-home-superior">Home</button></Link> 
      <Link to="/usuarios"><button className='boton-atras-superior'>Atras</button></Link>
      <UsuarioList />
    </div>
  );
}

export default ListaUsuarios;
