export const formatEstadoCliente = (estado) => {
  const estadoMap = {
    activo: 'Activo',
    inactivo: 'Inactivo',
  };
  return estadoMap[estado] || estado;
};
