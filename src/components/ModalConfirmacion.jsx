import '../css/ModalConfirmacion.css';

const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <p>{mensaje}</p>
        <div className="modal-botones">
          <button onClick={onConfirmar}>Sí</button>
          <button onClick={onCancelar}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
