import { useState, useEffect } from 'react';

function CalendarioGlobal({ cuadranteData, mes }) {
  const [diasDelMes, setDiasDelMes] = useState([]);

  useEffect(() => {
    if (!mes) return;

    const [year, month] = mes.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    const dias = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const diaStr = i.toString().padStart(2, '0');
      dias.push(`${mes}-${diaStr}`);
    }
    setDiasDelMes(dias);
  }, [mes]);

  
  const asignacionesPorDia = {};
  diasDelMes.forEach(dia => {
    asignacionesPorDia[dia] = [];
  });

  cuadranteData.forEach(({ trabajador, apellido, playa, dias_trabajados }) => {
    dias_trabajados.forEach(({ fecha }) => {
      if (asignacionesPorDia[fecha]) {
        asignacionesPorDia[fecha].push({ nombre: trabajador, apellido, playa });
      }
    });
  });

  return (
    <div className="overflow-auto mt-4">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr>
            {diasDelMes.map(dia => (
              <th key={dia} className="border border-gray-300 px-2 py-1 text-center">
                {dia.split('-')[2]} / {dia.split('-')[1]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {diasDelMes.map(dia => {
              const trabajadoresOrdenados = [...asignacionesPorDia[dia]].sort((a, b) => {
                if (a.playa !== b.playa) return a.playa.localeCompare(b.playa);
                return `${a.nombre} ${a.apellido}`.localeCompare(`${b.nombre} ${b.apellido}`);
              });

              return (
                <td key={dia} className="border border-gray-300 align-top px-2 py-1 max-w-xs">
                  {trabajadoresOrdenados.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {trabajadoresOrdenados.map((trab, i) => (
                        <li key={i}>
                          {trab.nombre} {trab.apellido} - <span className="text-xs text-gray-600">{trab.playa}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CalendarioGlobal;

