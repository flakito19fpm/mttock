import React, { useState } from 'react';

const CafeClientForm = ({ onSave }) => {
  const [client, setClient] = useState({
    name: '',
    contact: '',
    phone: '',
    address: '',
    zone: 'Playa del Carmen', // Valor inicial
    customZone: '', // Nuevo campo para zona personalizada
    machine: {
      brand: '',
      model: '',
      serial: ''
    },
    grinder: {
      brand: '',
      model: '',
      serial: ''
    }
  });

  const zones = ['Playa del Carmen', 'Cancún', 'Tulum', 'Otro...'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('machine')) {
      const machineField = name.replace('machine', '').toLowerCase();
      setClient(prev => ({
        ...prev,
        machine: {
          ...prev.machine,
          [machineField]: value
        }
      }));
    } else if (name.startsWith('grinder')) {
      const grinderField = name.replace('grinder', '').toLowerCase();
      setClient(prev => ({
        ...prev,
        grinder: {
          ...prev.grinder,
          [grinderField]: value
        }
      }));
    } else {
      setClient(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Registrar Nuevo Cliente</h2>
      <div className="space-y-4 sm:space-y-5">
        <input type="text" name="name" placeholder="Nombre del Cliente" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" onChange={handleChange} />
        <input type="email" name="contact" placeholder="Email de Contacto" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Teléfono" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" onChange={handleChange} />
        <textarea name="address" placeholder="Dirección Completa" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" onChange={handleChange} rows="3"></textarea>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zona del Cliente</label>
          <select 
            name="zone" 
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={client.zone}
            onChange={handleChange}
          >
            {zones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
          {client.zone === 'Otro...' && (
            <input 
              type="text" 
              name="customZone" 
              placeholder="Especifica la nueva zona" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition mt-3" 
              onChange={handleChange} 
              value={client.customZone} 
            />
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="font-medium text-base sm:text-lg text-gray-700 mb-3">Datos de la Máquina de Café</h3>
          <input type="text" name="machineBrand" placeholder="Marca de la Máquina" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-3" onChange={handleChange} value={client.machine.brand} />
          <input type="text" name="machineModel" placeholder="Modelo de la Máquina" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-3" onChange={handleChange} value={client.machine.model} />
          <input type="text" name="machineSerial" placeholder="Número de Serie de la Máquina" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" onChange={handleChange} value={client.machine.serial} />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="font-medium text-base sm:text-lg text-gray-700 mb-3">Datos del Molino de Café</h3>
          <input type="text" name="grinderBrand" placeholder="Marca del Molino" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-3" onChange={(e) => handleChange({ target: { name: 'grinderBrand', value: e.target.value } })} value={client.grinder.brand} />
          <input type="text" name="grinderModel" placeholder="Modelo del Molino" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-3" onChange={(e) => handleChange({ target: { name: 'grinderModel', value: e.target.value } })} value={client.grinder.model} />
          <input type="text" name="grinderSerial" placeholder="Número de Serie del Molino" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" onChange={(e) => handleChange({ target: { name: 'grinderSerial', value: e.target.value } })} value={client.grinder.serial} />
        </div>
        
        <button onClick={() => onSave(client)} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md text-base sm:text-lg">
          Guardar Cliente y Equipos
        </button>
      </div>
    </div>
  );
};

export default CafeClientForm;

// DONE