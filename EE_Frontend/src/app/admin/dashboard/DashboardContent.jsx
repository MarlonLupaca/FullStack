'use client';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import ProductPieChart from './ProductPieChart';
import NotificationsList from './NotificationsList';
import ActivitiesList from './ActivitiesList';
import { salesData, productData, pieColors, notificaciones, proximasActividades } from './dashboardData';

const DashboardContent = () => {
  return (
    <div className="p-8 py-6 bg-tertiary min-h-screen">
      {/* Cabecera del Dashboard */}
      <DashboardHeader />

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Usuarios Totales"
          value="1,249"
          change="↑ 12% desde el mes pasado"
          icon={Users}
          color="var(--color-primary)"
        />
        <StatCard
          title="Ventas"
          value="452"
          change="↑ 5% desde el mes pasado"
          icon={ShoppingBag}
          color="var(--color-secondary)"
        />
        <StatCard
          title="Ingresos"
          value="s/. 24,500"
          change="↑ 8% desde el mes pasado"
          icon={DollarSign}
          color="var(--color-Quaternary)"
        />
        <StatCard
          title="Crecimiento"
          value="+8.5%"
          change="↑ 2% desde el mes pasado"
          icon={TrendingUp}
          color="var(--color-primary-admin)"
        />
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SalesChart data={salesData} />
        <ProductPieChart data={productData} colors={pieColors} />
      </div>

      {/* Sección inferior: Notificaciones y Próximas Actividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationsList notifications={notificaciones} />
        <ActivitiesList activities={proximasActividades} />
      </div>
    </div>
  );
};

export default DashboardContent;
