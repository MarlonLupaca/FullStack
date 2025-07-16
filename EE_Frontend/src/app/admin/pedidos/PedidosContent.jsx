'use client';

import { useState, useEffect } from 'react';
import PedidosHeader from './PedidosHeader';
import PedidosSearch from './PedidosSearch';
import PedidosStats from './PedidosStats';
import PedidosTable from './PedidosTable';
import API_BASE_URL from '@/app/config/apiConfig';

const PedidosContent = () => {
  const [pedidosData, setPedidosData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/invoices`);
        const data = await res.json();

        // No transformamos, pasamos todo el objeto del pedido
        setPedidosData(data);
      } catch (error) {
        console.error('Error cargando pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const filteredPedidos = pedidosData.filter((pedido) => {
    const matchesStatus = statusFilter === 'todos' || pedido.estate === statusFilter;
    const matchesSearch =
      pedido.seriesNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 h-full bg-tertiary overflow-y-auto">
      <PedidosHeader />
      <PedidosSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <PedidosStats pedidos={pedidosData} />
      {loading ? (
        <p className="text-center text-gray-500">Cargando pedidos...</p>
      ) : (
        <PedidosTable filteredPedidos={filteredPedidos} totalPedidos={pedidosData.length} />
      )}
    </div>
  );
};

export default PedidosContent;
