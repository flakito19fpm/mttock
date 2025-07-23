import React, { useState, useRef } from 'react';
import { serviceTypes } from '../mock/services';

const ReportDetailModal = ({ report, machines, clients, onClose }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const componentRef = useRef(); // Ref para el componente a imprimir
  
  const machine = machines?.find(m => m.id === report?.machineId) || {};
  const client = clients?.find(c => c.id === machine?.clientId) || {};
  const serviceType = serviceTypes?.find(st => st.id === report?.serviceType) || {};
  
  const beforePhotos = Array.isArray(report?.beforePhotos) ? report.beforePhotos : [];
  const afterPhotos = Array.isArray(report?.afterPhotos) ? report.afterPhotos : [];
  const checklistCategories = Array.isArray(serviceType?.checklist) ? serviceType.checklist : [];

  const openImageModal = (url) => {
    setCurrentImage(url);
  };

  const renderAttachment = (attachment) => {
    if (!attachment) return null;
    
    return attachment.type === 'application/pdf' ? (
      <div className="h-20 w-20 sm:h-24 sm:w-24 bg-red-100 flex items-center justify-center rounded border">
        <span className="text-xs text-red-800">PDF</span>
      </div>
    ) : (
      <img 
        src={attachment.url} 
        alt="Adjunto" 
        className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded border cursor-pointer"
        onClick={() => openImageModal(attachment.url)}
      />
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-full sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-8 print:p-4 print:text-sm print:leading-tight" ref={componentRef}> {/* Contenido a imprimir */}
          {/* Encabezado para impresión con logo */}
          <div className="hidden print:block text-center mb-4 print:mb-2">
            <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0755KOnp9ulj9cdOX5xw8FV0A6Wpo2KaRHmCh" alt="Logo Cafe Kaawa" className="h-16 mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Reporte de Servicio de Café</h1>
            <p className="text-md text-gray-600">Folio: {report?.folio || 'N/A'}</p>
            <hr className="my-4 border-gray-300 print:my-2" />
          </div>

          <div className="flex justify-between items-start mb-6 print:hidden"> {/* Botones de control */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Detalle del Reporte: {report?.folio || 'N/A'}</h2>
            <div className="flex space-x-3">
              <button 
                onClick={handlePrint}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-md"
              >
                Imprimir Reporte
              </button>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8 print:gap-4 print:mb-4">
            <div className="p-3 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm print:p-2 print:rounded-lg print:border print:border-gray-200 print:shadow-none">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 print:text-lg print:mb-2">Información General del Servicio</h3>
              <div className="space-y-2 sm:space-y-3 text-gray-700 print:space-y-1">
                <p><span className="font-semibold">Fecha del Servicio:</span> {report?.date || 'N/A'}</p>
                <p><span className="font-semibold">Cliente:</span> {client?.name || 'N/A'}</p>
                <p><span className="font-semibold">Máquina/Equipo:</span> {machine?.brand ? `${machine.brand} ${machine.model} (${machine.type === 'grinder' ? 'Molino' : 'Máquina'})` : 'N/A'}</p>
                <p><span className="font-semibold">Técnico Responsable:</span> {report?.technician || 'N/A'}</p>
                <p><span className="font-semibold">Tipo de Servicio:</span> {serviceType?.name || 'N/A'}</p>
              </div>
            </div>

            <div className="p-3 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm print:p-2 print:rounded-lg print:border print:border-gray-200 print:shadow-none">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 print:text-lg print:mb-2">Documentos Adjuntos</h3>
              <div className="space-y-3 sm:space-y-4">
                {report?.maintenanceForm ? (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base print:text-base">Formato de Mantenimiento:</h4>
                    {report.maintenanceForm.type === 'application/pdf' ? (
                      <a 
                        href={report.maintenanceForm.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline print:hidden flex items-center space-x-2 text-sm sm:text-base"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 5.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h7V5.414L10.586 3A.5.5 0 0010 2.414V2H6a.5.5 0 00-.5.5V4z" clipRule="evenodd" />
                        </svg>
                        <span>Ver PDF Adjunto</span>
                      </a>
                    ) : (
                      <img 
                        src={report.maintenanceForm.url} 
                        alt="Formato de mantenimiento" 
                        className="max-h-32 sm:max-h-40 cursor-pointer rounded-lg border border-gray-200 shadow-sm print:max-h-20 print:w-auto"
                        onClick={() => openImageModal(report.maintenanceForm.url)}
                      />
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 print:text-gray-600 text-sm sm:text-base">No se adjuntó formato de mantenimiento.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm print:p-2 print:rounded-lg print:border print:border-gray-200 print:shadow-none print:mb-4">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 print:text-lg print:mb-2">Checklist Completado</h3>
            {checklistCategories.length > 0 ? (
              checklistCategories.map((category, index) => (
                <div key={index} className="mb-3 last:mb-0 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm print:p-2 print:rounded-md print:border print:border-gray-200 print:shadow-none print:mb-2">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-700 mb-2 sm:mb-3 print:text-base print:mb-1">{category.category || 'Categoría sin nombre'}</h4>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 print:pl-4 print:space-y-0.5">
                    {Array.isArray(category?.items) ? (
                      category.items.map(item => (
                        <li 
                          key={item} 
                          className={report?.completedChecklist?.includes(item) ? 'text-green-700 font-medium text-sm sm:text-base' : 'text-gray-500 text-sm sm:text-base'}
                        >
                          {item} {report?.completedChecklist?.includes(item) ? '✓ Completado' : '✗ Pendiente'}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 print:text-gray-600 text-sm sm:text-base">No hay ítems en esta categoría.</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 print:text-gray-600 text-sm sm:text-base">No hay checklist disponible para este tipo de servicio.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8 print:gap-4 print:mb-4">
            <div className="p-3 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm print:p-2 print:rounded-lg print:border print:border-gray-200 print:shadow-none">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 print:text-lg print:mb-2">Fotos Antes del Servicio</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 print:gap-1">
                {beforePhotos.length > 0 ? (
                  beforePhotos.map((photo, index) => (
                    <div key={index} className="cursor-pointer print:hidden" onClick={() => openImageModal(photo.url)}>
                      {renderAttachment(photo)}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 print:text-gray-600 text-sm sm:text-base">No hay fotos del antes.</p>
                )}
                {/* Mostrar imágenes para impresión */}
                <div className="hidden print:flex print:flex-wrap print:gap-1">
                  {beforePhotos.filter(p => p.type !== 'application/pdf').map((photo, index) => (
                    <img key={index} src={photo.url} alt={`Antes ${index}`} className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded border print:h-16 print:w-16" />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm print:p-2 print:rounded-lg print:border print:border-gray-200 print:shadow-none">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 print:text-lg print:mb-2">Fotos Después del Servicio</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 print:gap-1">
                {afterPhotos.length > 0 ? (
                  afterPhotos.map((photo, index) => (
                    <div key={index} className="cursor-pointer print:hidden" onClick={() => openImageModal(photo.url)}>
                      {renderAttachment(photo)}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 print:text-gray-600 text-sm sm:text-base">No hay fotos del después.</p>
                )}
                {/* Mostrar imágenes para impresión */}
                <div className="hidden print:flex print:flex-wrap print:gap-1">
                  {afterPhotos.filter(p => p.type !== 'application/pdf').map((photo, index) => (
                    <img key={index} src={photo.url} alt={`Después ${index}`} className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded border print:h-16 print:w-16" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 print:gap-4">
            <div className="p-3 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm print:p-2 print:rounded-lg print:border print:border-gray-200 print:shadow-none">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 print:text-lg print:mb-2">Notas del Servicio</h3>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm print:bg-white print:border print:border-gray-300 print:p-2 text-sm sm:text-base">
                {report?.notes || <p className="text-gray-500 print:text-gray-600">Sin notas adicionales.</p>}
              </div>
            </div>

            <div className="p-3 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm print:p-2 print:rounded-lg print:border print:border-gray-200 print:shadow-none">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 print:text-lg print:mb-2">Observaciones para Próximo Servicio</h3>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm print:bg-white print:border print:border-gray-300 print:p-2 text-sm sm:text-base">
                {report?.nextServiceNotes || <p className="text-gray-500 print:text-gray-600">Sin observaciones para el próximo servicio.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setCurrentImage(null)}>
          <div className="max-w-full max-h-[90vh] p-4">
            <img src={currentImage} alt="Vista previa" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetailModal;