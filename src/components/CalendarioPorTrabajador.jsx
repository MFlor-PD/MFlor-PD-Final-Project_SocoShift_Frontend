import { useState } from 'react';

function CalendarioPorTrabajador({ cuadranteData }) {
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);

  const handleSeleccion = (nombre) => {
    if (trabajadorSeleccionado === nombre) {
      setTrabajadorSeleccionado(null); 
    } else {
      setTrabajadorSeleccionado(nombre);
    }
  };

  const trabajador = cuadranteData.find(t => t.trabajador === trabajadorSeleccionado);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Ver días por trabajador</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {cuadranteData.map(({ trabajador }) => (
          <button
            key={trabajador}
            className={`px-3 py-1 rounded-md border text-sm ${
              trabajador === trabajadorSeleccionado
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-blue-100'
            }`}
            onClick={() => handleSeleccion(trabajador)}
          >
            {trabajador}
          </button>
        ))}
      </div>

      {trabajadorSeleccionado && trabajador && (
        <div className="bg-white p-4 rounded shadow border">
          <h4 className="font-medium mb-2">Días trabajados por {trabajadorSeleccionado}:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {trabajador.dias_trabajados.map((dia, i) => (
              <li key={i}>
                {new Date(dia.fecha).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CalendarioPorTrabajador;
 
