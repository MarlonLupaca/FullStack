export const formatStatus = (status) => {
  const statusMap = {
    entregado: 'Entregado',
    enviado: 'Enviado',
    pendiente: 'Pendiente',
    cancelado: 'Cancelado',
  };
  return statusMap[status] || status;
};
