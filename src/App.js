import React, { useState, useEffect } from 'react';
import { clients } from './mock/clients';
import { machines } from './mock/machines';
import { serviceTypes } from './mock/services';
import { reports as initialReports } from './mock/reports';
import { generateFolio } from './utils/folioGenerator';
import CafeClientForm from './components/CafeClientForm';
import MachineServiceForm from './components/MachineServiceForm';
import ReportHistory from './components/ReportHistory';
import UpcomingServices from './components/UpcomingServices';
import LandingPage from './components/LandingPage'; // Importar la nueva LandingPage

const App = () => {
  const [showLanding, setShowLanding] = useState(true); // Estado para mostrar la portada
  const [currentView, setCurrentView] = useState('upcoming');
  const [allClients, setAllClients] = useState(clients);
  const [allMachines, setAllMachines] = useState(machines);
  const [allReports, setAllReports] = useState(initialReports);

  const handleStartMaintenance = () => {
    setShowLanding(false); // Ocultar la portada y mostrar el sistema
    setCurrentView('services'); // Llevar directamente a registrar un nuevo servicio
  };

  const handleSaveClient = (newClient) => {
    const clientId = allClients.length + 1;
    const newClientWithId = { ...newClient, id: clientId };
    
    const newMachine = {
      id: allMachines.length + 1,
      clientId: clientId,
      brand: newClient.machine.brand,
      model: newClient.machine.model,
      serial: newClient.machine.serial,
      lastService: new Date().toISOString().split('T')[0],
      nextService: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      type: 'machine'
    };

    const newGrinder = {
      id: allMachines.length + 2,
      clientId: clientId,
      brand: newClient.grinder.brand,
      model: newClient.grinder.model,
      serial: newClient.grinder.serial,
      lastService: new Date().toISOString().split('T')[0],
      nextService: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      type: 'grinder'
    };

    setAllClients([...allClients, newClientWithId]);
    setAllMachines([...allMachines, newMachine, newGrinder]);
  };

  const handleSaveService = (newService) => {
    const lastFolio = allReports[allReports.length - 1]?.folio;
    const newFolio = generateFolio(lastFolio);
    
    const updatedMachines = allMachines.map(machine => 
      machine.id === parseInt(newService.machineId) 
        ? { 
            ...machine, 
            lastService: newService.date, 
            nextService: new Date(new Date(newService.date).setFullYear(new Date(newService.date).getFullYear() + 1)).toISOString().split('T')[0] 
          }
        : machine
    );

    const newReport = {
      ...newService,
      folio: newFolio,
      machineId: parseInt(newService.machineId),
      serviceType: parseInt(newService.serviceType)
    };

    setAllMachines(updatedMachines);
    setAllReports([...allReports, newReport]);
  };

  if (showLanding) {
    return <LandingPage onStartMaintenance={handleStartMaintenance} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-full lg:max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mb-6 sm:mb-8">
          <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0755KOnp9ulj9cdOX5xw8FV0A6Wpo2KaRHmCh" alt="Logo Cafe Kaawa" className="h-16 sm:h-20 mr-0 sm:mr-4 mb-4 sm:mb-0" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 text-center sm:text-left">Sistema de Mantenimiento Cafe Kaawa</h1>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-white rounded-xl shadow-md">
          <button 
            onClick={() => setCurrentView('upcoming')} 
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${currentView === 'upcoming' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Próximos Servicios
          </button>
          <button 
            onClick={() => setCurrentView('clients')} 
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${currentView === 'clients' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Clientes
          </button>
          <button 
            onClick={() => setCurrentView('services')} 
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${currentView === 'services' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Registrar Servicio
          </button>
          <button 
            onClick={() => setCurrentView('reports')} 
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${currentView === 'reports' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Historial de Reportes
          </button>
        </div>
        
        {currentView === 'upcoming' && <UpcomingServices machines={allMachines} clients={allClients} />}
        {currentView === 'clients' && <CafeClientForm onSave={handleSaveClient} />}
        {currentView === 'services' && <MachineServiceForm machines={allMachines} clients={allClients} onSave={handleSaveService} />}
        {currentView === 'reports' && <ReportHistory reports={allReports} machines={allMachines} clients={allClients} />}
      </div>
    </div>
  );
};

export default App;

// DONE