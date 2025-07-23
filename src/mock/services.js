export const serviceTypes = [
  {
    id: 1,
    name: "Mantenimiento Preventivo",
    checklist: [
      {
        category: "Limpieza General",
        items: [
          "Limpiar grupo de café",
          "Limpiar portafiltros y cestas",
          "Descalcificar cabezal del grupo",
          "Limpiar bandeja de goteo",
          "Limpiar depósito de agua"
        ]
      },
      {
        category: "Componentes Internos",
        items: [
          "Revisar válvulas y conexiones",
          "Verificar presión caldera",
          "Checar fugas internas",
          "Revisar calentamiento",
          "Verificar nivel de agua"
        ]
      },
      {
        category: "Funcionamiento",
        items: [
          "Verificar extracción",
          "Calibrar equipo", // Cambiado de "Calibrar temperatura (88-96°C)"
          "Checar caudal de agua"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Mantenimiento Correctivo",
    checklist: [
      {
        category: "Diagnóstico",
        items: [
          "Identificar falla reportada",
          "Verificar síntomas",
          "Revisar conexiones eléctricas",
          "Checar presión del sistema"
        ]
      },
      {
        category: "Reparación",
        items: [
          "Reemplazar piezas defectuosas",
          "Limpiar obstrucciones",
          "Restaurar ajustes de fábrica",
          "Cambiar juntas desgastadas"
        ]
      },
      {
        category: "Pruebas Post-Reparación",
        items: [
          "Test de extracción",
          "Verificar temperatura consistente",
          "Checar presión estable",
          "Confirmar funcionamiento bomba"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Reconstrucción",
    checklist: [
      {
        category: "Desmontaje y Evaluación",
        items: [
          "Desmontaje completo de la máquina",
          "Evaluación de componentes principales",
          "Identificación de piezas a reemplazar",
          "Limpieza profunda de chasis y estructura"
        ]
      },
      {
        category: "Reemplazo y Montaje",
        items: [
          "Reemplazo de caldera",
          "Cambio de bomba",
          "Instalación de nuevas tuberías y cableado",
          "Montaje de grupos y componentes externos"
        ]
      },
      {
        category: "Calibración y Pruebas",
        items: [
          "Calibración de todos los parámetros",
          "Pruebas de estrés y durabilidad",
          "Ajuste estético y pulido final"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Mantenimiento General",
    checklist: [
      {
        category: "Inspección Visual",
        items: [
          "Revisar estado exterior de la máquina",
          "Verificar conexiones visibles",
          "Checar limpieza general del área de trabajo"
        ]
      },
      {
        category: "Ajustes Básicos",
        items: [
          "Ajustar molido de café",
          "Verificar dosificación",
          "Limpiar filtros de agua"
        ]
      },
      {
        category: "Recomendaciones",
        items: [
          "Sugerir limpieza diaria al cliente",
          "Recomendar uso de agua filtrada",
          "Informar sobre próximos mantenimientos"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Reparación (Cliente Externo)",
    checklist: [
      {
        category: "Recepción y Diagnóstico",
        items: [
          "Registrar máquina de cliente externo",
          "Realizar diagnóstico inicial",
          "Documentar fallas reportadas",
          "Estimar tiempo y costo de reparación"
        ]
      },
      {
        category: "Proceso de Reparación",
        items: [
          "Obtener aprobación del cliente",
          "Realizar reparación según diagnóstico",
          "Reemplazar piezas necesarias",
          "Limpiar y probar máquina"
        ]
      },
      {
        category: "Entrega y Facturación",
        items: [
          "Notificar al cliente sobre reparación",
          "Facturar servicio y piezas",
          "Entregar máquina y explicar trabajo realizado"
        ]
      }
    ]
  }
];

// DONE