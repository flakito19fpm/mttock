import React, { useState } from 'react';
import ReportDetailModal from './ReportDetailModal';

const ReportHistory = ({ reports, machines, clients }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="mt-8 p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Historial de Reportes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Folio</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Fecha</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Máquina/Equipo</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Cliente</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Técnico</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Tipo</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left text-sm sm:text-base">Adjuntos</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => {
              const machine = machines.find(m => m.id === report.machineId);
              const client = clients.find(c => c.id === machine?.clientId);
              const attachmentsCount = 
                (report.beforePhotos?.length || 0) + 
                (report.afterPhotos?.length || 0) + 
                (report.maintenanceForm ? 1 : 0);
              
              return (
                <tr 
                  key={report.folio} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedReport(report)}
                >
                  <td className="py-2 px-3 sm:px-4 border-b font-medium text-sm sm:text-base">{report.folio}</td>
                  <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">{report.date}</td>
                  <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">
                    {machine ? `${machine.brand} ${machine.model} (${machine.type === 'grinder' ? 'Molino' : 'Máquina'})` : 'N/A'}
                  </td>
                  <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">{client?.name || 'N/A'}</td>
                  <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">{report.technician}</td>
                  <td className="py-2 px-3 sm:px-4 border-b text-sm sm:text-base">
                    {report.serviceType === 1 ? 'Preventivo' : 
                     report.serviceType === 2 ? 'Correctivo' :
                     report.serviceType === 3 ? 'Reconstrucción' :
                     report.serviceType === 4 ? 'General' :
                     report.serviceType === 5 ? 'Reparación (Ext.)' : 'N/A'}
                  </td>
                  <td className="py-2 px-3 sm:px-4 border-b text-center">
                    {attachmentsCount > 0 ? (
                      <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs">
                        {attachmentsCount} archivo(s)
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">Ninguno</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <ReportDetailModal 
          report={selectedReport} 
          machines={machines} 
          clients={clients} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </div>
  );
};

export default ReportHistory;