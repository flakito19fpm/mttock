import React from 'react';

const UpcomingServices = ({ machines, clients }) => {
  const today = new Date();
  const oneMonthFromNow = new Date(new Date().setMonth(today.getMonth() + 1));
  const threeMonthsFromNow = new Date(new Date().setMonth(today.getMonth() + 3));

  const getStatus = (nextServiceDate) => {
    const serviceDate = new Date(nextServiceDate);
    if (serviceDate < today) return 'urgent';
    if (serviceDate <= oneMonthFromNow) return 'warning';
    if (serviceDate <= threeMonthsFromNow) return 'upcoming';
    return 'normal';
  };

  const statusClasses = {
    urgent: 'bg-red-100 border-red-400 text-red-800',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    upcoming: 'bg-blue-100 border-blue-400 text-blue-800',
    normal: 'bg-gray-100 border-gray-400 text-gray-800'
  };

  const statusLabels = {
    urgent: 'Urgente',
    warning: 'Próximo (1 mes)',
    upcoming: 'Programado (3 meses)',
    normal: 'En fecha'
  };

  return (
    <div className="mt-8 p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Próximos Servicios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Máquina/Equipo</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Cliente</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Último Servicio</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Próximo Servicio</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Estado</th>
            </tr>
          </thead>
          <tbody>
            {machines
              .filter(machine => machine.nextService)
              .sort((a, b) => new Date(a.nextService) - new Date(b.nextService))
              .map(machine => {
                const client = clients.find(c => c.id === machine.clientId);
                const status = getStatus(machine.nextService);
                
                return (
                  <tr key={machine.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">{machine.brand} {machine.model} ({machine.type === 'grinder' ? 'Molino' : 'Máquina'})</td>
                    <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">{client?.name || 'N/A'}</td>
                    <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">{machine.lastService}</td>
                    <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">{machine.nextService}</td>
                    <td className="py-2 px-3 sm:px-4 border-b">
                      <span className={`${statusClasses[status]} py-1 px-2 rounded-full text-xs`}>
                        {statusLabels[status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingServices;