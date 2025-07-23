import React, { useState, useRef } from 'react';
import { serviceTypes } from '../mock/services';

const MachineServiceForm = ({ machines, clients, onSave }) => {
  const [service, setService] = useState({
    machineId: '',
    serviceType: '1',
    date: new Date().toISOString().split('T')[0],
    technician: 'Carlos Hernandez Valencia', // Valor por defecto
    notes: '',
    nextServiceNotes: '',
    beforePhotos: [],
    afterPhotos: [],
    maintenanceForm: null,
    completedChecklist: []
  });

  const technicians = ['Jonathan Quintal Valencia', 'Carlos Hernandez Valencia'];
  const fileInputBeforeRef = useRef();
  const fileInputAfterRef = useRef();
  const fileInputFormRef = useRef();
  const currentServiceType = serviceTypes.find(st => st.id === parseInt(service.serviceType));

  const handleChecklistChange = (item) => {
    setService(prev => ({
      ...prev,
      completedChecklist: prev.completedChecklist.includes(item)
        ? prev.completedChecklist.filter(i => i !== item)
        : [...prev.completedChecklist, item]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'maintenanceForm') {
      setService(prev => ({
        ...prev,
        [type]: {
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        }
      }));
    } else {
      const files = Array.from(e.target.files);
      const photos = files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }));

      setService(prev => ({
        ...prev,
        [type]: [...prev[type], ...photos]
      }));
    }
  };

  const removeFile = (type, index) => {
    if (type === 'maintenanceForm') {
      setService(prev => ({ ...prev, [type]: null }));
    } else {
      setService(prev => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index)
      }));
    }
  };

  const isPdf = (file) => file?.type === 'application/pdf';

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Registrar Servicio de Mantenimiento</h2>
      <div className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Máquina</label>
            <select 
              name="machineId" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              value={service.machineId}
              onChange={handleChange}
            >
              <option value="">Seleccionar Máquina</option>
              {machines.map(machine => (
                <option key={machine.id} value={machine.id}>
                  {machine.brand} {machine.model} ({machine.type === 'grinder' ? 'Molino' : 'Máquina'}) - {clients.find(c => c.id === machine.clientId)?.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Servicio</label>
            <select 
              name="serviceType" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={service.serviceType}
              onChange={handleChange}
            >
              {serviceTypes.map(st => (
                <option key={st.id} value={st.id}>{st.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del Servicio</label>
            <input 
              type="date" 
              name="date" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              value={service.date} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Técnico Responsable</label>
            <select 
              name="technician" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={service.technician}
              onChange={handleChange}
            >
              {technicians.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>
        </div>
        
        {currentServiceType && (
          <div className="space-y-4 sm:space-y-6 mt-6 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4">Checklist de {currentServiceType.name}</h3>
            {currentServiceType.checklist.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-white shadow-sm">
                <h4 className="font-bold text-sm sm:text-md text-gray-700 mb-3">{category.category}</h4>
                <div className="space-y-2">
                  {category.items.map(item => (
                    <label key={item} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition">
                      <input 
                        type="checkbox" 
                        checked={service.completedChecklist.includes(item)} 
                        onChange={() => handleChecklistChange(item)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="flex-1 text-gray-700 text-sm sm:text-base">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4 sm:space-y-6 mt-6 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4">Documentación Visual</h3>
          <div>
            <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Fotos Antes del Servicio</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
              {service.beforePhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img src={photo.url} alt={photo.name} className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-lg border border-gray-200 shadow-sm" />
                  <button 
                    onClick={() => removeFile('beforePhotos', index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button 
              type="button"
              onClick={() => fileInputBeforeRef.current.click()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition text-sm shadow-sm"
            >
              + Agregar Fotos (Antes)
            </button>
            <input 
              type="file" 
              ref={fileInputBeforeRef}
              onChange={(e) => handleFileUpload('beforePhotos', e)} 
              multiple 
              accept="image/*,application/pdf"
              className="hidden"
            />
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Fotos Después del Servicio</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
              {service.afterPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img src={photo.url} alt={photo.name} className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-lg border border-gray-200 shadow-sm" />
                  <button 
                    onClick={() => removeFile('afterPhotos', index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button 
              type="button"
              onClick={() => fileInputAfterRef.current.click()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition text-sm shadow-sm"
            >
              + Agregar Fotos (Después)
            </button>
            <input 
              type="file" 
              ref={fileInputAfterRef}
              onChange={(e) => handleFileUpload('afterPhotos', e)} 
              multiple 
              accept="image/*,application/pdf"
              className="hidden"
            />
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Formato de Mantenimiento Adjunto</h4>
            {service.maintenanceForm ? (
              <div className="flex items-center space-x-3 mb-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                {isPdf(service.maintenanceForm) ? (
                  <span className="text-blue-600 font-medium text-sm sm:text-base">📄 {service.maintenanceForm.name}</span>
                ) : (
                  <img src={service.maintenanceForm.url} alt={service.maintenanceForm.name} className="h-16 w-16 object-cover rounded-md border border-gray-200" />
                )}
                <button 
                  onClick={() => removeFile('maintenanceForm')}
                  className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                >
                  ×
                </button>
              </div>
            ) : null}
            <button 
              type="button"
              onClick={() => fileInputFormRef.current.click()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition text-sm shadow-sm"
            >
              {service.maintenanceForm ? 'Cambiar Formato' : 'Subir Imagen (foto o PDF) de Formato de Mantenimiento'}
            </button>
            <input 
              type="file" 
              ref={fileInputFormRef}
              onChange={(e) => handleFileUpload('maintenanceForm', e)} 
              accept="image/*,application/pdf"
              className="hidden"
            />
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-5 mt-6 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4">Notas y Observaciones</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas del Servicio Realizado</label>
            <textarea 
              name="notes" 
              placeholder="Detalles importantes del servicio..." 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" 
              value={service.notes} 
              onChange={handleChange} 
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones para el Próximo Servicio</label>
            <textarea 
              name="nextServiceNotes" 
              placeholder="Elementos clave a revisar en el futuro..." 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" 
              value={service.nextServiceNotes} 
              onChange={handleChange} 
              rows="4"
            ></textarea>
          </div>
        </div>
        
        <button 
          onClick={() => onSave(service)} 
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors shadow-md text-base sm:text-lg"
        >
          Guardar Servicio Completo
        </button>
      </div>
    </div>
  );
};

export default MachineServiceForm;

// DONE