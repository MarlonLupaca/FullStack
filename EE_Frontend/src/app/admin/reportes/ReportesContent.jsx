'use client';
import { useState } from 'react';
import StatCard from './StatCard';
import FilterBar from './FilterBar';
import TabNavigator from './TabNavigator';
import VentasTab from './tabs/VentasTab';
import ProductosTab from './tabs/ProductosTab';
import FinanzasTab from './tabs/FinanzasTab';
import { statsData } from './mockData';

const ReportesContent = () => {
  const [activeTab, setActiveTab] = useState('ventas');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ventas':
        return <VentasTab />;
      case 'productos':
        return <ProductosTab />;
      case 'finanzas':
        return <FinanzasTab />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-tertiary min-h-screen pb-5">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Reportes de Ventas</h1>
          <p className="text-gray-600">Análisis financiero y rendimiento del e-commerce</p>
        </div>

        <FilterBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab} />

        {renderTabContent()}
      </div>
    </div>
  );
};

export default ReportesContent;
