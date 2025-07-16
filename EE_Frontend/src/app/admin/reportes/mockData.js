// Archivo: data/mockData.js
export const ventasData = [
  { name: 'Ene', ventas: 4000, productos: 24, costos: 2800 },
  { name: 'Feb', ventas: 3000, productos: 13, costos: 2100 },
  { name: 'Mar', ventas: 2000, productos: 9, costos: 1400 },
  { name: 'Abr', ventas: 2780, productos: 12, costos: 1950 },
  { name: 'May', ventas: 1890, productos: 15, costos: 1320 },
  { name: 'Jun', ventas: 2390, productos: 20, costos: 1670 },
  { name: 'Jul', ventas: 3490, productos: 22, costos: 2440 },
];

export const productosMasVendidos = [
  { name: 'Producto A', valor: 45, ganancia: 2350 },
  { name: 'Producto B', valor: 28, ganancia: 1680 },
  { name: 'Producto C', valor: 17, ganancia: 1020 },
  { name: 'Producto D', valor: 10, ganancia: 600 },
];

export const analisisFinanciero = [
  { name: 'Ingresos', valor: 18550 },
  { name: 'Costos', valor: 13680 },
  { name: 'Ganancia', valor: 4870 },
];

export const statsData = [
  {
    titulo: 'Ventas Totales',
    valor: 'S/ 18,550',
    cambio: '+12.5%',
    icono: 'TrendingUp',
    positivo: true,
  },
  {
    titulo: 'Margen de Beneficio',
    valor: '26.3%',
    cambio: '+1.8%',
    icono: 'PieChart',
    positivo: true,
  },
  {
    titulo: 'Ticket Promedio',
    valor: 'S/ 149.60',
    cambio: '+5.2%',
    icono: 'Receipt',
    positivo: true,
  },
  {
    titulo: 'Costo de Adquisición',
    valor: 'S/ 38.50',
    cambio: '-2.1%',
    icono: 'TrendingDown',
    positivo: true,
  },
];
