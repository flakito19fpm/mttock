import React, { useState, useEffect } from 'react';

const LandingPage = ({ onStartMaintenance }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('es-MX', options));
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0wUodkAbxP1T5XDmuZkHCc9hBg6RVIbyjU7Fs')" }}
    >
      {/* Overlay para oscurecer la imagen de fondo y hacer el texto legible */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Logo de fondo sutil */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-10"
        style={{ backgroundImage: "url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0755KOnp9ulj9cdOX5xw8FV0A6Wpo2KaRHmCh')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
      ></div>

      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-full sm:max-w-2xl w-full text-center border border-gray-200">
        <img 
          src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0755KOnp9ulj9cdOX5xw8FV0A6Wpo2KaRHmCh" 
          alt="Logo Cafe Kaawa" 
          className="h-24 sm:h-32 mx-auto mb-6 sm:mb-8" 
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Bienvenido al Sistema de Mantenimiento Cafe Kaawa
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-4">
          Tu herramienta esencial para la gestión y el seguimiento de servicios de máquinas y molinos de café.
        </p>
        <p className="text-lg sm:text-xl font-semibold text-blue-600 mb-6 sm:mb-8">
          Hoy es: {currentDate}
        </p>
        <button 
          onClick={onStartMaintenance} 
          className="bg-blue-600 text-white py-3 px-6 sm:px-8 rounded-xl text-lg sm:text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Iniciar Nuevo Mantenimiento
        </button>
      </div>
    </div>
  );
};

export default LandingPage;